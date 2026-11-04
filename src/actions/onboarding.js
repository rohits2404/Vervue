"use server";

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const completeOnboarding = async (data) => {
    const user = await currentUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    const { role, title, company, yearsExp, bio, categories } = data;

    if (!role || !["INTERVIEWEE", "INTERVIEWER"].includes(role)) {
        throw new Error("Invalid Role");
    }

    if (role === "INTERVIEWER") {
        if (!title || !company || !yearsExp || !bio || !categories?.length) {
            throw new Error("Please Fill In All Required Fields");
        }
    }

    try {
        await db.user.update({
            where: { clerkUserId: user.id },
            data: {
                role,
                ...(role === "INTERVIEWER" && {
                    title,
                    company,
                    yearsExp,
                    bio,
                    categories,
                }),
            },
        });

        return { success: true };
    } catch (error) {
        console.error("Onboarding Error:", error);
        throw new Error("Something Went Wrong. Please Try Again.");
    }
};
