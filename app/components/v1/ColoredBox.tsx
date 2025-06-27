import { ReactNode } from 'react';

export default function ColoredBox({ children }: {children: ReactNode}) {
  return (
    <div className="w-full bg-[#E8EDF4] flex flex-col justify-start gap-6 py-10 px-12 rounded-lg">
      {children}
    </div>
  );
}
