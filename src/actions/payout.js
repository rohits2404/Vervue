"use server";

import { db } from "@/lib/prisma";

export const approvePayout = async ({ payoutId, adminPassword }) => {
    if (!adminPassword) throw new Error("Password Required");

    if (adminPassword !== process.env.ADMIN_PAYOUT_PASSWORD) {
        throw new Error("Incorrect Password");
    }

    const payout = await db.payout.findUnique({ where: { id: payoutId } });

    if (!payout) throw new Error("Payout Not Found");
    if (payout.status === "PROCESSED") throw new Error("Already Processed");

    await db.payout.update({
        where: { id: payoutId },
        data: {
            status: "PROCESSED",
            processedAt: new Date(),
            processedBy: "admin",
        },
    });

    return { success: true };
};
