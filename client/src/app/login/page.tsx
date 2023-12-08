"use client";
import { LogIn } from "@/containers";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
  return (
    <div className="grid grid-cols-12 place-content-center  px-4 relative pt-[5rem]  md:pt-[7rem]">
      <span className="hidden md:block md:col-span-3 lg:col-span-4"></span>
      <div className="grid grid-cols-1 gap-3 col-span-12 md:col-span-6 place-self-center lg:col-span-4">
        <h4 className="text-[2rem] md:text-[2.5rem] lg:text-[2.2rem] font-bold mb-5 text-primary">
          Log in to view and share anonymous messages
        </h4>
        <LogIn />
        <p className="text-[1.1rem] bg-transparent text-center">
          Are you a new user{" "}
          <button
            className="text-primary cursor-pointer"
            onClick={() => {
              router.push("/register");
            }}
          >
            create an account
          </button>
          .
        </p>
      </div>
    </div>
  );
};

export default page;
