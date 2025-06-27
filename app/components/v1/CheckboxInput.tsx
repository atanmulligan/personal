import { set } from "mongoose";
import { use, useEffect, useState } from "react";

export default function CheckboxInput({
  question,
  name,
  options,
  unchecked = false,
  onChange = (n, v) => { },
  valueLoaded = [],
  disability = false
}: {
  question: string;
  name: string;
  options: string[],
  unchecked?: boolean,
  onChange?: (name: string, value: string[]) => void,
  valueLoaded?: string[],
  disability?: boolean
}) {
  const [selectedValues, setSelectedValues] = useState<string[]>(valueLoaded);
  const [disabilityState, setDisabilityState] = useState<string>("");

  useEffect(() => {
    setSelectedValues(valueLoaded);
    if (disability) {
      let newDisabilityState = "";
      if (valueLoaded.length > 0) {
        if (valueLoaded.includes("I do not have a disability or impairment")) {
          newDisabilityState = 'NON-DISABILITY'
        } else {
          newDisabilityState = 'DISABILITY'
        }
      }
      setDisabilityState(newDisabilityState);
    }

  }, [valueLoaded]);

  const handleCheckboxChange = (option: string) => {
    if (checkDisabled(option)) return;
    let newSelectedValues;
    if (selectedValues.includes(option)) {
      newSelectedValues = selectedValues.filter((value) => value !== option)
    } else {
      newSelectedValues = [...selectedValues, option]
    }
    setSelectedValues(newSelectedValues);
    if (disability) {
      let newDisabilityState = "";
      if (newSelectedValues.length > 0) {
        if (newSelectedValues.includes("I do not have a disability or impairment")) {
          newDisabilityState = 'NON-DISABILITY'
        } else {
          newDisabilityState = 'DISABILITY'
        }
      }
      setDisabilityState(newDisabilityState);
    }
    //console.log(newSelectedValues)
    onChange(name, newSelectedValues);
  };

  const checkDisabled = (option: string) => {
    if (disability) {
      if (disabilityState === 'NON-DISABILITY') {
        if (option === 'I do not have a disability or impairment') {
          return false;
        } else {
          return true;
        }

      } else if (disabilityState === 'DISABILITY') {
        if (option === 'I do not have a disability or impairment') {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  return (
    <div>
      <div className="mb-4">
        <p>{question} </p>
      </div>
      {options.map((option, index) => (
        <div key={option} className="flex mx-2 ">
          <input
            type="checkbox"
            name={name}
            value={option}
            checked={selectedValues.includes(option)}
            onChange={() => handleCheckboxChange(option)}
            className="h-6 w-6 mb-2 mr-2 rounded text-blue-600"
            disabled={checkDisabled(option)}
          />
          <label
            className="flex cursor-pointer"
            onClick={() => handleCheckboxChange(option)}
          >
            {option}
          </label>
        </div>
      ))}
      {unchecked && (<div className="text-red-400">Please select at least one of these options.</div>)}

    </div>
  );
}