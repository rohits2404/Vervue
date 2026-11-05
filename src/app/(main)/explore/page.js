import { Explore } from "@/modules/explore";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const ExplorePage = async () => {
    const { isAuthenticated } = await auth();

    if (!isAuthenticated) {
        redirect("/sign-in");
    }

    return <Explore />;
};

export default ExplorePage;
