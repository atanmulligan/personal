"use client";

import Button from "@/app/components/v1/Button";
import { getPID } from "@/lib/v1/urlParams";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BInstructionPage() {
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
        <br />
        <br />
        Let&rsquo;s begin by exploring your daily thoughts and feelings about yourself and artificial intelligence (AI). In the following section, we invite you to respond to a series of questions. Remember, there&rsquo;s no right or wrong answer here; we&rsquo;re interested in your genuine, everyday perspectives. So, relax and share what naturally comes to mind.
        <br />
        <br />
        When you are ready, please click <b>&quot;NEXT&quot;</b>.
      </p>
      <Button label="NEXT" onClick={() => router.push(`/v1/B/B1GS?pID=${pID}`)} />
    </div>
  );
}