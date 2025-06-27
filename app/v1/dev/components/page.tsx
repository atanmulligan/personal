"use client";
import { useRouter } from "next/navigation";

import Title from "@/app/components/v1/Title";
import Text from "@/app/components/v1/Text";
import ChatContent from "@/app/components/v1/ChatContent";
import LikertDefault from "@/app/components/v1/LikertDefault";
import LikertSimple from "@/app/components/v1/LikertSimple";
import Button from "@/app/components/v1/Button";
import ColoredBox from "@/app/components/v1/ColoredBox";
import Slider from "@/app/components/v1/Slider";
import ToggleButton from "@/app/components/v1/ToggleButton";
import EssayRanker from "@/app/components/v1/EssayRanker";
import TextInput from "@/app/components/v1/TextInput";
import RadioInput from "@/app/components/v1/RadioInput";
import CheckboxInput from "@/app/components/v1/CheckboxInput";
import Loading from "@/app/components/v1/Loading";
import { useState } from "react";
import LikertScaleAgree from "@/app/components/v1/LikertScale";
import WYRBox from "@/app/components/v1/WYRBox";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const wyrQuestions = [
    { symbol: 'A', question: 'Accept a high-paying job offer in a city far from your home country.' },
    { symbol: 'B', question: 'Accept a modest-paying job in your hometown, close to your family.' },
  ]

  return (
    // Should Add div className with
    // "flex flex-col gap-6 w-full items-center justify-center h-auto mx-auto"
    // for pretty layout XD
    <div className="flex flex-col gap-6 w-full items-center justify-center h-auto mx-auto">
      {/* colored box for consent form*/}
      <ColoredBox>
        <Title content="Title component" />
        <Text content="text component" />
      </ColoredBox>

      {/* likert scale instruction for likert survey*/}
      <LikertScaleAgree />

      {/* chat component for each chat interface*/}
      <ChatContent content="ChatContent role={true}" role={true} />
      <ChatContent content="ChatContent role={false}" role={false} />

      {/* default likert scale with question, left middle right label */}
      <LikertDefault
        name="likertdefault-1"
        question="My age group"
        leftLabel="Not at all important to who I am"
        middleLabel="Neither unimportant nor important to who I am"
        rightLabel="Extremely important to who I am"
      />
      <LikertDefault
        name="likertdefault-2"
        question="I frequently examine my feelings."
        leftLabel="strongly disagree"
        middleLabel="neither agree nor disagree"
        rightLabel="strongly agree"
      />

      {/* simple likert scale with no question and middle label */}
      <LikertSimple
        name="likertsimple"
        leftLabel="The conversation with AITwinBot was very dissatisfying"
        rightLabel="The conversation with AITwinBot was very satisfying"
      />

      {/* Essay Ranker */}
      <EssayRanker
      />

      {/* slider */}
      <Slider name="slider-1" label="Slider 1" />

      {/* Toggle button */}
      <ToggleButton content="Toggle Button for TST" />

      {/* Next Button */}
      <Button
        label="Next"
        onClick={() => {
          router.push("/v1/dev/components");
        }}
        active={true}
      />

      {/* Loading */}
      <Button
        label="loading 3s"
        onClick={() => {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
          }, 3000);

        }}
        active={true}
      />
      {loading && <Loading message="Input message here." />}

      {/* TextInput */}
      <TextInput label="TextInput" name="textInput" />

      {/* RadioInput */}
      <RadioInput
        question="RadioInput"
        name="radioInput"
        options={["option1", "option2", "option3"]} />
      {/* CheckboxInput */}
      <CheckboxInput
        question="CheckboxInput"
        name="checkboxInput"
        options={["option1", "option2", "option3"]} />

      <WYRBox name="WYR" questions={wyrQuestions} />
    </div>
  );
}
