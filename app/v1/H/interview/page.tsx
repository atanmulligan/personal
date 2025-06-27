"use client";

import Button from "@/app/components/v1/Button";
import ColoredBox from "@/app/components/v1/ColoredBox";
import Loading from "@/app/components/v1/Loading";
import Text from "@/app/components/v1/Text";
import { findParticipantsByPIDs, updateParticipant } from "@/lib/v1/api/participant";
import { getPID } from "@/lib/v1/urlParams";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { finished } from "stream";

export default function Page() {
    const router = useRouter();
    const query = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [pID, setPID] = useState("");

    useEffect(() => {
        let _pID = getPID(query);
        setPID(_pID);

    }, []);

    const handleButton = async (interested: boolean) => {
        setLoading(true);
        try {
            const result_updateInterview = await updateParticipant(pID, {
                interview: interested,
                finished: true,
                finishedAt: new Date().toISOString()
            });
            if (result_updateInterview.result !== 'success') {
                throw new Error('Error updating participant. Please try again.');
            }
            router.push(`/v1/H/wrapUp?pID=${pID}`);
        } catch (e) {
            alert(e)
        }
        setLoading(false);
    }

    return (
        <>
            <div className="flex flex-col gap-6 w-full  justify-center h-auto mx-auto">
                <Text content="This is the end of the survey." />
                <Text content="We plan to conduct the follow-up remote interview (20-30 minutes) to learn more about participants’ perceptions, experiences, and suggestions for AITwinbot. Are you interested in being contacted about this opportunity?" />
                <div className="flex gap-6 justify-center w-full">
                    <Button label="Yes" onClick={() => { handleButton(true) }} />
                    <Button label="No" onClick={() => { handleButton(false) }} />
                </div>
            </div>
        </>
    );
}
