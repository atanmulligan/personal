'use client';
import { useEffect, useState } from "react";
import TextInput from "./TextInput";
import { set } from "mongoose";
export default function RadioInput({
  question,
  name,
  options,
  additionalName = "",
  onChange = (n, v) => { },
  valueLoaded = null,
  additionalValue = null
}: {
  question: string;
  name: string;
  options: string[],
  additionalName?: string,
  onChange?: (name: string, value: string) => void,
  valueLoaded?: string | null,
  additionalValue?: string | null
}) {
  const [selectedValue, setSelectedValue] = useState<string | null>(valueLoaded);
  const [textInput, setTextInput] = useState<string | null>(additionalValue);

  useEffect(() => {
    setSelectedValue(valueLoaded);
    setTextInput(additionalValue);
  }, [valueLoaded, additionalValue]);

  const handleChange = (name: string, value: string) => {
    setSelectedValue(value);
    onChange(name, value);
  }

  return (
    <div>
      <div className="mb-4">
        <p>{question} </p>
      </div>
      {options.map((option, index) => (
        <div key={option} className="flex mx-2">
          <input
            type="radio"
            name={name}
            value={option}
            checked={selectedValue === option}
            onChange={() => handleChange(name, option)}
            className="h-6 w-6 mb-2 mr-2 rounded-full"
            required
          />
          <label className="cursor-pointer" onClick={() => { handleChange(name, option) }}>{option}</label>
          {(option.includes("Please specify") && selectedValue === option) && (
            <TextInput name={additionalName} required={true} onChange={onChange} value={textInput} />
          )}
        </div>
      ))}
      {/* {((selectedValue === "An identity not listed: please specify") || (selectedValue === "Additional gender category/identity: please specify")) && (
        <TextInput required={true} />
      )} */}
    </div>
  );
}