"use client";
import Message from "@/components/messages/Message";
import { _ } from "@/utils";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = ({ params }: { params: { id: string } }) => {
  const [message, setMessage] = useState<any>();
  async function getMessage() {
    try {
      const res = await _.get(`/message/${params.id}`);
      if (res?.data?.status) {
        setMessage(res?.data?.data);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  }

  useEffect(() => {
    getMessage();
  }, []);
  return (
    message && <Message message={message?.message} time={message?.timeStamp} />
  );
};

export default Page;
