"use client";
import { passwordTest } from "@/utils";
import { XMarkIcon, CheckIcon, MinusIcon } from "@heroicons/react/20/solid";
import React from "react";

const PasswordIndicator = ({
  password,
  touched,
  visible,
}: {
  password: string;
  touched: boolean;
  visible: boolean;
}) => {
  const pwdStrenght = passwordTest(password);
  const tests = [
    {
      title: "Minimum of 8 characters",
      passed: pwdStrenght.lengthRequirement,
    },
    {
      title: "Contains a special character",
      passed: pwdStrenght.specialCharacter,
    },
    {
      title: "Contains uppercase",
      passed: pwdStrenght.uppercase,
    },
    {
      title: "Contains lowercase",
      passed: pwdStrenght.lowerCase,
    },
    {
      title: "Contains digits",
      passed: pwdStrenght.digit,
    },
  ];
  return (
    <div className="mt-2">
      {tests.map((e, index) => {
        return (
          <div className={`${visible ? "block" : "none"}`} key={index}>
            <PasswordStrenghtTile
              text={e.title}
              passed={e.passed}
              touched={touched}
            />
          </div>
        );
      })}
    </div>
  );
};

export default PasswordIndicator;

function PasswordStrenghtTile({
  text,
  passed,
  touched,
}: {
  text: string;
  passed: boolean;
  touched: boolean;
}) {
  return (
    <span className="flex relative gap-2  items-center">
      <span>
        {!touched ? (
          <MinusIcon height={18} color="#8492a6" />
        ) : passed ? (
          <CheckIcon color="rgb(19 206 102)" height={18} />
        ) : (
          <XMarkIcon color="red" height={18} />
        )}
      </span>
      <p
        className={`
        ${!touched ? "text-gray" : passed ? "text-green" : "text-red-600"}
        font-[200]
        text-[0.9rem]
      `}
      >
        {text}
      </p>
    </span>
  );
}
// tiles may be implemented later
{
  /* {type === "password" && (
        <div className="grid grid-cols-5 w-full gap-2 pt-1 px-[1px]">
          {[1, 1, 1, 1, 1].map((e) => {
            return <span className="h-1 bg-gray rounded-lg"></span>;
          })}
        </div>
      )} */
}
