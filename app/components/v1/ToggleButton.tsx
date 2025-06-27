"use client";
import { useState } from "react";

export default function ToggleButton({
  content,
  checked = false,
  onClick = () => { }
}: {
  content: string,
  checked?: boolean,
  onClick?: () => void

}) {
  const [isClicked, setIsClicked] = useState(checked);

  const handleToggle = () => {
    setIsClicked(!isClicked)
    onClick()
  }

  return (
    <div
      className={`w-full px-4 py-2 border rounded-lg ${isClicked ? "bg-[#E8EDF4] border-gray-400" : " border-gray-400"
        } hover:border-black transition-all duration-200`}
      onClick={handleToggle}
    >
      {content}
    </div>
  );
}
