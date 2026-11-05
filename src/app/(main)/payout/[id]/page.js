import { PayoutReview } from "@/modules/payouts";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const PayoutReviewPage = async () => {
    const { isAuthenticated } = await auth();

    if (!isAuthenticated) {
        redirect("/sign-in");
    }

    return <PayoutReview />;
};

export default PayoutReviewPage;
