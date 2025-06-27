"use client";

import Button from "@/app/components/v1/Button";
import { getPID } from "@/lib/v1/urlParams";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const router = useRouter();
    const query = useSearchParams();
    const [pID, setPID] = useState("");
    useEffect(() => {
        let _pID = getPID(query);
        setPID(_pID);
    }
        , [query]);

    return (
        <div className="flex flex-col items-center">
            <p className="mb-7">
                Thanks to the information you&apos;ve shared in earlier sections,
                we&apos;ve created your <b>AITwinBot</b> using advanced AI technologies,
                like ChatGPT.
                <br />
                <br />
                Your AITwinBot has been tailored to mirror how you think, write, and
                talk like you. In this section, you&apos;ll{" "}
                <b>examine several versions of short essays about you</b> that your
                AITwinBot has generated. These essays are crafted to reflect aspects of
                your personality, thoughts, and interests.
                <br />
                <br />
                When you are ready, please click <b>&quot;NEXT&quot;</b>.
            </p>
            <Button
                label="NEXT"
                onClick={() => router.push(`/v1/F/EssayTopicInstruction/1?pID=${pID}`)}
            />
        </div>
    );
}
