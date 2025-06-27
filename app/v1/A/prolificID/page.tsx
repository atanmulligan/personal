"use client";

import Button from "@/app/components/v1/Button";
import TextInput from "@/app/components/v1/TextInput";
import { findParticipantsByPIDs, updateParticipant } from "@/lib/v1/api/participant";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { defaultCondition, conditions, generateProlificCODE } from "@/lib/v1/urlParams";
import Loading from "@/app/components/v1/Loading";
import { createEssayOrderUnlessExist } from "@/lib/v1/api/essayOrder";

export default function Page() {
    const router = useRouter();
    const query = useSearchParams();
    const [loading, setLoading] = useState(false);

    const handleNext = async (event: any) => {
        event.preventDefault();
        setLoading(true);
        const pID = event.target.prolificID.value;
        let condition = query.get('cond') as string;
        if (!conditions.includes(condition)) {
            condition = defaultCondition;
        }
        try {
            const result_findParticipant = await findParticipantsByPIDs([pID]);
            if (result_findParticipant.result !== 'success') {
                throw new Error('Error finding participant. Please try again.');
            }
            if (result_findParticipant.participants.length == 0) {
                const prolificCode = generateProlificCODE();
                const result_updateParticipant = await updateParticipant(pID, { condition, prolificCode });
                if (result_updateParticipant.result !== 'success') {
                    throw new Error('Error creating participant. Please try again.');
                }
                const result_createEssayOrder = await createEssayOrderUnlessExist(pID, condition);
                if (result_createEssayOrder.result !== 'success') {
                    throw new Error('Error creating essay order. Please try again.');
                }

            }

            router.push(`/v1/A/generalInstructions?pID=${pID}`);
        } catch (e) {
            alert(e)
        } finally {
            setLoading(false);
        }
        // const apiResult = await updateParticipant(pID, { condition });
        // if (apiResult.result === 'success') {
        //     router.push(`/v1/A/consentForm?pID=${pID}`);
        // } else {
        //     setLoading(false);
        //     alert('Error creating participant. Please try again.');
        // }
    }

    return (
        <>
            {loading && <Loading />}
            <form className="flex flex-col gap-6 w-full items-center justify-center h-auto mx-auto" onSubmit={handleNext}>
                <div className="w-full">
                    Please put your Prolific ID here
                </div>
                <div className="w-full">
                    <TextInput label="Prolific ID" name="prolificID" widthClass="w-1/2" required={true} />
                </div>
                <div className="w-full">
                    Make sure you&rsquo;ve entered the correct Prolific ID without typos.
                </div>
                <Button label="next" />
            </form>
        </>
    );
}
