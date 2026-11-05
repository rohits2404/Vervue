import { GoldTitle, GrayTitle } from "@/components/reusables";

export const LOGOS = [
    { src: "/amazon.svg", alt: "Amazon" },
    { src: "/atlassian.svg", alt: "Atlassian" },
    { src: "/google.webp", alt: "Google" },
    { src: "/meta.svg", alt: "Meta" },
    { src: "/microsoft.webp", alt: "Microsoft" },
    { src: "/netflix.png", alt: "Netflix" },
    { src: "/uber.svg", alt: "Uber" },
];

export const AVATARS = [
    { src: "https://randomuser.me/api/portraits/men/32.jpg" },
    { src: "https://randomuser.me/api/portraits/women/44.jpg" },
    { src: "https://randomuser.me/api/portraits/men/76.jpg" },
    { src: "https://randomuser.me/api/portraits/women/68.jpg" },
    { src: "https://randomuser.me/api/portraits/men/12.jpg" },
];

export const AI_TAGS = [
    { label: "Frontend Engineer", active: true },
    { label: "L5 Level", active: true },
    { label: "React Performance", active: false },
    { label: "System Design", active: false },
    { label: "Behavioural", active: true },
    { label: "DSA", active: false },
];

export const SLOTS = [
    {
        label: "Mon 10:00 AM",
        cls: "border-amber-400/30 text-amber-200 bg-amber-400/5",
    },
    { label: "Mon 2:00 PM", cls: "border-white/7 text-stone-500" },
    {
        label: "Tue 11:00 AM",
        cls: "border-amber-400/30 text-amber-200 bg-amber-400/5",
    },
    {
        label: "Wed 9:00 AM ✓",
        cls: "border-emerald-500/30 text-emerald-400 bg-emerald-500/5",
    },
    {
        label: "Thu 3:00 PM",
        cls: "border-amber-400/30 text-amber-200 bg-amber-400/5",
    },
];

export const PLANS = [
    {
        name: "Free",
        price: "$0",
        credits: "1 Credit / Month",
        featured: false,
        planId: null,
        slug: "free",
        features: [
            "1 Mock Interview Session",
            "HD Video Call Via Stream",
            "Persistent Chat Thread",
        ],
    },
    {
        name: "Starter",
        price: "$29",
        credits: "5 Credits / Month",
        featured: true,
        planId: process.env.NEXT_PUBLIC_STARTER_PLAN_ID,
        slug: "starter",
        features: [
            "5 Mock Interview Sessions",
            "AI Feedback Report",
            "HD Video Call Via Stream",
            "Persistent Chat Thread",
            "Credits Roll Over Monthly",
        ],
    },
    {
        name: "Pro",
        price: "$69",
        credits: "15 Credits / Month",
        featured: false,
        planId: process.env.NEXT_PUBLIC_PRO_PLAN_ID,
        slug: "pro",
        features: [
            "15 Mock Interview Sessions",
            "AI Feedback Report",
            "HD Video Call Via Stream",
            "Persistent Chat Thread",
            "Credits Roll Over Monthly",
            "Recording & Playback Link",
        ],
    },
];

export const ROLES = [
    {
        label: "Interviewee",
        title: <GrayTitle>Land The Role You Deserve</GrayTitle>,
        desc: "Stop Guessing What Interviewers Want. Practice With People Who've Been On The Other Side And Know Exactly How Top Companies Evaluate Candidates.",
        perks: [
            "Browse By Category: Frontend, Backend, System Design, PM",
            "Book Sessions Using Monthly Credits From Your Plan",
            "Receive AI-Powered Feedback After Every Session",
            "Access Session Recordings To Review Your Performance",
            "Chat With Your Interviewer Before And After The Call",
        ],
    },
    {
        label: "Interviewer",
        title: <GoldTitle>Earn Doing What You're Great At</GoldTitle>,
        desc: "Share Your Knowledge, Help Engineers Grow, And Earn Meaningful Income On Your Own Schedule. Set Your Slots, And We Handle The Rest.",
        perks: [
            "Set Your Own Availability And Session Rates",
            "AI Question Generator Tailored To Each Candidate's Role",
            "Earn Credits Per Session — Withdraw Any Time",
            "Dashboard With Credit Balance And Withdrawal Requests",
        ],
    },
];

