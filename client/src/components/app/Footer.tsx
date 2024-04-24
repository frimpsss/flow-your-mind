"use client";
import { EnvelopeIcon, UserIcon } from "@heroicons/react/20/solid";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { _ } from "@/utils";
import { useEffect, useState } from "react";

const Footer = () => {
  const [unread, setUnread] = useState(0);
  async function getUnreadMeassages() {
    try {
      const response = await _.get("/messages/unread");
      setUnread(response?.data?.data);
    } catch (error: any) {
      if (error instanceof AxiosError) {
        toast.error("Axios ", error?.response?.data?.message);
      } else {
        toast.error(("error 2" + error?.message) as string);
      }
    }
  }

  useEffect(() => {
    getUnreadMeassages();
  }, []);
  const router = useRouter();
  return (
    <div className="py-2 flex items-center justify-around text-white fixed bottom-0 left-0 right-0 bg-primary">
      <div
        className="flex items-center justify-center flex-col cursor-pointer"
        onClick={() => {
          router.push("/messages");
        }}
      >
        <EnvelopeIcon height={25} />
        <p className="relative">
          Messages
          {unread != 0 && (
            <span className="bg-red-500 text-white grid place-items-center h-4 w-4 rounded-[10000px] text-[0.5rem] absolute top-[-30%] right-[-20%]">
              {unread}
            </span>
          )}
        </p>
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
