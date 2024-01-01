"use client";
import { Register } from "@/containers";
import { useRouter } from "next/navigation";
import React from "react";
const Page = () => {
  const router = useRouter();
  return (
    <div className="grid grid-cols-12 place-content-center  px-4 relative pt-[5rem]  md:pt-[7rem]">
      <span className="hidden md:block md:col-span-3 lg:col-span-4"></span>
      <div className="grid grid-cols-1 gap-3 col-span-12 md:col-span-6 place-self-center lg:col-span-4">
        <h4 className="text-[2rem] md:text-[2.5rem] lg:text-[2.2rem] font-bold mb-5 text-primary">
          Sign up to recieve anonymous messages
        </h4>
        <Register />

        <p className="text-[1.1rem] bg-transparent text-center">
          Already have an account?{" "}
          <button
            className="text-primary cursor-pointer"
            onClick={() => {
              router.push("/login");
            }}
          >
            log in
          </button>
          .
        </p>
      </div>
    </div>
  );
};

export default Page;
