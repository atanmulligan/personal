"use client";

import Button from "@/app/components/v1/Button";
import Text from "@/app/components/v1/Text";
import { EssayTopicInstruction } from "@/app/components/v1/essay/EssayTopicInstruction";
import { essayTINextRoute } from "@/lib/v1/essay/params";
import { getPID } from "@/lib/v1/urlParams";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { index: string } }) {
    const router = useRouter();
    const query = useSearchParams();
    const [pID, setPID] = useState("");
    const index = params.index;
    useEffect(() => {
        let _pID = getPID(query);
        setPID(_pID);
        // console.log(params.index)
    }
        , [query]);
    return (
        <div className="flex flex-col items-center gap-6">
            {/* <p className="mb-7">
                The first essay topic is <b>a brief self-introduction of you</b> that{" "}
                <b>AITwinBot generated</b> based on information provided earlier. Please
                take a moment to reflect on how you usually introduce yourself to
                others.
                <br />
                <br />
                When you are ready, please click <b>&quot;NEXT&quot;</b>.
            </p> */}
            {/* <Text
                content="The first essay topic is <b>a brief self-introduction of you</b> that <b>AITwinBot generated</b> based on information provided earlier. Please take a moment to reflect on how you usually introduce yourself to others."
                html={true}
            /> */}
            {EssayTopicInstruction(index)}

            <Button label="NEXT" onClick={() => router.push(essayTINextRoute(pID, index))} />
        </div>
    );
}
