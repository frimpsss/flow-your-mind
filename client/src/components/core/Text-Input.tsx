"use client";
import React, { useState } from "react";
import {
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/20/solid";
import { PasswordStrenghtIndicator } from ".";
interface TextInputProps {
  values: any;
  errors: any;
  id: string;
  handleChange: any;
  handleBlur: any;
  type: "text" | "password";
  placeholder: string;
  label: string;
  touched: any;
  strongPassword?: boolean;
}
const TextInput = ({
  values,
  errors,
  id,
  handleBlur,
  handleChange,
  type,
  placeholder,
  label,
  touched,
  strongPassword = false,
}: TextInputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [visible, setVisibile] = useState(false);
  return (
    <div>
      <label htmlFor={id} className="text-primary/90">
        {label}
      </label>
      <div className="relative mt-1">
        <input
          name={id}
          id={id}
          type={type !== "password" ? type : showPassword ? "text" : type}
          value={values[id]}
          onChange={(e) => {
            setVisibile(true);
            touched[id] = true;
            handleChange(e);
          }}
          onBlur={handleBlur}
          placeholder={placeholder}
          onFocus={() => {
            setVisibile(true);
          }}
          className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
        />
        {errors[id] && touched[id] && type !== "password" ? (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        ) : null}

        {type == "password" && (
          <div
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            {!showPassword ? (
              <EyeIcon className="h-5 w-5 text-primary" aria-hidden="true" />
            ) : (
              <EyeSlashIcon
                className="h-5 w-5 text-primary"
                aria-hidden="true"
              />
            )}
          </div>
        )}
      </div>

      {errors[id] && touched[id] ? (
        <p className="mt-2 text-sm text-red-600" id={`${id}-error`}>
          {errors[id]}
        </p>
      ) : null}

      {type === "password" && visible && strongPassword && (
        <PasswordStrenghtIndicator
          password={values[id]}
          touched={touched[id]}
          visible={visible}
        />
      )}
    </div>
  );
};

export default TextInput;
