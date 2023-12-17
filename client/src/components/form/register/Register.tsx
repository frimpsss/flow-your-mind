"use client";
import React from "react";
import { useFormik } from "formik";
import { RegisterSchema } from "./schema";
import { TextInput } from "@/components";
const Register = ({
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
      confirmPassword: "",
    },
    validationSchema: RegisterSchema,
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
        strongPassword
        {...rest}
      />
      <TextInput
        id="confirmPassword"
        placeholder="Confirm password"
        label="Confirm Password"
        type={"password"}
        {...rest}
      />
      <input
        value={loading ? "loading..." : "register"}
        type="submit"
        className="border-2 py-3 bg-primary/90 text-white rounded-md font-bold mt-3 hover:bg-primary duration-500 cursor-pointer"
      />
    </form>
  );
};

export default Register;
