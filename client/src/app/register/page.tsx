"use client"
import { Register } from "@/containers";
import { useRouter } from "next/navigation";
import React from "react";
const page = () => {
  const router = useRouter()
  return (
    <div className="grid grid-cols-1 place-content-center  px-4 relative pt-[5rem] py-2">
      <div className="grid grid-cols-1 gap-3">
        <h4 className="text-[2rem] font-bold mb-5 text-primary">
          Sign up to recieve anonymous messages
        </h4>
        <Register />

        <p className="text-[1.1rem] bg-transparent text-center">
          Already have an account? <button className="text-primary cursor-pointer" onClick={() => {
            router.push('/login')
          }}>log in</button>.
        </p>
      </div>
    </div>
  );
};

export default page;
