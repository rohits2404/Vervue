import { CodeDemo } from "@/components/demo-components-animate-code";
import { StarsBackgroundDemo } from "@/components/demo-components-backgrounds-stars";
import { PricingSection } from "@/components/PricingSection";
import {
    GoldTitle,
    GrayTitle,
    SectionHeading,
    SectionLabel,
} from "@/components/reusables";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AI_TAGS, AVATARS, LOGOS, ROLES, SLOTS } from "@/lib/data";
import { Bot, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function MockUI({ rows = 3 }) {
    const widths = ["w-4/5", "w-3/5", "w-2/5", "w-4/5", "w-1/2"];
    const colors = [
        "bg-white/5",
        "bg-white/5",
        "bg-amber-400/15",
        "bg-white/5",
        "bg-white/5",
    ];

    return (
        <div className="mt-5 rounded-xl bg-[#141417] border border-white/10 overflow-hidden">
            <div className="h-9 bg-white/5 border-b border-white/10 flex items-center px-3.5 gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                <span className="w-2 h-2 rounded-full bg-[#28c840]" />
            </div>
            <div className="p-4 flex flex-col gap-2">
                {Array.from({ length: rows }).map((_, i) => (
                    <div
                        key={i}
                        className={`h-2 rounded-full ${widths[i]} ${colors[i]}`}
                    />
                ))}
            </div>
        </div>
    );
}

export function BentoCard({ icon, title, desc, children, className = "" }) {
    return (
        <div
            className={`relative bg-[#0f0f11] border border-white/10 hover:border-amber-400/20 rounded-2xl p-9 h-full transition duration-300 overflow-hidden ${className}`}
        >
            <div className="absolute inset-0 bg-linear-to-br from-amber-400/5 via-transparent pointer-events-none" />

            <span className="w-11 h-11 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-xl mb-5">
                {icon}
            </span>

            <h3 className="font-serif text-xl tracking-tight mb-2">{title}</h3>

            <p className="text-sm text-stone-400 leading-relaxed">{desc}</p>

            {children}
        </div>
    );
}

export function LandingPage() {
    return (
        <div className="bg-black overflow-x-hidden">
            {/* HERO */}
            <section className="relative min-h-screen grid grid-cols-1 lg:grid-cols-5 px-4 sm:px-8 pt-28 sm:pt-32 pb-20 overflow-hidden">
                <StarsBackgroundDemo />

                {/* LEFT */}
                <div className="col-span-full lg:col-span-3 flex flex-col items-center justify-center text-center lg:-rotate-2">
                    <Badge variant="gold">Powered By AI — Now In Beta</Badge>

                    <h1 className="font-serif relative text-5xl sm:text-6xl lg:text-7xl tracking-tighter max-w-4xl">
                        <GrayTitle>Ace Your Next Interview</GrayTitle>
                        <br />
                        <GoldTitle>With Real Experts</GoldTitle>
                    </h1>

                    <p className="relative text-sm sm:text-base md:text-lg text-stone-400 max-w-xl mt-6 leading-relaxed">
                        Book 1:1 Mock Interviews With Senior Engineers From Top
                        Companies. Get AI-Powered Feedback, Role-Specific
                        Questions, And The Confidence To Land Your Dream Job.
                    </p>

                    <div className="relative flex justify-center gap-2 sm:gap-4 mt-10 sm:w-auto">
                        <Link href="/onboarding">
                            <Button variant="gold" size="hero">
                                Get Started
                            </Button>
                        </Link>

                        <Link href="/explore">
                            <Button variant="outline" size="hero">
                                Browse Interviewers →
                            </Button>
                        </Link>
                    </div>

                    <div className="relative flex items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-16">
                        <div className="flex">
                            {AVATARS.map((av, i) => (
                                <div
                                    key={i}
                                    className={`w-8 h-8 rounded-full border-2 border-[#0a0a0b] overflow-hidden ${
                                        i > 0 ? "-ml-2" : ""
                                    }`}
                                >
                                    <Image
                                        src={av.src}
                                        alt="user avatar"
                                        width={32}
                                        height={32}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>

                        <p className="text-sm text-stone-500 text-center sm:text-left">
                            <strong className="text-stone-400 font-medium">
                                2,400+ Engineers
                            </strong>{" "}
                            Cracked FAANG Interviews Via Prept
                        </p>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="col-span-full lg:col-span-2 flex items-center justify-center lg:justify-start mt-12 lg:mt-0 lg:rotate-3">
                    <CodeDemo duration={30000} writing />
                </div>
            </section>

            {/* LOGOS */}
            <section className="relative z-10 border-y border-white/10 py-14">
                <p className="text-center text-xs font-medium text-stone-600 tracking-widest uppercase mb-8">
                    Interviewees Landed Roles At
                </p>

                <div className="flex flex-wrap items-center justify-center gap-24 px-6">
                    {LOGOS.map((l) => (
                        <Image
                            key={l.alt}
                            src={l.src}
                            alt={l.alt}
                            width={50}
                            height={50}
                            className="h-6 w-auto opacity-60 grayscale"
                        />
                    ))}
                </div>
            </section>

            {/* FEATURES */}
            <section className="relative z-10 py-28 max-w-5xl mx-auto px-6">
                <div className="text-center mb-16">
                    <SectionLabel>Features</SectionLabel>
                    <SectionHeading
                        gray="Everything You Need,"
                        gold="Nothing You Don't"
                    />
                </div>

                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-7">
                        <BentoCard
                            icon={<Bot size={20} className="text-amber-400" />}
                            title={<GrayTitle>AI Question Generator</GrayTitle>}
                            desc="Interviewers Get A Live AI Co-Pilot Generating Role-Specific Questions On Demand — System Design, Behavioural, DSA — All Tailored To The Candidate's Level."
                        >
                            <div className="flex flex-wrap gap-2 mt-5">
                                {AI_TAGS.map((t) => (
                                    <Badge
                                        key={t.label}
                                        variant={t.active ? "gold" : "outline"}
                                    >
                                        {t.label}
                                    </Badge>
                                ))}
                            </div>
                        </BentoCard>
                    </div>

                    <div className="col-span-12 md:col-span-5">
                        <BentoCard
                            icon={
                                <Wallet size={16} className="text-amber-400" />
                            }
                            title={<GrayTitle>Credit System</GrayTitle>}
                            desc="Subscribe For Monthly Credits. Book Sessions. Interviewers Earn And Withdraw Anytime."
                        >
                            <div className="mt-5 rounded-xl bg-[#141417] border border-white/10 p-5 flex justify-between items-end">
                                <div>
                                    <p className="text-xs text-stone-600 mb-1">
                                        Your balance
                                    </p>
                                    <p className="font-serif text-4xl leading-none bg-linear-to-br from-amber-300 to-amber-500 bg-clip-text text-transparent">
                                        28
                                    </p>
                                    <p className="text-xs text-stone-600 mt-1">
                                        Credits Remaining
                                    </p>
                                </div>

                                <Badge variant="secondary">
                                    +10 This Month
                                </Badge>
                            </div>
                        </BentoCard>
                    </div>

                    <div className="col-span-12 md:col-span-4">
                        <BentoCard
                            icon="📹"
                            title="HD Video Calls"
                            desc="Powered By Stream. Screen Sharing, Recording, And Instant Playback Links — All Built In."
                        >
                            <MockUI rows={3} />
                        </BentoCard>
                    </div>

                    <div className="col-span-12 md:col-span-4">
                        <BentoCard
                            icon="💬"
                            title="Persistent Chat"
                            desc="Message Your Interviewer Before And After The Call. Share Resources, Prep Notes, And Follow-Ups In One Thread."
                        />
                    </div>

                    <div className="col-span-12 md:col-span-6">
                        <BentoCard
                            icon="📊"
                            title={<GrayTitle>AI Feedback Reports</GrayTitle>}
                            desc="Post-Interview Analysis By Groq With Actionable Insights."
                        >
                            <MockUI rows={5} />
                        </BentoCard>
                    </div>

                    <div className="col-span-12 md:col-span-6">
                        <BentoCard
                            icon="🗓️"
                            title={<GoldTitle>Slot-Based Scheduling</GoldTitle>}
                            desc="Interviewers Set Availability Once. Interviewees Pick From Open Slots And Confirm With One Click — No Back-And-Forth Needed."
                        >
                            <div className="flex flex-wrap gap-2 mt-5">
                                {SLOTS.map((s) => (
                                    <span
                                        key={s.label}
                                        className={`text-xs px-3 py-1.5 rounded-lg border ${s.cls}`}
                                    >
                                        {s.label}
                                    </span>
                                ))}
                            </div>
                        </BentoCard>
                    </div>
                </div>
            </section>

            {/* ROLES */}
            <section className="relative z-10 pb-28 max-w-5xl mx-auto px-6">
                <div className="text-center mb-16">
                    <SectionLabel>Who It&apos;s For</SectionLabel>
                    <SectionHeading
                        gray="Built For Both Sides"
                        gold="Of The Table"
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {ROLES.map((role) => (
                        <div
                            key={role.label}
                            className="relative bg-[#0f0f11] border border-white/10 hover:border-amber-400/20 rounded-2xl p-12 h-full transition duration-300 overflow-hidden"
                        >
                            <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.05)_0%,transparent_70%)] pointer-events-none" />

                            <span className="inline-block text-xs font-semibold text-amber-400 tracking-widest uppercase border border-amber-400/20 bg-amber-400/10 rounded-full px-3 py-1.5 mb-5">
                                {role.label}
                            </span>

                            <h3 className="font-serif text-2xl tracking-tight mb-4">
                                {role.title}
                            </h3>

                            <p className="text-sm text-stone-400 leading-relaxed mb-8">
                                {role.desc}
                            </p>

                            <ul className="space-y-3">
                                {role.perks.map((p) => (
                                    <li
                                        key={p}
                                        className="flex gap-3 text-sm text-stone-400"
                                    >
                                        <span className="mt-0.5 min-w-4 h-4 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-xs text-amber-400">
                                            ✓
                                        </span>
                                        {p}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* PRICING */}
            <section className="relative z-10 pb-28 max-w-5xl mx-auto px-6">
                <div className="text-center mb-16">
                    <SectionLabel>Pricing</SectionLabel>
                    <SectionHeading
                        gray="Simple, Transparent"
                        gold="Credit-Based Plans"
                    />
                    <p className="text-stone-400 mt-3 text-sm">
                        Each Credit = One Session. Unused Credits Roll Over.
                    </p>
                </div>

                <PricingSection />
            </section>

            {/* CTA */}
            <section className="relative z-10 pb-28 max-w-5xl mx-auto px-6">
                <div className="relative border border-amber-400/20 rounded-3xl px-3 sm:px-16 py-20 bg-linear-to-br from-amber-400/5 text-center overflow-hidden">
                    <StarsBackgroundDemo />

                    <h2 className="font-serif relative text-4xl md:text-5xl leading-tight tracking-tight mb-4">
                        <GrayTitle>Your Next Interview</GrayTitle>
                        <br />
                        <GoldTitle>Starts Here</GoldTitle>
                    </h2>

                    <p className="relative text-stone-400 font-light text-sm mb-11">
                        Join Thousands Of Engineers Already Levelling Up On
                        Prept.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/onboarding" className="relative">
                            <Button variant="gold" size="hero">
                                Get Started
                            </Button>
                        </Link>

                        <Link href="/explore" className="relative">
                            <Button variant="outline" size="hero">
                                Browse Interviewers →
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
