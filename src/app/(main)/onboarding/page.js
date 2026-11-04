import { Onboarding } from "@/modules/onboarding";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const OnboardingPage = async () => {
    const { isAuthenticated } = await auth();

    if (!isAuthenticated) {
        redirect("/sign-in");
    }

    return <Onboarding />;
};

export default OnboardingPage;
