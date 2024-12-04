import React from "react";
import { SignUp } from "@clerk/nextjs";
export default function SignUpPage() {
  return (
    <main className="pt-[2rem] flex h-screen w-full items-center justify-center">
      <SignUp />
    </main>
  );
}
