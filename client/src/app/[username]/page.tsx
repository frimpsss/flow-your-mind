"use server";
import Header from "@/components/app/Header";
import MessageInputBox from "@/components/messages/MessageInputBox";
import { _ } from "@/utils";
import React from "react";
const Page = async ({ params }: { params: { username: string } }) => {
  try {
    const response = await _.get(`/username/${params.username}`);
    if (response?.data?.status) {
      return (
        <>
          <Header />
          <div className="p-4">
            <MessageInputBox userId={response?.data?.data} />
          </div>
        </>
      );
    }
    return <div>Hi {params.username}</div>;
  } catch (error: any) {
    return <p>{error?.message}</p>;
  }
};

export default Page;
