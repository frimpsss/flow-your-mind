"use client";
import Image from "next/image";
import { Footer } from "@/components";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import mkup from "../assets/images/mockup.jpeg";
import { _ } from "@/utils";
export default function Home() {
  const router = useRouter();
  const [values, setValues] = useState<number[]>([0, -100]);

  async function ping() {
    await _.get("/");
  }
  useEffect(() => {
    const i = setInterval(() => {
      setValues((v) => {
        return [v[1], v[0]];
      });
    }, 4500);
    ping();
    return () => clearInterval(i);
  }, []);
  return (
    <>
      <div className="text-primary relative">
        <div className="flex py-5 justify-between items-center lg:border-b-[1px] px-6 border-primary border-dotted">
          <h4 className="font-bold text-[1.5rem] lg:text-[2.2rem]">
            Flow your mind
          </h4>
          <button
            className="bg-primary hover:bg-primary/90 text-white  py-2 px-2 lg:px-8 rounded-md"
            onClick={() => {
              router.push("/register");
            }}
          >
            Get Started
          </button>
        </div>

        <div className="">
          <div className="grid grid-rows-3 gap-y-0 px-6 cursor-pointer py-[7rem]  lg:py-[3rem]">
            <div
              className="flex flex-col py-4 h-full  relative overflow-clip"
              style={{
                transition: "all 4.5s",
              }}
            >
              <h4
                className="font-bold lg:text-[7rem] text-[3rem] hover:skew-y-2 duration-700 absolute"
                style={{
                  top: `${values[0]}%`,
                }}
              >
                Send
              </h4>
              <h4
                className="font-bold lg:text-[7rem] text-[3rem] hover:skew-y-2 duration-700 absolute"
                style={{
                  top: `${values[1]}%`,
                }}
              >
                Receive
              </h4>
            </div>
            <div className="flex lg:justify-center py-4 hover:skew-y-3 duration-700">
              {" "}
              <h4 className="font-bold lg:text-[7rem] text-[3rem]">
                Anounymous
              </h4>
            </div>
            <div className="flex lg:justify-end py-4">
              <h4 className="font-bold lg:text-[7rem] text-[3rem] hover:skew-y-2 duration-700">
                Messages
              </h4>
            </div>
          </div>
        </div>

        {/* <div className="flex">
      <Image src={mkup} alt="mock up" className="w-[]"/>
      <div>
        FAQ
      </div>
      </div> */}
      </div>
      <Footer />
    </>
  );
}
