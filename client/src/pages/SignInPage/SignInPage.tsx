import { SignInForm } from "@/features/auth/ui/SignInForm";
import React from "react";

type SignInPageProps = {};

export const SignInPage: React.FC<SignInPageProps> = ({}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh"
      }}
    >
      <SignInForm />
    </div>
  );
};

export default SignInPage;
