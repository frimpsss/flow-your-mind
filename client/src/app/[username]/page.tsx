"use server";
import Header from "@/components/app/Header";
import MessageInputBox from "@/components/messages/MessageInputBox";
import { _ } from "@/utils";
import React from "react";

async function getUserId(username: string) {
  try {
    const response = await _.get(`/username/${username}`);
    if (response?.data?.status) {
      return response?.data?.data;
    }
    throw Error(response?.data?.message);
  } catch (error: unknown) {
    throw error;
  }
}
const Page = async ({ params }: { params: { username: string } }) => {
  const response = await getUserId(params.username);
  return (
    <>
      <Header />
      <div className="p-4">
        <MessageInputBox userId={response} />
      </div>
    </>
  );
};

export default Page;
