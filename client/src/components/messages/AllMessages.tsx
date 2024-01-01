"use client";
import React, { useEffect, useState } from "react";
import MessageBox from "./MessageBox";
import { _ } from "@/utils";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

const AllMessages = () => {
  const [messages, setMessages] = useState([]);
  async function getAllMessages() {
    try {
      const response = await _.get("/messages");

      if (response?.data?.status) {
        setMessages(response?.data?.data);
      } else {
        toast.error("error 1", response?.data?.message);
      }
    } catch (error: any) {
      if (error instanceof AxiosError) {
        toast.error("Axios ", error?.response?.data?.message);
      } else {
        toast.error(("error 2" + error?.message) as string);
      }
    }
  }
  useEffect(() => {
    getAllMessages();
  }, []);
  return (
    <>
      <div className="relative w-full">
        <h4 className="font-semibold text-[1.5rem]">Messages(4)</h4>
        <div
          className="gap-2   grid grid-cols-3  pt-4 pb-[20vh] scroll-smooth"
          style={{
            width: "calc(100vw - 2rem)",
          }}
        >
          {messages?.map(
            (
              e: {
                isOpened: boolean;
                id: string;
              },
              i
            ) => {
              return (
              // console.log(e);
               <MessageBox {...e} key={i} />
            )}
          )}
        </div>
      </div>
    </>
  );
};

export default AllMessages;
