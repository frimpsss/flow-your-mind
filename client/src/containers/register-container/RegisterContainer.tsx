"use client";
import React from "react";
import { RegisterComponent } from "@/components";
import toast from "react-hot-toast";
import { _ } from "@/utils";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
const RegisterContainer = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);
  async function registerUser(values: any) {
    try {
      setLoading(true);
      const response = await _.post("/register", {
        username: values!!!!?.username,
        password: values!!!!!!!?.password,
      });

      if (response?.data?.status) {
        // //og(response?.data);
        router.push("/login");
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error: unknown) {
      toast.error("An error occured, Give it another shot");
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <RegisterComponent onSubmit={registerUser} loading={loading} />
    </>
  );
};

export default RegisterContainer;
