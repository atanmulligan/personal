"use client";

import { useEffect, useState } from "react";

export default function LikertDefault({
  name,
  question,
  leftLabel,
  middleLabel,
  rightLabel,
  numOptions = 7,
  onChange = (n, v) => { },
  valueLoaded = null
}: {
  name: string;
  question: string;
  leftLabel: string;
  middleLabel: string;
  rightLabel: string;
  numOptions?: number;
  onChange?: (name: string, value: number) => void;
  valueLoaded?: number | null;
}) {
  const [selectedValue, setSelectedValue] = useState<number | null>(valueLoaded);
  const options = Array.from({ length: numOptions }, (_, i) => i + 1);
  const handleChange = (name: string, value: number) => {
    setSelectedValue(value);
    onChange(name, value);
  }
  useEffect(() => {
    setSelectedValue(valueLoaded);
  }
    , [valueLoaded]);

  return (
    <div className="flex flex-col w-full py-5 px-12 justify-center items-center bg-[#E8EDF4] rounded-lg">
      <div className="w-full text-left mb-2">{question}</div>
      <div className="w-full flex justify-between mb-2 text-gray-500">
        <span className="w-32 text-center text-sm">{leftLabel}</span>
        {middleLabel && (
          <span className="w-44 text-center mx-auto text-sm">
            {middleLabel}
          </span>
        )}
        <span className="w-32 text-center text-sm">{rightLabel}</span>
      </div>
      <div className="w-full px-10 flex justify-between">
        {options.map((value, index) => (
          <label
            key={value}
            className="flex flex-col items-center cursor-pointer mx-2"
            onClick={() => handleChange(name, value)}
          >
            <input
              type="radio"
              name={name}
              value={value}
              checked={selectedValue == value}
              onChange={() => handleChange(name, value)}
              className="h-6 w-6 mb-2"
              required={true}
            />
            <span>{value}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
