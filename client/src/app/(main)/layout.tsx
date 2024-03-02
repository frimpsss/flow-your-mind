"use client";
import { MainAppHeader, MainAppFooter } from "@/components/app";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
// import type { Metadata } from "next";
// export const metadata: Metadata = {
//   title: "Flow your mind",
//   description: "Flow mind",
// };

export default function Layout({ children }: { children: React.ReactNode }) {
  const [cookies] = useCookies(["user"]);
  const nav = useRouter();
  useEffect(() => {
    if (!cookies?.user?.token) {
      return nav.push("/");
    }
  }, []);
  return (
    <>
      <MainAppHeader />
      {children}
      <MainAppFooter />
    </>
  );
}
