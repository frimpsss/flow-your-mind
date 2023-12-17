"use client";
import React from "react";
import { RegisterComponent } from "@/components";
import toast from "react-hot-toast";
import { _ } from "@/utils";
import { AxiosError } from "axios";
const RegisterContainer = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  async function registerUser(values: any) {
    try {
      setLoading(true);
      const response = await _.post("/register", {
        username: values!!!!?.username,
        password: values!!!!!!!?.password,
      });

      if (response?.data) {
        console.log(response?.data);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.message);
      } else {
        toast.error("An error occured, Give it another shot");
      }
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
