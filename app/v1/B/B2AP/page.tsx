"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Title from "@/app/components/v1/Title";
import Text from "@/app/components/v1/Text";
import LikertDefault from "@/app/components/v1/LikertDefault";
import Button from "@/app/components/v1/Button";
import { questions_B2AP } from "@/lib/v1/survey/questions/B2AP";
import { useEffect, useState } from "react";
import Loading from "@/app/components/v1/Loading";
import { findOneSurvey, updateSurvey } from "@/lib/v1/api/survey";
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
      const apiResult = await findOneSurvey(_pID, "B2AP");
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
    const apiResult = await updateSurvey(pID, "B2AP", formData);
    if (apiResult.result === 'success') {
      router.push(`/v1/C/instruction?pID=${pID}`);
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
        {/* <Title content="AI Perception" /> */}
        <Text content="Below are several statements related to how you perceive AI. Please rate how much you agree with each statement on a 7-point scale." />
        <LikertScaleAgree />
        {Object.entries(questions_B2AP).map(([key, question], index) => (
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
        ))
        }
        <Button label="Next" active={true} />
      </form>
    </>
  );
}