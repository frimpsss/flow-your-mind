import { MainAppHeader, MainAppFooter } from "@/components/app";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Flow your mind",
  description: "Flow mind",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MainAppHeader />
      {children}
      <MainAppFooter />
    </>
  );
}
