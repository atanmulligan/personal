"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Title from "@/app/components/v1/Title";
import Text from "@/app/components/v1/Text";
import LikertDefault from "@/app/components/v1/LikertDefault";
import Button from "@/app/components/v1/Button";
import WhiteBox from "@/app/components/v1/WhiteBox";
import { useEffect, useState } from "react";
import { questions_SPI } from "@/lib/v1/survey/questions/spi";
import { LikertScaleImportant } from "@/app/components/v1/LikertScale";
import { getPID } from "@/lib/v1/urlParams";
import { findOneSurvey, updateSurvey } from "@/lib/v1/api/survey";
import Loading from "@/app/components/v1/Loading";
import { createUserProfileA } from "@/lib/v1/userProfile/userProfileA";
import { updateUserProfile } from "@/lib/v1/api/userProfile";

export default function SPIPage() {
  const router = useRouter();
  const query = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({} as any);
  const [pID, setPID] = useState("");

  useEffect(() => {
    const loadData = async () => {
      let _pID = getPID(query);
      setPID(_pID);
      const apiResult = await findOneSurvey(_pID, "SPI");
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
      const result_updateSurvey = await updateSurvey(pID, "SPI", formData);
      if (result_updateSurvey.result !== 'success') {
        throw new Error('Error updating survey. Please try again.');
      }
      const userProfile = createUserProfileA(formData);
      // console.log(userProfile)
      const result_updateUP = await updateUserProfile(pID, "A", userProfile);
      if (result_updateUP.result !== 'success') {
        throw new Error('Error updating user profile. Please try again.');
      }
      router.push(`/v1/E/WYR?pID=${pID}`);
    } catch (e) {
      alert(e)
    } finally {
      setLoading(false)
    }
    // const apiResult = await updateSurvey(pID, "SPI", formData);
    // if (apiResult.result === 'success') {
    //   router.push(`/v1/E/WYR?pID=${pID}`);
    // } else {
    //   setLoading(false);
    //   alert('Error submitting survey. Please try again.');
    // }

  }

  const onChange = (key: string, value: number) => {
    setFormData({ ...formData, [key]: value });
  }

  return (
    <>
      {loading && <Loading />}
      <form className="flex flex-col gap-6 w-full items-center justify-start h-auto mx-auto" onSubmit={onSubmit}>
        <Text content="20. Identity is complex and multifaceted. Below, you'll find a list of components that may contribute to defining 'who you are.'" />
        <Text content="Please indicate the importance of each component to your sense of identity using the following scale:" />
        <LikertScaleImportant />

        {Object.entries(questions_SPI).map(([key, question], index) => (
          <LikertDefault
            key={index}
            name={key}
            question={question}
            leftLabel="Not at all important to who I am"
            middleLabel="Neither unimportant nor important to who I am"
            rightLabel="Extremely important to who I am"
            onChange={onChange}
            valueLoaded={formData[key]}
          />
        ))}
        <Button label="Next" active={true} />
      </form>
    </>
  );
}