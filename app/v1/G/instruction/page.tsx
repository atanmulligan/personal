"use client";

import Button from "@/app/components/v1/Button";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center">
            <p className="mb-7">
                In this section, you will engage in <b>a brief chat with your AITwinBot.</b>
                <br />
                As noted in the previous sections, AITwinBot is an AI-powered bot trained on your data to mirror you. Please engage in the chat for about 5 minutes.
                <br />
                <b>In this chat, you and your AITwibot will work together to identify 1) <u>your key strengths and weaknesses</u> and 2) <u>brainstorm strategies to overcome them</u>.</b>
                <br />
                <br />
                <b>Feel free to ask your AITwinBot for assistance in identifying your strengths and weaknesses and for suggestions on how to overcome your weaknesses.</b>
                <br />
                <br />
                After your conversation, you will be asked to evaluate your experience with AITwinBot.
                <br />
                <br />
                Now, click the button below to begin the conversation.
            </p>
            <Button
                label="NEXT"
                onClick={() => router.push(`/v1/E/EssayTopicInstruction`)}
            />
        </div>
    );
}
