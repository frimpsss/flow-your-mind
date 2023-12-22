"use client";
import { ActionButtons, ShareLink, Stats } from "@/components";
import React from "react";
import { Suspense } from "react";
const Page = () => {
  return (
    <Suspense
      fallback={
        <>
          <p>Loading</p>
        </>
      }
    >
      <div className="p-4">
        <h4 className="font-semibold text-[2rem] text-primary mb-4">Account</h4>
        <ShareLink />
        <div className="h-4"></div>
        <Stats />
        <div className="h-4"></div>
        <ActionButtons />
      </div>
    </Suspense>
  );
};

export default Page;
