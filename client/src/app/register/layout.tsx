import { Footer } from "@/components/core";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Register - Flow mind",
  description: "Register to recieve anonymous messages",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      className="relative h-screen"
      style={{
        backgroundColor: "#ffffff",
        backgroundImage: "radial-gradient(#1b1871 0.6px, #ffffff 0.6px)",
        backgroundSize: "20px 20px"
      }}
    >
      {children}
      <Footer/>
    </section>
  );
}
