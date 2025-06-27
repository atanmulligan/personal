'use client';

import { useEffect, useState } from "react";

export default function TextInput({
  label = "",
  name = "",
  widthClass = "default",
  required = false,
  margin = true,
  value = "",
  onChange = () => { } }: {
    label?: string;
    name?: string,
    widthClass?: string,
    required?: boolean
    margin?: boolean | string,
    value?: string | null,
    onChange?: (key: string, value: string) => void
  }) {
  if (widthClass === "default") {
    widthClass = ""
  }
  margin = margin ? "mx-4" : "";

  const [inputValue, setInputValue] = useState("");
  const handleChange = (name: string, v: string) => {
    setInputValue(v);
    onChange(name, v);
  }

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  return (
    <div>
      {label && <label>{label}</label>}
      {/* <input type="text" name={name} className={`bg-[#E8EDF4] flex-grow mx-4 h-8 border rounded p-1 ${widthClass}`} /> */}
      <input
        type="text"
        name={name}
        className={`bg-[#E8EDF4] flex-grow ${margin} h-8 border rounded p-1 ${widthClass}`}
        value={inputValue}
        onChange={(e) => handleChange(name, e.target.value)}
        required={required}
      />
    </div>
  );
}
