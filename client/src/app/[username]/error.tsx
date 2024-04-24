"use client";
import Header from "@/components/app/Header";
import { useEffect } from "react";
import Image from "next/image";
import img from "../../assets/images/404.svg";
import Link from "next/link";
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center gap-2 mt-[5rem]">
        <Image src={img} width={200} alt={"404"} />
        <h2 className="text-[1.2rem]">Something went wrong! 😑</h2>
        <h2 className="text-primary">link is broken or doesnt exist</h2>
        <Link href={"/"}>
          <button
            className="bg-primary/5 hover:bg-primary/10 duration-500 rounded p-2 mt-6"
          >
            Return Home
          </button>
        </Link>
      </div>
    </div>
  );
}
