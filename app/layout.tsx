import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "./components/v1/Header";

// const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "AITwinBot",
  description: "AITwinBot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <div className="flex flex-col items-center min-w-[500px]">
          <Header />
          <div className="w-full max-w-7xl py-14 px-8 md:py-14 md:px-24 lg:py-14 lg:px-44 flex justify-center">
            {children}
          </div>

        </div>

      </body>
    </html>
  );
}
