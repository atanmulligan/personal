"use client";

import Button from "@/app/components/v1/Button";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();

    return (
        <div className="flex flex-col gap-6 w-full items-center justify-center h-auto mx-auto">
            <div className="w-full">
                We plan to conduct the follow-up remote interview (20-30 minutes) to learn more about participants’ perceptions, experiences, and suggestions for AITwinbot. Are you interested in being contacted about this opportunity?
            </div>
            <div className="w-full flex justify-center gap-6">
                <Button
                    label="YES"
                    onClick={() => router.push(`/v1/E/EssayTopicInstruction`)}
                />
                <Button
                    label="NO"
                    onClick={() => router.push(`/v1/E/EssayTopicInstruction`)}
                />
            </div>

        </div>
    );
}
