import { getInterviewers } from "@/actions/explore";
import { PageHeader } from "@/components/reusables";
import { ExploreGrid } from "./components/ExploreGrid";

export async function Explore() {
    const interviewers = await getInterviewers();

    return (
        <main className="min-h-screen bg-black">
            <PageHeader
                label="Explore"
                gray="Find Your"
                gold="Expert Interviewer"
                description="Browse Senior Engineers From Top Companies."
            />
            <div className="max-w-6xl mx-auto px-8 xl:px-0 py-10">
                <ExploreGrid interviewers={interviewers} />
            </div>
        </main>
    );
}
