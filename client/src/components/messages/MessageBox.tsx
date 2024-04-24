"use client";
import { useRouter } from "next/navigation";
import { EnvelopeOpenIcon, EnvelopeIcon } from "@heroicons/react/20/solid";
interface MessageBoxProps {
  isOpened: boolean;
  id: string;
}

function MessageBox({ isOpened, id }: MessageBoxProps) {
  const router = useRouter();
  return (
    <>
      <div
        className="cursor-pointer flex items-center justify-center  py-6 border-primary bg-primary/5 hover:bg-primary/10 duration-0 rounded-lg"
        onClick={() => router.push(`/messages/${id}`)}
      >
        {!isOpened ? (
          <p className="relative">
            <EnvelopeIcon className="text-primary" height={30} />
            <span className="bg-red-500 text-white grid place-items-center h-4 w-4 rounded-[10000px] text-[0.5rem] absolute top-[-30%] right-[-40%]">
              1
            </span>
          </p>
        ) : (
          <EnvelopeOpenIcon className="text-primary" height={30} />
        )}
      </div>
    </>
  );
}

export default MessageBox;
