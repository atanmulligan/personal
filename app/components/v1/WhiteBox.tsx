import { ReactNode } from "react";

export default function WhiteBox({ children }: { children: ReactNode }) {
  return (
    <div className="w-full bg-white border border-solid border-black flex flex-col justify-start gap-6 py-10 px-12 rounded-lg">
      {children}
    </div>
  );
}
