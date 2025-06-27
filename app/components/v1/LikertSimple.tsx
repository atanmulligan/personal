"use client";

import { useState } from "react";

export default function LikertSimple({
  name,
  leftLabel,
  rightLabel,
  numOptions = 7,
}: {
  name: string;
  leftLabel: string;
  rightLabel: string;
  numOptions?: number;
}) {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const options = Array.from({ length: numOptions }, (_, i) => i + 1);

  return (
    <div className="flex w-full py-5 px-12 justify-center items-center bg-[#E8EDF4] rounded-lg">
      <div className="w-36 text-left">{leftLabel}</div>
      <div className="flex flex-grow justify-around">
        {options.map((value) => (
          <label
            key={value}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => setSelectedValue(value)}
          >
            <input
              type="radio"
              name={name}
              value={value}
              checked={selectedValue === value}
              onChange={() => setSelectedValue(value)}
              className="h-6 w-6 mb-2"
            />
            <span>{value}</span>
          </label>
        ))}
      </div>
      <div className="w-36 text-right">{rightLabel}</div>
    </div>
  );
}
