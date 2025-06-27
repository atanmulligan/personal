"use client";

import Button from "@/app/components/v1/Button";
import Text from "@/app/components/v1/Text";
import Title from "@/app/components/v1/Title";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const query = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({} as any);
  const [pID, setPID] = useState("");

  return (
    <>
      <form className="flex flex-col gap-6 w-full justify-start h-auto mx-auto">
        <Title content="Personality Traits" />
        <Text content="Reflect on your behavior and characteristics within the specific contexts mentioned, using the examples as a template for your answers." />
        <p>
          Guidance for Writing Your Responses:
          <br />
          Start by identifying a trait or behavior you exhibit, followed by the
          reason or outcome of it: &quot;I try to be [Adjective/Behavior] because
          [Reason/Outcome].&quot;
        </p>
        <hr />

        <p className="font-semibold mb-1">
          When I&apos;m with family and friends,
        </p>

        <div className="flex items-center">
          <p>I tend to be</p>
          <textarea className="bg-[#E8EDF4] flex-grow mx-4 h-8 border rounded p-1"></textarea>
          <p>because</p>
          <textarea className="bg-[#E8EDF4] flex-grow ml-4 h-8 border rounded p-1"></textarea>
        </div>

        <div className="flex flex-col items-center">
          <Button label="Next" onClick={() => router.push(`/v1/C/C2FD`)} />
        </div>
      </form>
    </>
  );
}
