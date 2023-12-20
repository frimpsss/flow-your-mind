"use client";
import { EnvelopeIcon, UserIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
const Footer = () => {
  const router = useRouter();
  return (
    <div className="pt-4 pb-4 flex items-center justify-around text-white fixed bottom-0 left-0 right-0 bg-primary">
      <div
        className="flex items-center justify-center flex-col cursor-pointer"
        onClick={() => {
          router.push("/messages");
        }}
      >
        <EnvelopeIcon height={25} />
        <p>Messages</p>
      </div>

      <div
        className="flex items-center justify-center flex-col cursor-pointer"
        onClick={() => {
          router.push("/account");
        }}
      >
        <UserIcon height={25} />
        <p>Account</p>
      </div>
    </div>
  );
};

export default Footer;
