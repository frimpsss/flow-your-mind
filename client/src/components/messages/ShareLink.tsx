"use client";
import { useRouter } from "next/navigation";
import { ClipboardDocumentIcon } from "@heroicons/react/20/solid";
import toast from "react-hot-toast";
const ShareLink = () => {
  const _ = useRouter();

  return (
    <>
      <div
        className="p-4 border-[1px] rounded-lg border-dashed"
        onClick={() => {
          if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(
              `${window?.location?.origin}/@djangz`
            );
          }
          toast.success("Link copied to clipboard");
        }}
      >
        <p className="font-light mb-4 text-[1.1rem]">
          Tap here to copy the link
        </p>
        <span className="flex p-2 items-center justify-between border-[0.75px] rounded-lg text-ellipsis cursor-pointer border-primary">
          <p className="text-primary/80 hover:text-primary duration-700 font-[0.9rem]">
            {typeof window !== 'undefined' && `${window?.location?.origin}/@djangz`}
          </p>
          <ClipboardDocumentIcon height={20} className="text-primary" />
        </span>
      </div>
    </>
  );
};

export default ShareLink;
