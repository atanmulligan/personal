"use client";

import Button from "@/app/components/v1/Button";
import ColoredBox from "@/app/components/v1/ColoredBox";
import Title from "@/app/components/v1/Title";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6 w-full justify-start h-auto mx-auto">
      <p className="text-3xl font-bold leading-10">3. Key Values</p>
      <p>
        Identify two core values that are crucial in your life and briefly
        explain why.
      </p>
      <hr />

      <div className="flex mt-16">
        <div className="w-[30%] mr-2">
          <p className="font-semibold mb-1">Important Value</p>
          <textarea className="bg-[#E8EDF4] w-full border rounded p-1 h-10"></textarea>
        </div>
        <div className="flex-grow">
          <p className="font-semibold mb-1">Reason</p>
          <textarea className="bg-[#E8EDF4] w-full border rounded p-1 h-10"></textarea>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <Button label="Next" onClick={() => router.push(`/v1/C/C4DL`)} />
      </div>
    </div>
  );
}
