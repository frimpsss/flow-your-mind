"use client";
import { baseURL } from "@/utils";
import { ClipboardDocumentIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
const ShareLink = () => { 
  const [cookies] = useCookies(["user"]);
  const [username, setUserName] = useState("")
  const [bURL, setBUrl] = useState("")
  useEffect(()=>{
    setUserName(cookies?.user?.username)
    setBUrl(baseURL)
  }, [])
  return (
    <>
      <div
        className="p-4 border-[1px] rounded-lg border-dashed"
        onClick={() => {
          const linkToCopy = `${baseURL}/${cookies?.user?.username}`;
          navigator.clipboard.writeText(linkToCopy).then(() => {
            toast.success("Link copied to clipboard");
          });
        }}
        suppressHydrationWarning
      >
        <p className="font-light mb-4 text-[1.1rem]">
          Tap here to copy the link
        </p>
        <span className="flex p-2 items-center justify-between border-[0.75px] rounded-lg text-ellipsis cursor-pointer border-primary">
          <p className="text-primary/80 hover:text-primary duration-700 font-[0.9rem]">
           {bURL}/{username}
          </p>
          <ClipboardDocumentIcon height={20} className="text-primary" />
        </span>
      </div>
    </>
  );
};

export default ShareLink;
