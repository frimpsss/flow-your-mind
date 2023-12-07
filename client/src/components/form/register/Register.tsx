"use client";

import React from "react";
import { useFormik } from "formik";
import { RegisterSchema } from "./schema";
import { TextInput } from "@/components";
const Register = () => {
  const { handleSubmit, ...rest } = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {},
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
        // strongPassword
        {...rest}
      />
      <input
        type="submit"
        value={"register"}
        className="border-2 py-3 bg-primary text-white rounded-md font-bold mt-3"
      />
    </form>
  );
};

export default Register;
