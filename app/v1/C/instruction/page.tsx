"use client";

import Button from "@/app/components/v1/Button";
import { getPID } from "@/lib/v1/urlParams";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const query = useSearchParams();
  const [pID, setPID] = useState("");
  useEffect(() => {
    let _pID = getPID(query);
    setPID(_pID);
  }, [query]);

  return (
    <div className="flex flex-col items-center">
      <p className="mb-7">
        In this part of the survey, we&apos;re interested in learning more about
        who you are. You will be asked to write <b>several short essays</b>{" "}
        about your <u>personality</u>, what you <u>like</u> and <u>dislike</u>,
        what <u>values</u> are important to you, and how you spend a{" "}
        <u>typical day</u>.
        <br />
        <br />
        Please remember, there&apos;s no need to worry about &apos;right&apos;
        or &apos;wrong&apos; answers here; we&apos;re looking for your honest
        thoughts. When responding to these open-ended questions, we encourage
        you to use your own words freely.
        <br />
        <br />
        When you are ready, please click <b>&quot;NEXT&quot;</b>.
      </p>
      <Button label="NEXT" onClick={() => router.push(`/v1/C/C2FD?pID=${pID}`)} />
    </div>
  );
}
