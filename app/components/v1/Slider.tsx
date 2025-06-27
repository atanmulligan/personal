import { useState } from "react";

export default function Slider({
  name,
  label,
  min = 0,
  max = 100,
  valueLoaded = "50",
  onChange = (n, v) => { }
}: {
  name: string;
  label: string;
  min?: number;
  max?: number;
  valueLoaded?: string;
  onChange?: (name: string, value: string) => void;

}) {
  const [value, setValue] = useState(valueLoaded); // Initialize to the midpoint for default value

  const handleChange = (name: string, value: string) => {
    const newValue = value
    setValue(newValue);
    onChange(name, newValue);
  }

  return (
    <div className="flex w-full max-w-2xl py-3 px-12 justify-center items-center bg-[#E8EDF4] rounded-lg m-auto">
      <label className="w-36 text-left">{label}</label>
      <div className="w-full">
        <div className="flex justify-between text-xs text-gray-500">
          <span>{min}%</span>
          <span>{max}%</span>
        </div>
        <input
          type="range"
          id={name}
          name={name}
          min={min}
          max={max}
          step={10}
          value={value}
          onChange={(e) => handleChange(name, e.target.value)}
          className="w-full"
        />
      </div>
      <div className="w-24 font-bold text-xs text-right">
        {value}%
      </div>
    </div>
  );
}
