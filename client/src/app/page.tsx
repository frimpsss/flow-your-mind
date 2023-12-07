"use client";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  return (
    <div
      className="min-h-[100vh] grid place-items-center  p-6 text-white"
      style={{
        backgroundImage:
          "linear-gradient( 111.4deg,  rgba(7,7,9,1) 6.5%, rgba(27,24,113,1) 63.2% )",
      }}
    >
      <div className="grid place-items-center">
        <div className="grid grid-cols-1 gap-4">
          <h2 className="text-[2.2rem] font-bold leading-[3rem] ">
            Flow your mind anonymously online
          </h2>
          <button
            className="bg-white text-[rgba(27,24,113,1)] p-2 rounded-md"
            onClick={() => {
              router.push("/register");
            }}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
