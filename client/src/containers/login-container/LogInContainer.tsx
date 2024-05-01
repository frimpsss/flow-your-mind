"use client";
import { LogInComponent } from "@/components";
import { _ } from "@/utils";
import { AxiosError } from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
const LogInContainer = () => {
  const [c, setCookies] = useCookies(["user"]);
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);
  // useEffect(() => {
  //   if (c?.user?.token) {
  //     router.push("/messages");
  //   }
  // }, []);
  async function loginUser(data: any) {
    try {
      setLoading(true);
      const response = await _.post("/login", {
        username: data?.username,
        password: data?.password,
      });
      if (response?.data?.status) {
        setCookies("user", {
          username: response?.data?.username,
          token: response?.data?.access_token,
        });

        router.push("/messages");
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        //og(error);
        toast.error(error.response?.data?.message);
      } else {
        toast.error("An error occured, Give it another shot");
      }
    } finally {
      setLoading(false);
    }
  }

  return <LogInComponent onSubmit={loginUser} loading={loading} />;
};

export default LogInContainer;
