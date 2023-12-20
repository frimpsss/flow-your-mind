import React from "react";
import MessageBox from "./MessageBox";

const AllMessages = () => {
  const sampleData = [
    {
      isOpened: true,
      messageId: "message_1",
    },
    {
      isOpened: false,
      messageId: "message_2",
    },
    {
      isOpened: true,
      messageId: "message_3",
    },
    {
      isOpened: false,
      messageId: "message_4",
    },
    {
      isOpened: true,
      messageId: "message_5",
    },
    {
      isOpened: false,
      messageId: "message_6",
    },
    {
      isOpened: true,
      messageId: "message_7",
    },
    {
      isOpened: false,
      messageId: "message_8",
    },
    {
      isOpened: true,
      messageId: "message_9",
    },
    {
      isOpened: false,
      messageId: "message_10",
    },
    {
      isOpened: true,
      messageId: "message_11",
    },
    {
      isOpened: false,
      messageId: "message_12",
    },
    {
      isOpened: true,
      messageId: "message_13",
    },
    {
      isOpened: false,
      messageId: "message_14",
    },
    {
      isOpened: true,
      messageId: "message_15",
    },
    {
      isOpened: false,
      messageId: "message_16",
    },
    {
      isOpened: true,
      messageId: "message_17",
    },
    {
      isOpened: false,
      messageId: "message_18",
    },
    {
      isOpened: true,
      messageId: "message_19",
    },
    {
      isOpened: false,
      messageId: "message_20",
    },
    {
      isOpened: false,
      messageId: "message_16",
    },
    {
      isOpened: true,
      messageId: "message_17",
    },
    {
      isOpened: false,
      messageId: "message_18",
    },
    {
      isOpened: true,
      messageId: "message_19",
    },
    {
      isOpened: false,
      messageId: "message_20",
    },
  ];

  return (
    <>
      <div className="relative w-full">
        <h4 className="font-semibold text-[1.5rem]">Messages(4)</h4>
        <div
          className="h-[60svh] fixed overflow-y-scroll gap-2   grid grid-cols-3  pt-4 pb-[20vh] scroll-smooth"
          style={{
            width: "calc(100vw - 2rem)",
          }}
        >
          {sampleData.map((e, i) => (
            <MessageBox {...e} key={i}/>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllMessages;
