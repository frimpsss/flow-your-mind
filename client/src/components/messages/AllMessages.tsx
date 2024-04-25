"use client";
import React, { useEffect, useState } from "react";
import MessageBox from "./MessageBox";
import { _ } from "@/utils";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import ShareLink from "./ShareLink";

const AllMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  async function getAllMessages() {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getAllMessages();
  }, []);
  return (
    <>
      <div className="relative w-full">
        <h4 className="font-semibold text-[1.5rem]">
          Messages({messages?.length})
        </h4>
        <div
          className="gap-2   grid grid-cols-3  pt-4 pb-[20vh] scroll-smooth"
          style={{
            width: "calc(100vw - 2rem)",
          }}
        >
          {loading ? (
            [1, 2, 4, 5].map((i, ind) => {
              return <span className="w-full h-[70px] rounded-md animate-pulse bg-primary/10" key={ind}></span>;
            })
          ) : messages?.length == 0 ? (
       <div className="col-span-3 text-center text-primary mt-6">
        <p >No messages yes 😔</p>
        {/* <p>Share your link</p> */}
        {/* <ShareLink /> */}
       </div>
          ) : (
            messages?.map(
              (
                e: {
                  isOpened: boolean;
                  id: string;
                },
                i
              ) => {
                return (
                  <MessageBox {...e} key={i} />
                );
              }
            )
          )}
        </div>
      </div>
    </>
  );
};

export default AllMessages;
