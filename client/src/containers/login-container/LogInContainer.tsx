import { LogInComponent } from "@/components";
import { _ } from "@/utils";
import { AxiosError } from "axios";
import React from "react";
import toast from "react-hot-toast";

const LogInContainer = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  async function loginUser(data: any) {
    try {
      setLoading(true);
      const response = await _.post("/login", {
        username: data?.username,
        password: data?.password,
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

  return <LogInComponent onSubmit={loginUser} loading={loading} />;
};

export default LogInContainer;
