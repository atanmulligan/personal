"use client";

import Button from "@/app/components/v1/Button";
import Loading from "@/app/components/v1/Loading";
import Text from "@/app/components/v1/Text";
import TextInput from "@/app/components/v1/TextInput";
import Title from "@/app/components/v1/Title";
import { findOneSurvey, updateSurvey } from "@/lib/v1/api/survey";
import { getPID } from "@/lib/v1/urlParams";
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
      const apiResult = await findOneSurvey(_pID, "C2FD");
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
    const apiResult = await updateSurvey(pID, "C2FD", formData);
    if (apiResult.result === 'success') {
      router.push(`/v1/C/C4DL?pID=${pID}`);
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
      <form className="flex flex-col gap-6 w-full justify-start h-auto mx-auto" onSubmit={onSubmit}>
        <Title content="Preferences: Favorites and Dislikes" />
        <Text content={`List 5 things you <b>love</b> and <b>hate</b>.`} html={true} />
        <Text content={`Feel free to include <b>anything</b>. It can be adjectives, objects
        types of individuals, kinds of food, behavior, hobby, and beyond. All
        forms of expression are welcome, whether it&apos;s a single word, a
        phrase, or a full sentence.`} html={true} />

        {['love', 'hate'].map((type) => (
          <div key={type} className="flex flex-col gap-6">
            <Text content={`<b>I ${type} ...</b>`} html={true} />
            <div className="flex justify-between">
              {[1, 2, 3, 4, 5].map((i) => {
                const name = `${type}-${i}`;
                return <TextInput
                  key={i}
                  name={name}
                  margin={false}
                  required={true}
                  value={formData[name]}
                  onChange={onChange}
                />
              })}
            </div>
          </div>
        ))}

        {/* <Text content={`<b>I love ...</b>`} html={true} />

        <div className="flex justify-between">
          {[1, 2, 3, 4, 5].map((i) => {
            const name = `love-${i}`;
            return <TextInput key={i} name={name} margin={false} required={true} value={formData[name]} onChange={onChange} />
          })}
        </div>

        <Text content={`<b>I hate ...</b>`} html={true} />

        <div className="flex justify-between">
          {[1, 2, 3, 4, 5].map((i) => {
            const name = `hate-${i}`;
            return <TextInput key={i} name={name} margin={false} required={true} value={formData[name]} onChange={onChange} />
          })}
        </div> */}

        <div className="flex flex-col items-center">
          <Button label="Next" />
        </div>
      </form>
    </>
  );
}
