"use client";

import { useEffect, useCallback, useState } from "react";
import {
    StreamTheme,
    SpeakerLayout,
    useCallStateHooks,
    useCall,
    CallingState,
    CallControls,
} from "@stream-io/video-react-sdk";
import {
    Chat,
    Channel,
    MessageList,
    MessageComposer,
    Window,
    useCreateChatClient,
} from "stream-chat-react";
import "stream-chat-react/dist/css/index.css";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Sparkles, Loader2 } from "lucide-react";
import { AIQuestionsPanel } from "./AIQuestions";

export function CallUI({
    callId,
    isInterviewer,
    booking,
    onLeave,
    apiKey,
    token,
    currentUser,
}) {
    const { useCallCallingState } = useCallStateHooks();

    const call = useCall();
    const callingState = useCallCallingState();

    const [activeTab, setActiveTab] = useState("chat");
    const [chatChannel, setChatChannel] = useState(null);

    const chatClient = useCreateChatClient({
        apiKey,
        tokenOrProvider: token,
        userData: {
            id: currentUser.id,
            name: currentUser.name,
            image: currentUser.imageUrl,
        },
    });

    const interviewerId = booking.interviewer.clerkUserId;
    const intervieweeId = booking.interviewee.clerkUserId;

    // Initialize channel.
    useEffect(() => {
        if (!chatClient) {
            setChatChannel(null);
            return;
        }

        let cancelled = false;

        const initializeChannel = async () => {
            try {
                setChatChannel(null);

                console.log("[CallUI] Initializing chat channel...");

                const channel = chatClient.channel("messaging", callId, {
                    name: "Interview Chat",
                    members: [interviewerId, intervieweeId],
                });

                await channel.watch();

                if (cancelled) {
                    return;
                }

                console.log("[CallUI] Chat channel connected");

                setChatChannel(channel);
            } catch (error) {
                if (!cancelled) {
                    console.error(
                        "[CallUI] Chat channel initialization failed:",
                        error,
                    );
                }
            }
        };

        initializeChannel();

        return () => {
            cancelled = true;
        };
    }, [chatClient, callId, interviewerId, intervieweeId]);

    const handleLeave = useCallback(async () => {
        try {
            if (call) {
                const isRecording = call.state?.recording;

                if (isRecording) {
                    await call.stopRecording().catch(() => {});
                }

                await call.leave().catch(() => {});
            }
        } finally {
            onLeave();
        }
    }, [call, onLeave]);

    if (callingState === CallingState.LEFT) {
        return (
            <div className="min-h-screen bg-[#0a0a0b] flex flex-col items-center justify-center gap-3">
                <p className="text-stone-400 text-sm">Leaving Call…</p>
            </div>
        );
    }

    return (
        <div className="min-h-[92vh] bg-[#0a0a0b] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-6 py-3 border-b border-white/8 shrink-0">
                <div className="flex items-center gap-2">
                    <Badge
                        variant="outline"
                        className="border-white/10 text-stone-500 text-xs"
                    >
                        {booking.interviewer.name}

                        <span className="text-stone-700 mx-1.5">×</span>

                        {booking.interviewee.name}
                    </Badge>

                    {isInterviewer && (
                        <Badge
                            variant="outline"
                            className="border-amber-400/20 bg-amber-400/5 text-amber-400 text-xs"
                        >
                            Interviewer
                        </Badge>
                    )}
                </div>
            </div>

            <div className="flex flex-1 min-h-0">
                <div className="flex flex-col flex-1 min-w-0">
                    <StreamTheme>
                        <SpeakerLayout participantBarPosition="bottom" />

                        <CallControls onLeave={handleLeave} />
                    </StreamTheme>
                </div>

                <div className="w-85 shrink-0 flex flex-col border-l border-white/8 bg-[#0a0a0b]">
                    <div className="flex border-b border-white/8 shrink-0">
                        <button
                            type="button"
                            onClick={() => setActiveTab("chat")}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-medium transition-colors ${
                                activeTab === "chat"
                                    ? "text-amber-400 border-b-2 border-amber-400"
                                    : "text-stone-500 hover:text-stone-300"
                            }`}
                        >
                            <MessageSquare size={13} />
                            Chat
                        </button>

                        {isInterviewer && (
                            <button
                                type="button"
                                onClick={() => setActiveTab("ai")}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-medium transition-colors ${
                                    activeTab === "ai"
                                        ? "text-amber-400 border-b-2 border-amber-400"
                                        : "text-stone-500 hover:text-stone-300"
                                }`}
                            >
                                <Sparkles size={13} />
                                AI Questions
                            </button>
                        )}
                    </div>

                    <div className="flex-1 min-h-0 overflow-hidden">
                        {activeTab === "chat" ? (
                            chatClient && chatChannel ? (
                                <Chat
                                    client={chatClient}
                                    theme="str-chat__theme-dark"
                                >
                                    <Channel channel={chatChannel}>
                                        <Window>
                                            <MessageList />
                                            <MessageComposer focus />
                                        </Window>
                                    </Channel>
                                </Chat>
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <Loader2
                                        size={18}
                                        className="text-stone-600 animate-spin"
                                    />
                                </div>
                            )
                        ) : (
                            <div className="p-4 h-full overflow-y-scroll max-h-screen">
                                <AIQuestionsPanel
                                    categories={booking.categories}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
