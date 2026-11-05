import { InterviewerDashboard } from "@/modules/dashboard";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const InterviewerDashboardPage = async () => {
    const { isAuthenticated } = await auth();

    if (!isAuthenticated) {
        redirect("/sign-in");
    }

    return <InterviewerDashboard />;
};

export default InterviewerDashboardPage;
