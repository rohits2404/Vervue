import { checkUser } from "@/lib/checkUser";
import Image from "next/image";
import Link from "next/link";
import { RoleRedirect } from "./RoleRedirect";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { CalendarDays, Users } from "lucide-react";
import { CreditButton } from "./CreditButton";

export const Header = async () => {
    const user = await checkUser();

    return (
        <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-3 sm:px-10 py-3 border-b border-white/7 backdrop-blur-xl">
            <Link href="/">
                <Image
                    src="/logo.png"
                    alt="Prept Logo"
                    width={100}
                    height={100}
                    className="h-11 w-auto"
                />
            </Link>
            {user && <RoleRedirect role={user.role} />}
            <div className="flex items-center gap-3">
                <Show when="signed-out">
                    <SignInButton mode="modal">
                        <Button variant="ghost">Sign In</Button>
                    </SignInButton>
                    <SignInButton mode="modal">
                        <Button variant="gold">Get Started →</Button>
                    </SignInButton>
                </Show>
                <Show when="signed-in">
                    {user?.role === "INTERVIEWER" && (
                        <Button variant="ghost" asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </Button>
                    )}
                    {user?.role === "INTERVIEWEE" && (
                        <>
                            <Button variant="ghost" asChild>
                                <Link href="/explore">
                                    <Users size={16} />
                                    <span className="hidden md:inline">
                                        Explore
                                    </span>
                                </Link>
                            </Button>
                            <Button variant="default" asChild>
                                <Link href="/appointments">
                                    <CalendarDays size={16} />
                                    <span className="hidden md:inline">
                                        My Appointments
                                    </span>
                                </Link>
                            </Button>
                        </>
                    )}
                    <CreditButton
                        role={
                            user?.role === "INTERVIEWER"
                                ? "INTERVIEWER"
                                : "INTERVIEWEE"
                        }
                        credits={
                            (user?.role === "INTERVIEWER"
                                ? user?.creditBalance
                                : user?.credits) ?? 0
                        }
                    />
                    <UserButton />
                </Show>
            </div>
        </nav>
    );
};
