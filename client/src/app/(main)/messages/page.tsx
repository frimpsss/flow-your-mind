"use client";
import { AllMessages, ShareLink } from "@/components";

function Page() {
  return (
    <div className="p-4">
      <ShareLink />
      <div className="h-6"></div>
      <AllMessages />
    </div>
  );
}

export default Page;
