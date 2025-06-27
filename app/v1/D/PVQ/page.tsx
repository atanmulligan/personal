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
import { questions_PVQ } from "@/lib/v1/survey/questions/PVQ";
import { LikertScaleLike } from "@/app/components/v1/LikertScale";
import { createUserProfileV1 } from "@/lib/v1/userProfile/userProfileV";
import { formatUserProfileV, generateUserProfileV, updateUserProfile } from "@/lib/v1/api/userProfile";

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
            const apiResult = await findOneSurvey(_pID, "PVQ");
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
            const result_updateSurvey = await updateSurvey(pID, "PVQ", formData);
            if (result_updateSurvey.result !== 'success') {
                throw new Error('Error updating survey. Please try again.');
            }
            const v1 = createUserProfileV1(formData);
            // console.log(v1)
            const genApiResult = await generateUserProfileV(v1);
            if (genApiResult.result !== 'success') {
                throw new Error('Error generating user profile.');
            }
            // console.log(genApiResult)
            const v2 = formatUserProfileV(genApiResult.completion.choices[0].message.content);
            if (v2.result !== 'success') {
                throw new Error('Error formatting user profile.');
            }
            // console.log(v2)
            const apiResult_updateUP = await updateUserProfile(pID, "V", v2.userProfileV);
            if (apiResult_updateUP.result !== 'success') {
                throw new Error('Error updating user profile.');
            }

            router.push(`/v1/E/demographics?pID=${pID}`);

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
                {/* <Title content="Life-guiding Principles (PVQ)" /> */}
                <div className="w-full"><Text content="Here we briefly describe some people. Please read each description and indicate <b>how much each person is like you</b>." html={true} /></div>
                <LikertScaleLike />
                {Object.entries(questions_PVQ).map(([key, question], index) => (
                    <LikertDefault
                        key={index}
                        name={key}
                        question={question}
                        leftLabel="not like me at all"
                        middleLabel="neither like nor unlike me"
                        rightLabel="very much like me"
                        onChange={onChange}
                        valueLoaded={formData[key]}
                    />
                ))}
                <Button label="Next" active={true} />
            </form>
        </>
    );
}