import { Call } from "@/modules/call";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const CallPage = async ({ params }) => {
    const { isAuthenticated } = await auth();

    if (!isAuthenticated) {
        redirect("/sign-in");
    }

    return <Call params={params} />;
};

export default CallPage;
