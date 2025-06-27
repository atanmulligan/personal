"use client";

import Button from "@/app/components/v1/Button";
import ColoredBox from "@/app/components/v1/ColoredBox";
import EssayRanker from "@/app/components/v1/EssayRanker";
import LikertSimple from "@/app/components/v1/LikertSimple";
import Loading from "@/app/components/v1/Loading";
import Slider from "@/app/components/v1/Slider";
import Text from "@/app/components/v1/Text";
import Title from "@/app/components/v1/Title";
import WhiteBox from "@/app/components/v1/WhiteBox";
import { essayThemesHTML } from "@/app/components/v1/essay/essayTheme";
import { findEssaysByEssayNum, findOneEssay, generateEssay, updateEssay } from "@/lib/v1/api/essay";
import { findOneEssayOrder } from "@/lib/v1/api/essayOrder";
import { findParticipantsByPIDs } from "@/lib/v1/api/participant";
import { findOneSurvey, updateSurvey } from "@/lib/v1/api/survey";
import { essayNextRoute } from "@/lib/v1/essay/params";
import { getPID } from "@/lib/v1/urlParams";
import { getEssayPromptsW1, getEssayPromptsW2 } from "@/lib/v1/userProfile/userProfile";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { index: string } }) {
    const router = useRouter();
    const query = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [loadingMessage, setLoadingMessage] = useState("");
    const [essayOrder, setEssayOrder] = useState([] as any[]);
    const [essays, setEssays] = useState({} as any);
    const [essayRank, setEssayRank] = useState({} as any);
    const [formData, setFormData] = useState({
        essay1Overlap: "50",
        essay2Overlap: "50",
        essay3Overlap: "50",
        essay4Overlap: "50",

    } as any);
    const [pID, setPID] = useState("");
    const index = params.index;

    useEffect(() => {
        // Check if Essay already generated.
        const loadData = async () => {
            let _pID = getPID(query);
            setPID(_pID);
            try {
                // Participant
                const res_findParticipantByPID = await findParticipantsByPIDs([_pID]);
                if (res_findParticipantByPID.result !== "success") {
                    throw new Error("Error finding participant.");
                }
                const condition = res_findParticipantByPID.participants[0].condition;
                console.log("condition", condition);

                //Essay Order
                const result_findEssayOrder = await findOneEssayOrder(_pID, index);
                if (result_findEssayOrder.result !== "success") {
                    throw new Error("Error finding essayOrder data by pID.");
                }
                // console.log(result_findEssayOrder.essayOrder);
                setEssayOrder(result_findEssayOrder.essayOrder.order);
                //Find Essays
                const result_findEssays = await findEssaysByEssayNum(_pID, index);
                if (result_findEssays.result !== "success") {
                    throw new Error("Error finding essay data by pID.");
                }

                //Generate Essays
                if (result_findEssays.essays.length < 4) { // If essay not found, create new essay.
                    console.log("Essay not found. Generating new essay.");
                    setLoadingMessage("Generating Essay (0/4)");
                    const newEssays = {} as any;

                    if (condition === "W1") {
                        // Get System Messages
                        const result_getEssayPromptsW1 = await getEssayPromptsW1(_pID, index);
                        if (result_getEssayPromptsW1.result !== "success") {
                            throw new Error("Error getting essay prompts.");
                        }
                        // Find Essay D
                        const result_findEssayD = await findOneEssay(_pID, index, "D");
                        if (result_findEssayD.result !== "success") {
                            throw new Error("Error finding essay D.");
                        }
                        if (!result_findEssayD.essay) { // Generate Essay D
                            const result_genEssayD = await generateEssay(result_getEssayPromptsW1.essayPrompts.D);
                            if (result_genEssayD.result !== "success") {
                                throw new Error("Error generating essay D.");
                            }
                            // console.log(result_genEssayD.essay);
                            newEssays.D = result_genEssayD.essay;
                            // Update Essay D
                            const result_updateEssayD = await updateEssay(_pID, index, 'D', {
                                systemMessage: result_getEssayPromptsW1.essayPrompts.D,
                                essayText: result_genEssayD.essay
                            });
                            if (result_updateEssayD.result !== "success") {
                                throw new Error("Error updating essay D.");
                            }
                        } else {
                            newEssays.D = result_findEssayD.essay;
                        }
                        setLoadingMessage("Generating Essay (1/4)");
                        // Find Essay DPV
                        const result_findEssayDPV = await findOneEssay(_pID, index, "DPV");
                        if (result_findEssayDPV.result !== "success") {
                            throw new Error("Error finding essay DPV.");
                        }
                        if (!result_findEssayDPV.essay) { // Generate Essay DPV
                            const result_genEssayDPV = await generateEssay(result_getEssayPromptsW1.essayPrompts.DPV);
                            if (result_genEssayDPV.result !== "success") {
                                throw new Error("Error generating essay DPV.");
                            }
                            newEssays.DPV = result_genEssayDPV.essay;
                            // Update Essay DPV
                            const result_updateEssayDPV = await updateEssay(_pID, index, 'DPV', {
                                systemMessage: result_getEssayPromptsW1.essayPrompts.DPV,
                                essayText: result_genEssayDPV.essay
                            });
                            if (result_updateEssayDPV.result !== "success") {
                                throw new Error("Error updating essay DPV.");
                            }
                        } else {
                            newEssays.DPV = result_findEssayDPV.essay;
                        }
                        setLoadingMessage("Generating Essay (2/4)");
                        // Find Essay DPVC
                        const result_findEssayDPVC = await findOneEssay(_pID, index, "DPVC");
                        if (result_findEssayDPVC.result !== "success") {
                            throw new Error("Error finding essay DPVC.");
                        }
                        if (!result_findEssayDPVC.essay) { // Generate Essay DPVC
                            const result_genEssayDPVC = await generateEssay(result_getEssayPromptsW1.essayPrompts.DPVC);
                            if (result_genEssayDPVC.result !== "success") {
                                throw new Error("Error generating essay DPVC.");
                            }
                            newEssays.DPVC = result_genEssayDPVC.essay;
                            // Update Essay DPVC
                            const result_updateEssayDPVC = await updateEssay(_pID, index, 'DPVC', {
                                systemMessage: result_getEssayPromptsW1.essayPrompts.DPVC,
                                essayText: result_genEssayDPVC.essay
                            });
                            if (result_updateEssayDPVC.result !== "success") {
                                throw new Error("Error updating essay DPVC.");
                            }
                        } else {
                            newEssays.DPVC = result_findEssayDPVC.essay;
                        }
                        setLoadingMessage("Generating Essay (3/4)");

                        // Find Essay DPVCA
                        const result_findEssayDPVCA = await findOneEssay(_pID, index, "DPVCA");
                        if (result_findEssayDPVCA.result !== "success") {
                            throw new Error("Error finding essay DPVCA.");
                        }
                        if (!result_findEssayDPVCA.essay) { // Generate Essay DPVCA
                            const result_genEssayDPVCA = await generateEssay(result_getEssayPromptsW1.essayPrompts.DPVCA);
                            if (result_genEssayDPVCA.result !== "success") {
                                throw new Error("Error generating essay DPVCA.");
                            }
                            newEssays.DPVCA = result_genEssayDPVCA.essay;
                            // Update Essay DPVCA
                            const result_updateEssayDPVCA = await updateEssay(_pID, index, 'DPVCA', {
                                systemMessage: result_getEssayPromptsW1.essayPrompts.DPVCA,
                                essayText: result_genEssayDPVCA.essay
                            });
                            if (result_updateEssayDPVCA.result !== "success") {
                                throw new Error("Error updating essay DPVCA.");
                            }
                        } else {
                            newEssays.DPVCA = result_findEssayDPVCA.essay;
                        }
                        setEssays(newEssays);
                        // console.log(newEssays);
                        setLoadingMessage("Generating Essay (4/4)");

                    } else if (condition === "W2") {
                        // Get System Messages
                        const result_getEssayPromptsW2 = await getEssayPromptsW2(_pID, index);
                        if (result_getEssayPromptsW2.result !== "success") {
                            throw new Error("Error getting essay prompts.");
                        }
                        // Find Essay D
                        const result_findEssayD = await findOneEssay(_pID, index, "D");
                        if (result_findEssayD.result !== "success") {
                            throw new Error("Error finding essay D.");
                        }
                        if (!result_findEssayD.essay) { // Generate Essay D
                            const result_genEssayD = await generateEssay(result_getEssayPromptsW2.essayPrompts.D);
                            if (result_genEssayD.result !== "success") {
                                throw new Error("Error generating essay D.");
                            }
                            // console.log(result_genEssayD.essay);
                            newEssays.D = result_genEssayD.essay;
                            // Update Essay D
                            const result_updateEssayD = await updateEssay(_pID, index, 'D', {
                                systemMessage: result_getEssayPromptsW2.essayPrompts.D,
                                essayText: result_genEssayD.essay
                            });
                            if (result_updateEssayD.result !== "success") {
                                throw new Error("Error updating essay D.");
                            }
                        } else {
                            newEssays.D = result_findEssayD.essay;
                        }
                        setLoadingMessage("Generating Essay (1/4)");
                        // Find Essay PV
                        const result_findEssayPV = await findOneEssay(_pID, index, "PV");
                        if (result_findEssayPV.result !== "success") {
                            throw new Error("Error finding essay PV.");
                        }
                        if (!result_findEssayPV.essay) { // Generate Essay PV
                            const result_genEssayPV = await generateEssay(result_getEssayPromptsW2.essayPrompts.PV);
                            if (result_genEssayPV.result !== "success") {
                                throw new Error("Error generating essay PV.");
                            }
                            newEssays.PV = result_genEssayPV.essay;
                            // Update Essay PV
                            const result_updateEssayPV = await updateEssay(_pID, index, 'PV', {
                                systemMessage: result_getEssayPromptsW2.essayPrompts.PV,
                                essayText: result_genEssayPV.essay
                            });
                            if (result_updateEssayPV.result !== "success") {
                                throw new Error("Error updating essay PV.");
                            }
                        } else {
                            newEssays.DPV = result_findEssayPV.essay;
                        }
                        setLoadingMessage("Generating Essay (2/4)");

                        // Find Essay C
                        const result_findEssayC = await findOneEssay(_pID, index, "C");
                        if (result_findEssayC.result !== "success") {
                            throw new Error("Error finding essay C.");
                        }
                        if (!result_findEssayC.essay) { // Generate Essay C
                            const result_genEssayC = await generateEssay(result_getEssayPromptsW2.essayPrompts.C);
                            if (result_genEssayC.result !== "success") {
                                throw new Error("Error generating essay C.");
                            }
                            newEssays.C = result_genEssayC.essay;
                            // Update Essay C
                            const result_updateEssayC = await updateEssay(_pID, index, 'C', {
                                systemMessage: result_getEssayPromptsW2.essayPrompts.C,
                                essayText: result_genEssayC.essay
                            });
                            if (result_updateEssayC.result !== "success") {
                                throw new Error("Error updating essay C.");
                            }
                        } else {
                            newEssays.C = result_findEssayC.essay;
                        }
                        setLoadingMessage("Generating Essay (3/4)");

                        // Find Essay DPVC
                        const result_findEssayDPVC = await findOneEssay(_pID, index, "DPVC");
                        if (result_findEssayDPVC.result !== "success") {
                            throw new Error("Error finding essay DPVC.");
                        }
                        if (!result_findEssayDPVC.essay) { // Generate Essay DPVC
                            const result_genEssayDPVC = await generateEssay(result_getEssayPromptsW2.essayPrompts.DPVC);
                            if (result_genEssayDPVC.result !== "success") {
                                throw new Error("Error generating essay DPVC.");
                            }
                            newEssays.DPVC = result_genEssayDPVC.essay;
                            // Update Essay DPVC
                            const result_updateEssayDPVC = await updateEssay(_pID, index, 'DPVC', {
                                systemMessage: result_getEssayPromptsW2.essayPrompts.DPVC,
                                essayText: result_genEssayDPVC.essay
                            });
                            if (result_updateEssayDPVC.result !== "success") {
                                throw new Error("Error updating essay DPVC.");
                            }
                        } else {
                            newEssays.DPVC = result_findEssayDPVC.essay;
                        }
                        setEssays(newEssays);
                        // console.log(newEssays);
                        setLoadingMessage("Generating Essay (4/4)");
                    }

                } else { // If essay found, load essay.
                    const _essays = {} as any;
                    result_findEssays.essays.forEach((e: any) => {
                        _essays[e.condition] = e.essayText;
                    });
                    setEssays(_essays);
                }

                // find FormData
                const result_findEssayFormData = await findOneSurvey(_pID, `Essay${index}`);
                if (result_findEssayFormData.result !== "success") {
                    throw new Error("Error finding survey data by pID.");
                }
                if (result_findEssayFormData.survey?.formData) {
                    setFormData(result_findEssayFormData.survey.formData);
                    console.log(result_findEssayFormData.survey.formData);
                }
            } catch (e) {
                alert(e + " Please refresh the page.")
            }
            setLoading(false);
        };
        loadData();
    }, [query]);

    const onSubmit = async (event: any) => {
        event.preventDefault();
        setLoading(true);
        const result = await updateSurvey(pID, `Essay${index}`, formData);
        if (result.result === 'success') {
            router.push(essayNextRoute(pID, index));
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
            {loading && <Loading message={loadingMessage} />}
            {!loading && (
                <form className="flex flex-col gap-6 w-full items-center justify-center h-auto mx-auto" onSubmit={onSubmit}>
                    <div className="w-full">
                        <Text content={essayThemesHTML[index]} html={true} />
                    </div>
                    {essayOrder.map((eo: any, i: number) => (
                        <div key={i} className="w-full">
                            <WhiteBox>
                                <Text content={`<b>Essay ${i + 1}</b>`} html={true} />
                                <Text
                                    content={`${essays[eo]}`}
                                />
                            </WhiteBox>
                        </div>
                    ))}
                    {Object.keys(essays).length === 4 && (
                        <>
                            {/* Q1 */}
                            <div className="flex flex-col gap-4 mt-2 mb-10 w-full ">
                                <Text content={`1. After reviewing all <b>three</b> essays,
                                rank them in order of <b>how accurately they describe you</b>. 
                                Your ranking should be '<b>1</b>' for the essay that 
                                <b>most accurately describes you</b> and '<b>4</b>' for 
                                <b>the least accurate</b>.`} html={true} />
                                <EssayRanker numOptions={4}
                                    rank1={parseInt(formData?.rank1)}
                                    rank2={parseInt(formData?.rank2)}
                                    rank3={parseInt(formData?.rank3)}
                                    rank4={parseInt(formData?.rank4)}
                                    onChange={onChange}
                                />
                            </div>

                            {/* Q2 */}
                            <div className="flex flex-col gap-4 mt-2 mb-10 w-full">
                                <Text content={`2. Rate each essay based on 
                            <b>the degree of overlap between each essay and yourself</b>. 
                            Use a score from 0% to 100%, where 0% means no overlap 
                            at all and 100% indicates complete overlap.`} html={true} />
                                <div className="my-2">
                                    <Slider name="essay1Overlap" label="Essay 1"
                                        valueLoaded={formData?.essay1Overlap}
                                        onChange={onChange} />
                                </div>
                                <div className="my-2">
                                    <Slider name="essay2Overlap" label="Essay 2"
                                        valueLoaded={formData?.essay2Overlap}
                                        onChange={onChange} />
                                </div>
                                <div className="my-2">
                                    <Slider name="essay3Overlap" label="Essay 3"
                                        valueLoaded={formData?.essay3Overlap}
                                        onChange={onChange} />
                                </div>
                                <div className="my-2">
                                    <Slider name="essay4Overlap" label="Essay 4"
                                        valueLoaded={formData?.essay4Overlap}
                                        onChange={onChange} />
                                </div>
                            </div>

                            {/* Q3 */}
                            <div className="flex flex-col gap-4 mt-2 mb-10 w-full">
                                <Text content={`3. Please provide a brief explanation for your rankings:`} html={true} />
                                {formData?.rank1 && (
                                    <>
                                        <Text content={`Briefly explain why you chose <b>the essay ${formData.rank1}</b> ranked number 1 as having the most overlap with you.`} html={true} />
                                        <ColoredBox>
                                            <textarea className="w-full h-20 p-2 bg-transparent"
                                                name="rank1Explain"
                                                value={formData?.rank1Explain}
                                                onChange={(e) => onChange("rank1Explain", e.target.value)}
                                                required />
                                        </ColoredBox>
                                    </>
                                )}
                                {formData?.rank4 && (
                                    <>
                                        <Text content={`Briefly explain why you chose <b>the essay ${formData.rank4}</b> ranked number 4 as having the least overlap with you.`} html={true} />
                                        <ColoredBox>
                                            <textarea className="w-full h-20 p-2 bg-transparent"
                                                name="rank4Explain"
                                                value={formData?.rank4Explain}
                                                onChange={(e) => onChange("rank4Explain", e.target.value)}
                                                required />
                                        </ColoredBox>
                                    </>
                                )}

                            </div>

                            <div className="flex flex-col items-center">
                                <Button label="NEXT" />
                            </div>
                        </>

                    )}


                </form>
            )}

        </>
    );
}
