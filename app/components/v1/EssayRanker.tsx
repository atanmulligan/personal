"use client";

import { useEffect, useState } from "react";

export default function EssayRanker({
  numOptions = 3,
  rank1 = null,
  rank2 = null,
  rank3 = null,
  rank4 = null,
  onChange = (n, v) => { }
}: {
  numOptions?: number;
  rank1?: number | null;
  rank2?: number | null;
  rank3?: number | null;
  rank4?: number | null;
  onChange?: (name: string, value: string) => void;
}) {
  const [selectedValues, setSelectedValues] = useState([rank1, rank2, rank3, rank4]);
  const options = Array.from({ length: numOptions }, (_, i) => i + 1);
  console.log(selectedValues)
  const handleChange = (rowIndex: number, value: number) => {
    const newSelectedValues = [...selectedValues];
    newSelectedValues.forEach((val, idx) => {
      if (val === value) {
        newSelectedValues[idx] = null;
      }
    })
    newSelectedValues[rowIndex] = value;
    setSelectedValues(newSelectedValues);
    const rankName = `rank${rowIndex + 1}`;
    onChange(rankName, value.toString());
  };

  function getOrdinal(n: number) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  return (
    <div className="flex flex-col w-full max-w-2xl justify-center items-center gap-2 m-auto">
      <div className="flex justify-around items-center w-full px-12">
        <div className="w-36 text-left"> </div>
        {options.map(i => (
          <div key={i} className="text-center m-auto">Essay {i}</div>
        ))}
      </div>
      {selectedValues.map((selectedValue, rowIndex) => (
        <div key={rowIndex} className="flex w-full py-3 px-12 justify-center items-center bg-[#E8EDF4] rounded-lg">
          <div className="w-36 text-left">{getOrdinal(rowIndex + 1)}</div>
          {options.map((_, colIndex) => (
            <label key={colIndex} className="flex flex-col items-center cursor-pointer m-auto">
              <input
                type="radio"
                name={`rank${rowIndex + 1}`}
                value={colIndex + 1}
                checked={selectedValue == colIndex + 1}
                onChange={() => handleChange(rowIndex, colIndex + 1)}
                // disabled={selectedValues.some((val, idx) => idx !== rowIndex && val === colIndex + 1)}
                className="h-6 w-6 m-2"
                required
              />
            </label>
          ))}
        </div>
      ))}
    </div>
  );
}
