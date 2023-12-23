"use client";
import { useRouter } from "next/navigation";
import { EnvelopeOpenIcon, EnvelopeIcon } from "@heroicons/react/20/solid";
interface MessageBoxProps {
  isOpened: boolean;
  messageId: string;
}

function MessageBox({ isOpened, messageId }: MessageBoxProps) {
  const router = useRouter();
  return (
    <>
      <div
        className="cursor-pointer flex items-center justify-center border-[1px] py-6 border-dotted rounded-lg"
        onClick={() => router.push(`/messages/${messageId}`)}
      >
        {!isOpened ? (
          <EnvelopeIcon className="text-primary" height={30} />
        ) : (
          <EnvelopeOpenIcon className="text-primary" height={30} />
        )}
      </div>
    </>
  );
}

export default MessageBox;