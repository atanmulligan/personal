"use client";

import Button from "@/app/components/v1/Button";
import ColoredBox from "@/app/components/v1/ColoredBox";
import Loading from "@/app/components/v1/Loading";
import Text from "@/app/components/v1/Text";
import Title from "@/app/components/v1/Title";
import { findOneSurvey, updateSurvey } from "@/lib/v1/api/survey";
import { updateUserProfile } from "@/lib/v1/api/userProfile";
import { getPID } from "@/lib/v1/urlParams";
import { createUserProfileC } from "@/lib/v1/userProfile/userProflieC";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const query = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({} as any);
  const [pID, setPID] = useState("");

  useEffect(() => {
    const loadData = async () => {
      let _pID = getPID(query);
      setPID(_pID);
      const apiResult = await findOneSurvey(_pID, "C4DL");
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
    if (countChar(formData.weekday) < 450 || countChar(formData.weekend) < 450) {
      alert('Please write more than 450 characters for each field.');
      return
    }

    setLoading(true);
    try {
      const result_updateSurvey = await updateSurvey(pID, "C4DL", formData);
      if (result_updateSurvey.result !== 'success') {
        throw new Error('Error updating survey. Please try again.');
      }
      const result_findC2FD = await findOneSurvey(pID, "C2FD");
      if (result_findC2FD.result !== 'success') {
        throw new Error('Error loading survey C2.');
      }
      const c2FormData = result_findC2FD.survey.formData;
      const userProfileC = createUserProfileC(c2FormData, formData)
      const result_updateUP = await updateUserProfile(pID, "C", userProfileC);
      if (result_updateUP.result !== 'success') {
        throw new Error('Error updating user profile. Please try again.');
      }
      router.push(`/v1/D/BFI?pID=${pID}`);
    } catch (e) {
      alert(e)
    } finally {
      setLoading(false);
    }
    // const apiResult = await updateSurvey(pID, "C4DL", formData);
    // if (apiResult.result === 'success') {
    //   router.push(`/v1/D/BFI?pID=${pID}`);
    // } else {
    //   setLoading(false);
    //   alert('Error submitting survey. Please try again.');
    // }
  }

  const countChar = (content: string) => {
    // delete space in content and count
    if (!content) return 0;
    return content.replace(/\s/g, "").length;
  }

  const onChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  }

  return (
    <>
      {loading && <Loading />}
      <form className="flex flex-col gap-6 w-full justify-start h-auto mx-auto" onSubmit={onSubmit}>
        <Title content="Daily Lives" />
        <Text content={`Please outline your typical weekday and weekend, covering the main daily activities. Please ensure that your entries are sufficient; if not, you will not be allowed to proceed. Here's an example of Marge Simpson's daily life from the Simpsons series, which you can use as a guide to write your own typical weekly routine.`} />
        <Text content={`[Marge Simpson’s Daily Lives Essay Answer]`} />
        <Text content={`<b>1. A typical weekday for me starts off by</b> waking up at 6:00 AM and preparing breakfast for the family. After the kids head to school and Homer leaves for work, I spend the morning tidying up the house and running errands. I often volunteer at the church or help with community events in the afternoon. I return home to prepare dinner, help the kids with their homework, and spend the evening with the family before bedtime.`} html={true} />
        <Text content={`<b>2. A typical weekend for me starts off by</b> attending church services on Sunday and baking something special for the family. Saturday is more flexible; we often visit the Springfield Mall or enjoy a picnic at the park. Evenings are reserved for family time, where we might watch a movie or play board games together. After our family game night, we sometimes finish with a treat, like Homer's favorite — a big bowl of ice cream, which always brings smiles and rounds out our fun-filled weekend perfectly.`} html={true} />

        {["weekday", "weekend"].map((name) => (
          <div key={name} className="flex flex-col gap-6">
            <Text content={`<b>A typical ${name} for me starts off by...</b>`} html={true} />
            <div className="w-full bg-[#E8EDF4] flex flex-col justify-start gap-6 py-4 px-4 rounded-lg">
              <textarea
                className="bg-transparent"
                name={name}
                rows={2}
                value={formData[name]}
                onChange={(e) => { onChange(name, e.target.value) }}
                required
              />
              {/* <div className="w-full flex justify-end">({countChar(formData[name])}/450)</div> */}
            </div>
          </div>
        ))}

        {/* <Text content={`<b>A typical weekday for me starts off by...</b>`} html={true} />
        <ColoredBox>
          <textarea className="bg-transparent" name="weekday" rows={2}></textarea>
        </ColoredBox>

        <Text content={`<b>A typical weekend for me starts off by...</b>`} html={true} />
        <ColoredBox>
          <textarea className="bg-transparent" name="weekend" rows={2}></textarea>
        </ColoredBox> */}

        {/* <hr /> */}

        {/* 4-2
        <p>
          <b>4-2. Highlight Unique Events from the Last Week</b>
          <br />
          Now, focus on the past 7 days and identify any events or activities that
          were out of the ordinary weekly routine. These could be activities you
          do occasionally (but not daily) or rare events that were a special part
          of your week.
        </p>

        <ColoredBox>
          <textarea className="bg-transparent h-40"></textarea>
        </ColoredBox> */}

        <div className="flex flex-col items-center">
          <Button
            label="Next"
          />
        </div>
      </form>
    </>
  );
}
