"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Title from "@/app/components/v1/Title";
import Text from "@/app/components/v1/Text";
import LikertDefault from "@/app/components/v1/LikertDefault";
import Button from "@/app/components/v1/Button";
import { useEffect, useState } from "react";
import { questions_B1GS } from "@/lib/v1/survey/questions/B1GS";
import { findOneSurvey, updateSurvey } from "@/lib/v1/api/survey";
import Loading from "@/app/components/v1/Loading";
import { getPID } from "@/lib/v1/urlParams";
import LikertScaleAgree from "@/app/components/v1/LikertScale";

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
      const apiResult = await findOneSurvey(_pID, "B1GS");
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
    const apiResult = await updateSurvey(pID, "B1GS", formData);
    if (apiResult.result === 'success') {
      router.push(`/v1/B/B2AP?pID=${pID}`);
    } else {
      setLoading(false);
      alert('Error submitting survey. Please try again.');
    }

  }

  const onChange = (key: string, value: number) => {
    setFormData({ ...formData, [key]: value });
  }

  return (
    <>
      {loading && <Loading />}
      <form className="flex flex-col gap-6 w-full items-center justify-start h-auto mx-auto" onSubmit={onSubmit}>
        {/* <Title content="General Self-awareness" /> */}
        <Text content="Below are several statements about self-awareness, the ability to recognize and understand your thoughts, feelings, and actions. Please rate how much you agree with each statement on a 7-point scale." />
        <LikertScaleAgree />
        {Object.entries(questions_B1GS).map(([key, question], index) => (
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