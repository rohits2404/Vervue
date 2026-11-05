"use server";

import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { WithdrawalRequestEmail } from "@/emails/WithdrawalRequestEmail";
import emailjs from "@emailjs/nodejs";
import { render } from "@react-email/render";

export const setAvailability = async ({ startTime, endTime }) => {
    const user = await currentUser();
    if (!user) throw new Error("Unauthorized");

    const dbUser = await db.user.findUnique({
        where: { clerkUserId: user.id },
    });
    if (!dbUser || dbUser.role !== "INTERVIEWER") throw new Error("Forbidden");

    if (!startTime || !endTime) throw new Error("Start And End Time Required");
    if (new Date(startTime) >= new Date(endTime))
        throw new Error("Start Time Must Be Before End Time");

    try {
        const existing = await db.availability.findFirst({
            where: { interviewerId: dbUser.id, status: "AVAILABLE" },
        });

        if (existing) {
            await db.availability.update({
                where: { id: existing.id },
                data: {
                    startTime: new Date(startTime),
                    endTime: new Date(endTime),
                },
            });
        } else {
            await db.availability.create({
                data: {
                    interviewerId: dbUser.id,
                    startTime: new Date(startTime),
                    endTime: new Date(endTime),
                    status: "AVAILABLE",
                },
            });
        }

        revalidatePath("/dashboard");
        return { success: true };
    } catch (err) {
        console.error(err);
        throw new Error("Failed To Save Availability");
    }
};

export const getAvailability = async () => {
    const user = await currentUser();
    if (!user) throw new Error("Unauthorized");

    const dbUser = await db.user.findUnique({
        where: { clerkUserId: user.id },
    });
    if (!dbUser) throw new Error("User Not Found");

    return db.availability.findFirst({
        where: { interviewerId: dbUser.id, status: "AVAILABLE" },
    });
};

export const getInterviewerAppointments = async () => {
    const user = await currentUser();
    if (!user) throw new Error("Unauthorized");

    const dbUser = await db.user.findUnique({
        where: { clerkUserId: user.id },
    });
    if (!dbUser) throw new Error("User Not Found");

    return db.booking.findMany({
        where: { interviewerId: dbUser.id },
        include: {
            interviewee: {
                select: { name: true, imageUrl: true, email: true },
            },
            feedback: true,
        },
        orderBy: { startTime: "desc" },
    });
};

export const getInterviewerStats = async () => {
    const user = await currentUser();
    if (!user) throw new Error("Unauthorized");

    const dbUser = await db.user.findUnique({
        where: { clerkUserId: user.id },
        select: {
            creditBalance: true,
            creditRate: true,
            bookingsAsInterviewer: {
                where: { status: "COMPLETED" },
                select: { creditsCharged: true },
            },
        },
    });
    if (!dbUser) throw new Error("User Not Found");

    const totalEarned = dbUser.bookingsAsInterviewer.reduce(
        (sum, b) => sum + b.creditsCharged,
        0,
    );

    return {
        creditBalance: dbUser.creditBalance,
        creditRate: dbUser.creditRate,
        totalEarned,
        completedSessions: dbUser.bookingsAsInterviewer.length,
    };
};

export const requestWithdrawal = async ({
    credits,
    paymentMethod,
    paymentDetail,
}) => {
    const user = await currentUser();
    if (!user) throw new Error("Unauthorized");

    const dbUser = await db.user.findUnique({
        where: { clerkUserId: user.id },
    });

    if (!dbUser || dbUser.role !== "INTERVIEWER") {
        throw new Error("Forbidden");
    }

    if (!credits || credits <= 0) {
        throw new Error("Invalid Credit Amount");
    }

    if (credits > dbUser.creditBalance) {
        throw new Error("Insufficient Credit Balance");
    }

    if (!paymentMethod || !paymentDetail) {
        throw new Error("Payment Details Required");
    }

    const PLATFORM_FEE = 0.2;
    const netAmount = credits * (1 - PLATFORM_FEE) * 5;
    const platformFee = credits * PLATFORM_FEE * 5;

    try {
        const payout = await db.$transaction(async (tx) => {
            const updated = await tx.user.updateMany({
                where: {
                    id: dbUser.id,
                    creditBalance: { gte: credits },
                },
                data: {
                    creditBalance: { decrement: credits },
                },
            });

            if (updated.count !== 1) {
                throw new Error("Insufficient Credit Balance");
            }

            return tx.payout.create({
                data: {
                    interviewerId: dbUser.id,
                    credits,
                    platformFee,
                    netAmount,
                    paymentMethod,
                    paymentDetail,
                    status: "PROCESSING",
                },
            });
        });

        try {
            const reviewUrl = `${process.env.NEXT_PUBLIC_APP_URL}/payout/${payout.id}`;

            const html = await render(
                WithdrawalRequestEmail({
                    interviewerName: dbUser.name ?? "Unknown",
                    interviewerEmail: dbUser.email,
                    credits,
                    platformFee,
                    netAmount,
                    paymentMethod,
                    paymentDetail,
                    reviewUrl,
                }),
            );

            await emailjs.send(
                process.env.EMAILJS_SERVICE_ID,
                process.env.EMAILJS_TEMPLATE_ID,
                {
                    to_email: "rohits8731@gmail.com",
                    subject: `Withdrawal Request — ${dbUser.name} · ${credits} Credits`,
                    interviewer_name: dbUser.name ?? "Unknown",
                    interviewer_email: dbUser.email,
                    credits,
                    platform_fee: platformFee.toFixed(2),
                    net_amount: netAmount.toFixed(2),
                    payment_method: paymentMethod,
                    payment_detail: paymentDetail,
                    review_url: reviewUrl,
                    message_html: html,
                },
                {
                    publicKey: process.env.EMAILJS_PUBLIC_KEY,
                    privateKey: process.env.EMAILJS_PRIVATE_KEY,
                },
            );
        } catch (emailErr) {
            console.error("EmailJS Withdrawal Notification Failed:", emailErr);
        }

        revalidatePath("/dashboard");

        return { success: true, netAmount };
    } catch (err) {
        console.error("Withdrawal Request Failed:", err);
        throw new Error(
            err.message === "Insufficient Credit Balance"
                ? err.message
                : "Withdrawal Request Failed",
        );
    }
};

export const getWithdrawalHistory = async () => {
    const user = await currentUser();
    if (!user) throw new Error("Unauthorized");

    const dbUser = await db.user.findUnique({
        where: { clerkUserId: user.id },
    });
    if (!dbUser) throw new Error("User Not Found");

    return db.payout.findMany({
        where: { interviewerId: dbUser.id },
        orderBy: { createdAt: "desc" },
    });
};
