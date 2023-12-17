"usse client";
import React from "react";
import { useFormik } from "formik";
import { loginSchema } from "./schema";
import { TextInput } from "@/components";

const LogIn = ({
  onSubmit,
  loading,
}: {
  onSubmit: (_: any) => void;
  loading: boolean;
}) => {
  const { handleSubmit,resetForm, ...rest } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <TextInput
        id="username"
        placeholder="djanz"
        label="Username"
        type={"text"}
        {...rest}
      />
      <TextInput
        id="password"
        placeholder="password"
        label="Password"
        type={"password"}
        {...rest}
      />
      <input
        type="submit"
        value={loading ? "loading..." : "log in"}
        className="border-2 py-3 bg-primary/90 text-white rounded-md font-bold mt-3 hover:bg-primary duration-500 cursor-pointer"
      />
    </form>
  );
};

export default LogIn;
