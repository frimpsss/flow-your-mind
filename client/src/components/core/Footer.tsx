import React from "react";

const Footer = () => {
  return (
    <div className="absolute mt-4 bottom-0 left-0 right-0 py-3 w-full text-center">
      <p>
        Made with ❤️ by{" "}
        <a
          href="https://github.com/frimpsss"
          className="text-primary underline font-bold"
        >
          frimps
        </a>{" "}
        from 🇬🇭
      </p>
    </div>
  );
};

export default Footer;
