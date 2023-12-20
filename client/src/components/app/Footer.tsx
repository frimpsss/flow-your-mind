import React from "react";
import { EnvelopeIcon, UserIcon } from "@heroicons/react/20/solid";
const Footer = () => {
  return (
    <div className="pt-4 pb-6 flex items-center justify-around text-white fixed bottom-0 left-0 right-0 bg-primary">
      <div className="flex items-center justify-center flex-col">
        <EnvelopeIcon height={25} />
        <p>Messages</p>
      </div>

      <div className="flex items-center justify-center flex-col">
        <UserIcon height={25} />
        <p>Account</p>
      </div>
    </div>
  );
};

export default Footer;
