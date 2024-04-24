import Footer from "@/components/core/Footer";
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
  } catch (error: unknown) {
    throw  Error("Link is broken");
  }
}
const Page = async ({ params }: { params: { username: string } }) => {
  const response = await getUserId(params.username);
  return (
    <>
      <Header />
      <div className="p-4">
        <MessageInputBox userId={response} />
        <Footer />
      </div>
    </>
  );
};

export default Page;
