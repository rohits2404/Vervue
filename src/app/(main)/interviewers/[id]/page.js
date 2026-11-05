import { InterviewerProfile } from "@/modules/interviewers";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const InterviewerProfilePage = async ({ params }) => {
    const { isAuthenticated } = await auth();

    if (!isAuthenticated) {
        redirect("/sign-in");
    }

    return <InterviewerProfile params={params} />;
};

export default InterviewerProfilePage;
