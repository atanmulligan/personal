"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Title from "@/app/components/v1/Title";
import Text from "@/app/components/v1/Text";
import LikertDefault from "@/app/components/v1/LikertDefault";
import Button from "@/app/components/v1/Button";
import { useEffect, useState } from "react";
import { findOneSurvey, updateSurvey } from "@/lib/v1/api/survey";
import Loading from "@/app/components/v1/Loading";
import { getPID } from "@/lib/v1/urlParams";
import { questions_BFI } from "@/lib/v1/survey/questions/BFI";
import LikertScaleAgree from "@/app/components/v1/LikertScale";
import { createUserProfileP1 } from "@/lib/v1/userProfile/userProfileP";
import { formatUserProfileP, generateUserProfileP, updateUserProfile } from "@/lib/v1/api/userProfile";

export default function Page() {
    const router = useRouter();
    const query = useSearchParams()
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({} as any);
    const [pID, setPID] = useState("");

    useEffect(() => {
        const loadData = async () => {
            let _pID = getPID(query);
            setPID(_pID);
            const apiResult = await findOneSurvey(_pID, "BFI");
            if (apiResult.result === 'success') {
                if (apiResult.survey?.formData) {
                    setFormData(apiResult.survey.formData);
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

        try {
            const result_updateSurvey = await updateSurvey(pID, "BFI", formData);
            if (result_updateSurvey.result !== 'success') {
                throw new Error('Error updating survey. Please try again.');
            }
            const p1 = createUserProfileP1(formData);
            const genApiResult = await generateUserProfileP(p1);
            if (genApiResult.result !== 'success') {
                throw new Error('Error generating user profile.');
            }
            const p2 = formatUserProfileP(genApiResult.completion.choices[0].message.content);
            if (p2.result !== 'success') {
                throw new Error('Error formatting user profile.');
            }
            const apiResult_updateUP = await updateUserProfile(pID, "P", p2.userProfileP);
            if (apiResult_updateUP.result !== 'success') {
                throw new Error('Error updating user profile.');
            }
            router.push(`/v1/D/PVQ?pID=${pID}`);
        } catch (e) {
            alert(e)
        } finally {
            setLoading(false);
        }
    }

    const onChange = (key: string, value: number) => {
        setFormData({ ...formData, [key]: value });
    }

    return (
        <>
            {loading && <Loading />}
            <form className="flex flex-col gap-6 w-full items-center justify-start h-auto mx-auto" onSubmit={onSubmit}>
                {/* <Title content="The Big Five Inventory (BFI)" /> */}
                <Text content="In this section, you will find multiple survey scales about your personality, life goals, and values. For each question, please choose the answer that most closely aligns with your thoughts, feelings, or beliefs." />
                <Text content="Below are several statements about <b>personality</b> that may or may not apply to you. Please rate how much you <b>agree</b> with each statement on a 7-point scale." html={true} />
                <LikertScaleAgree />
                <div className="w-full"><Text content="I am someone who..." /></div>
                {Object.entries(questions_BFI).map(([key, question], index) => (
                    <LikertDefault
                        key={index}
                        name={key}
                        question={question}
                        leftLabel="strongly disagree"
                        middleLabel="neither agree nor disagree"
                        rightLabel="strongly agree"
                        onChange={onChange}
                        valueLoaded={formData[key]}
                    />
                ))}
                <Button label="Next" active={true} />
            </form>
        </>
    );
}