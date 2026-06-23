import { SignIn } from "@hexclave/next";
import Link from "next/link";
import React from "react";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <SignIn />
        <Link href="/">Go Back Home</Link>
      </div>
    </div>
  );
}