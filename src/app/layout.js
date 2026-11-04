import { Lora, DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const lora = Lora({
    subsets: ["latin"],
    weight: ["400", "500"],
    style: ["normal", "italic"],
    variable: "--font-serif",
});

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    variable: "--font-sans",
});

export const metadata = {
    title: "Vervue",
    description:
        "An AI-Powered Interview Marketplace SaaS Featuring Real-Time Video Interviews, Chat, Authentication, And Seamless Interview Management.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${lora.variable} ${dmSans.variable} font-sans`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <main className="min-h-screen">{children}</main>
                    <Toaster richColors />
                </ThemeProvider>
            </body>
        </html>
    );
}
