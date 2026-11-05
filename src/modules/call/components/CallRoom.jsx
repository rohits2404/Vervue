"use client";

import { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import {
    StreamVideoClient,
    StreamVideo,
    StreamCall,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "stream-chat-react/dist/css/index.css";
import { Loader2 } from "lucide-react";
import { CallUI } from "./CallUI";

export function CallRoom({
    callId,
    token,
    apiKey,
    currentUser,
    booking,
    isInterviewer,
}) {
    const router = useRouter();

    const [videoClient, setVideoClient] = useState(null);
    const [call, setCall] = useState(null);

    useEffect(() => {
        let cancelled = false;
        let client = null;
        let callInstance = null;
        let joinPromise = null;

        const connect = async () => {
            try {
                client = new StreamVideoClient({
                    apiKey,
                    user: {
                        id: currentUser.id,
                        name: currentUser.name,
                        image: currentUser.imageUrl,
                    },
                    token,
                });

                callInstance = client.call("default", callId);

                console.log("[CallRoom] Connecting to Stream Video...");

                joinPromise = callInstance.join({ create: false });

                await joinPromise;

                if (cancelled) {
                    return;
                }

                console.log("[CallRoom] Successfully joined call");

                setVideoClient(client);
                setCall(callInstance);
            } catch (error) {
                if (!cancelled) {
                    console.error("[CallRoom] Connection failed:", error);
                }
            }
        };

        connect();

        return () => {
            cancelled = true;

            console.log("[CallRoom] Cleaning up Video client...");

            void (async () => {
                try {
                    if (joinPromise) {
                        await joinPromise;
                    }
                } catch {}

                try {
                    if (callInstance) {
                        await callInstance.leave();
                    }
                } catch {}

                try {
                    if (client) {
                        await client.disconnectUser();
                    }
                } catch (error) {
                    console.error(
                        "[CallRoom] Client disconnect failed:",
                        error,
                    );
                }
            })();
        };
    }, [
        apiKey,
        callId,
        currentUser.id,
        currentUser.imageUrl,
        currentUser.name,
        token,
    ]);

    const handleLeave = useCallback(() => {
        router.push(isInterviewer ? "/dashboard" : "/appointments");
    }, [isInterviewer, router]);

    if (!videoClient || !call) {
        return (
            <div className="min-h-screen bg-[#0a0a0b] flex flex-col items-center justify-center gap-3">
                <Loader2 size={28} className="text-amber-400 animate-spin" />

                <p className="text-stone-500 text-sm font-light">
                    Connecting To Call…
                </p>
            </div>
        );
    }

    return (
        <StreamVideo client={videoClient}>
            <StreamCall call={call}>
                <CallUI
                    callId={callId}
                    isInterviewer={isInterviewer}
                    booking={booking}
                    onLeave={handleLeave}
                    apiKey={apiKey}
                    token={token}
                    currentUser={currentUser}
                />
            </StreamCall>
        </StreamVideo>
    );
}
