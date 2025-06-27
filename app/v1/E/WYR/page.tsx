'use client';

import Button from "@/app/components/v1/Button";
import Loading from "@/app/components/v1/Loading";
import Text from "@/app/components/v1/Text";
import WYRBox from "@/app/components/v1/WYRBox";
import { findParticipantsByPIDs } from "@/lib/v1/api/participant";
import { findOneSurvey, updateSurvey } from "@/lib/v1/api/survey";
import { questions_WYR, questions_WYR_W2 } from "@/lib/v1/survey/questions/WYR";
import { getPID } from "@/lib/v1/urlParams";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const router = useRouter();
    const query = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({} as any);
    const [pID, setPID] = useState("");
    const [questions, setQuestions] = useState(questions_WYR);

    useEffect(() => {
        const loadData = async () => {
            let _pID = getPID(query);
            setPID(_pID);
            const apiResult = await findOneSurvey(_pID, "WYR");
            if (apiResult.result === 'success') {
                if (apiResult.survey?.formData) {
                    setFormData(apiResult.survey.formData);
                }
                const res_findParticipantByPID = await findParticipantsByPIDs([_pID]);
                if (res_findParticipantByPID.result !== 'success') {
                    throw new Error('Error finding participant. Please try again.');
                }
                // console.log('participants', res_findParticipantByPID.participants);
                const condition = res_findParticipantByPID.participants[0].condition;
                console.log('condition', condition);
                if (condition === 'W2') {
                    setQuestions(questions_WYR_W2 as any);
                }
            } else {
                alert('Error Loading survey data.');
            }
            setLoading(false);
        }
        loadData();
    }, [query]);

    const onSubmit = async (event: any) => {
        event.preventDefault();
        setLoading(true);
        const apiResult = await updateSurvey(pID, "WYR", formData);
        if (apiResult.result === 'success') {
            router.push(`/v1/F/EssayInstruction?pID=${pID}`);
        } else {
            setLoading(false);
            alert('Error submitting survey. Please try again.');
        }

    }

    const onChange = (key: string, value: string) => {
        setFormData({ ...formData, [key]: value });
    }
    return (
        <>
            {loading && <Loading />}
            <form className="flex flex-col gap-6 w-full items-center justify-start h-auto mx-auto" onSubmit={onSubmit}>
                <Text content={`Please respond to the following 10 "would you rather" questions. 
                For each set of options below, choose the one that more closely aligns with 
                your own thoughts and preferences. Indicate your preference by <b>selecting either "A" or "B"</b>.`}
                    html={true} />
                {Object.entries(questions).map(([key, question], index) => (
                    <WYRBox
                        key={key}
                        name={key}
                        questions={question}
                        onChange={onChange}
                        valueLoaded={formData[key]}
                    />
                ))}
                <Button label="Next" active={true} />
            </form>
        </>
    );
}