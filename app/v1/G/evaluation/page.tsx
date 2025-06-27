"use client";

import Button from "@/app/components/v1/Button";
import ColoredBox from "@/app/components/v1/ColoredBox";
import LikertDefault from "@/app/components/v1/LikertDefault";
import LikertScaleAgree from "@/app/components/v1/LikertScale";
import LikertSimple from "@/app/components/v1/LikertSimple";
import Slider from "@/app/components/v1/Slider";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();

    return (
        <div className="flex flex-col gap-6 w-full items-center justify-center h-auto mx-auto">
            <div className="w-full">
                Your conversation with AITwinBot has ended. Please rate your experience with AITwinBot below.
                <br />
                <br />
                <b>My AITwinBot ….</b>
            </div>

            <LikertSimple
                name="likertsimple"
                leftLabel="The conversation with AITwinBot was very dissatisfying"
                rightLabel="The conversation with AITwinBot was very satisfying"
            />
            <LikertSimple
                name="likertsimple"
                leftLabel="The conversation with AITwinBot was very dissatisfying"
                rightLabel="The conversation with AITwinBot was very satisfying"
            />
            <div className="w-full">
                To what extent do you agree or disagree with each of the following statements?
            </div>
            <LikertScaleAgree />
            <LikertDefault
                name="likertdefault-2"
                question="I frequently examine my feelings."
                leftLabel="strongly disagree"
                middleLabel="neither agree nor disagree"
                rightLabel="strongly agree"
            />
            <LikertDefault
                name="likertdefault-2"
                question="I frequently examine my feelings."
                leftLabel="strongly disagree"
                middleLabel="neither agree nor disagree"
                rightLabel="strongly agree"
            />
            <div className="w-full">
                Please select the picture that best represents the extent of overlap between AITwinBot and yourself.
            </div>
            <div className="w-full">
                Rate each essay based on the degree of overlap between each essay and yourself. Use a score from 0% to 100%, where 0% means no overlap at all and 100% indicates complete overlap.
            </div>
            <Slider name="slider-1" label="Slider 1" />
            <Slider name="slider-1" label="Slider 1" />
            <Slider name="slider-1" label="Slider 1" />
            <div className="w-full">
                How was your chatting experience with AITwinBot? Feel free to note anything that interests you/frustrates you. We would appreciate any suggestions you have for improving the AITwinbot.
            </div>
            <ColoredBox>
                <textarea className="w-full h-20 p-2 bg-transparent" />
            </ColoredBox>


            <Button
                label="NEXT"
                onClick={() => router.push(`/v1/E/EssayTopicInstruction`)}
            />
        </div>
    );
}
