"use server";

import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { StreamClient } from "@stream-io/node-sdk";
import { revalidatePath } from "next/cache";

export const getInterviewerProfile = async (interviewerId) => {
    try {
        const interviewer = await db.user.findUnique({
            where: { id: interviewerId, role: "INTERVIEWER" },
            select: {
                id: true,
                name: true,
                imageUrl: true,
                title: true,
                company: true,
                yearsExp: true,
                bio: true,
                categories: true,
                creditRate: true,
                availabilities: {
                    where: { status: "AVAILABLE" },
                    select: { startTime: true, endTime: true },
                    take: 1,
                },
                bookingsAsInterviewer: {
                    where: { status: "SCHEDULED" },
                    select: { startTime: true, endTime: true },
                },
            },
        });

        return interviewer ?? null;
    } catch (err) {
        console.error("getInterviewerProfile error:", err);
        throw new Error("Failed To Fetch Interviewer Profile");
    }
};

export const bookSlot = async ({ interviewerId, startTime, endTime }) => {
    const user = await currentUser();
    if (!user) throw new Error("Unauthorized");

    const [dbUser, interviewer] = await Promise.all([
        db.user.findUnique({ where: { clerkUserId: user.id } }),
        db.user.findUnique({ where: { id: interviewerId } }),
    ]);

    if (!dbUser || dbUser.role !== "INTERVIEWEE")
        throw new Error("Only Interviewees Can Book Sessions");
    if (!interviewer || interviewer.role !== "INTERVIEWER")
        throw new Error("Interviewer Not Found");

    const credits = interviewer.creditRate ?? 10;

    if (dbUser.credits < credits)
        throw new Error("Insufficient Credits. Please Upgrade Your Plan.");

    // Check slot isn't already taken
    const conflict = await db.booking.findFirst({
        where: {
            interviewerId,
            status: "SCHEDULED",
            startTime: { lt: new Date(endTime) },
            endTime: { gt: new Date(startTime) },
        },
    });

    if (conflict)
        throw new Error("This Slot Was Just Booked. Please Pick Another.");

    // Create Stream call
    let streamCallId;

    try {
        const streamClient = new StreamClient(
            process.env.NEXT_PUBLIC_STREAM_API_KEY,
            process.env.STREAM_SECRET_KEY,
        );

        await streamClient.upsertUsers([
            {
                id: dbUser.clerkUserId,
                name: dbUser.name ?? "Interviewee",
                image: dbUser.imageUrl ?? undefined,
                role: "user",
            },
            {
                id: interviewer.clerkUserId,
                name: interviewer.name ?? "Interviewer",
                image: interviewer.imageUrl ?? undefined,
                role: "user",
            },
        ]);

        streamCallId = `mock_${Date.now()}_${Math.random()
            .toString(36)
            .slice(2, 7)}`;

        const call = streamClient.video.call("default", streamCallId);

        await call.getOrCreate({
            data: {
                created_by_id: dbUser.clerkUserId,
                members: [
                    { user_id: dbUser.clerkUserId, role: "host" },
                    { user_id: interviewer.clerkUserId, role: "host" },
                ],
                settings_override: {
                    recording: { mode: "available", quality: "1080p" },
                    screensharing: {
                        enabled: true,
                    },
                    transcription: {
                        mode: "auto-on",
                    },
                },
            },
        });
    } catch (err) {
        console.error("Stream Call Creation Failed:", err);
        throw new Error("Failed To Create Video Call. Please Try Again.");
    }

    try {
        const booking = await db.$transaction(async (tx) => {
            const newBooking = await tx.booking.create({
                data: {
                    intervieweeId: dbUser.id,
                    interviewerId,
                    startTime: new Date(startTime),
                    endTime: new Date(endTime),
                    status: "SCHEDULED",
                    creditsCharged: credits,
                    streamCallId,
                },
            });

            await tx.creditTransaction.create({
                data: {
                    userId: dbUser.id,
                    amount: -credits,
                    type: "BOOKING_DEDUCTION",
                    bookingId: newBooking.id,
                },
            });

            await tx.user.update({
                where: { id: dbUser.id },
                data: { credits: { decrement: credits } },
            });

            await tx.user.update({
                where: { id: interviewerId },
                data: { creditBalance: { increment: credits } },
            });

            return newBooking;
        });

        revalidatePath(`/interviewers/${interviewerId}`);
        revalidatePath("/dashboard");

        return { success: true, bookingId: booking.id, streamCallId };
    } catch (err) {
        console.error("bookSlot Transaction Failed:", err);
        throw new Error("Booking Failed. Please Try Again.");
    }
};
