import { MyAppointments } from "@/modules/appointments";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const MyAppointMentPage = async () => {
    const { isAuthenticated } = await auth();

    if (!isAuthenticated) {
        redirect("/sign-in");
    }

    return <MyAppointments />;
};

export default MyAppointMentPage;