export const CATEGORIES = [
    { value: null, label: "All" },
    { value: "FRONTEND", label: "Frontend" },
    { value: "BACKEND", label: "Backend" },
    { value: "FULLSTACK", label: "Full Stack" },
    { value: "DSA", label: "DSA" },
    { value: "SYSTEM_DESIGN", label: "System Design" },
    { value: "BEHAVIORAL", label: "Behavioral" },
    { value: "DEVOPS", label: "DevOps" },
    { value: "MOBILE", label: "Mobile" },
];

export const CATEGORY_LABEL = {
    FRONTEND: "Frontend",
    BACKEND: "Backend",
    FULLSTACK: "Full Stack",
    DSA: "DSA",
    SYSTEM_DESIGN: "System Design",
    BEHAVIORAL: "Behavioral",
    DEVOPS: "DevOps",
    MOBILE: "Mobile",
};

export const YEARS_OPTIONS = [
    { value: 1, label: "1 yr" },
    { value: 2, label: "2 yrs" },
    { value: 3, label: "3 yrs" },
    { value: 5, label: "5 yrs" },
    { value: 7, label: "7 yrs" },
    { value: 10, label: "10+ yrs" },
];

export const ONBOARDING_ROLES = [
    {
        value: "INTERVIEWEE",
        icon: "🎯",
        title: "I Want To Practice",
        desc: "Browse Expert Interviewers, Book Sessions, And Get AI-Powered Feedback To Land Your Dream Role.",
    },
    {
        value: "INTERVIEWER",
        icon: "🧑‍💼",
        title: "I Want To Interview",
        desc: "Share Your Expertise, Earn Credits, And Help Engineers Level Up.",
    },
];

export const STATUS_STYLES = {
    SCHEDULED: "border-blue-500/20 bg-blue-500/10 text-blue-400",
    COMPLETED: "border-green-500/20 bg-green-500/10 text-green-400",
    CANCELLED: "border-red-500/20 bg-red-500/10 text-red-400",
};

export const RATING_STYLES = {
    POOR: "ml-auto border-red-500/20 bg-red-500/10 text-red-400",
    AVERAGE: "ml-auto border-yellow-500/20 bg-yellow-500/10 text-yellow-400",
    GOOD: "ml-auto border-blue-500/20 bg-blue-500/10 text-blue-400",
    EXCELLENT: "ml-auto border-green-500/20 bg-green-500/10 text-green-400",
};

export const RATING_LABEL = {
    POOR: "Poor",
    AVERAGE: "Average",
    GOOD: "Good",
    EXCELLENT: "Excellent",
};

export const RATING_CONFIG = {
    POOR: {
        label: "Poor",
        emoji: "📉",
        className: "border-red-500/20 bg-red-500/10 text-red-400",
        bg: "from-red-500/5",
    },
    AVERAGE: {
        label: "Average",
        emoji: "📊",
        className: "border-yellow-500/20 bg-yellow-500/10 text-yellow-400",
        bg: "from-yellow-500/5",
    },
    GOOD: {
        label: "Good",
        emoji: "👍",
        className: "border-blue-500/20 bg-blue-500/10 text-blue-400",
        bg: "from-blue-500/5",
    },
    EXCELLENT: {
        label: "Excellent",
        emoji: "🏆",
        className: "border-green-500/20 bg-green-500/10 text-green-400",
        bg: "from-green-500/5",
    },
};

export const EXPECT_ITEMS = [
    ["🎥", "HD Video Call", "45-Minute Session With Screen Sharing Built In."],
    [
        "🤖",
        "AI Question Generator",
        "Role-Specific Questions Generated Live During The Interview.",
    ],
    [
        "💬",
        "Persistent Chat",
        "Message Before And After — Share Notes, Resources, Follow-Ups.",
    ],
    [
        "📊",
        "AI Feedback Report",
        "Post-Interview Analysis Covering Technical Depth, Communication, And More.",
    ],
    [
        "📹",
        "Recording & Playback",
        "A Shareable Recording Link Is Generated Automatically After The Call.",
    ],
];
