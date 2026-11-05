import { getCallData } from "@/actions/call";
import { CallRoom } from "./components/CallRoom";
import { notFound, redirect } from "next/navigation";

export async function Call({ params }) {
    const { callId } = await params;

    const result = await getCallData(callId);

    if (result.error === "Unauthorized") {
        redirect("/");
    }
    if (result.error === "Call Not Found") {
        notFound();
    }
    if (result.error === "Forbidden") {
        redirect("/");
    }

    const { token, isInterviewer, currentUser, booking } = result;

    return (
        <CallRoom
            callId={callId}
            token={token}
            apiKey={process.env.NEXT_PUBLIC_STREAM_API_KEY}
            currentUser={currentUser}
            booking={booking}
            isInterviewer={isInterviewer}
        />
    );
}
