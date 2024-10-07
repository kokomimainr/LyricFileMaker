import { SignUpForm } from "@/features/auth/ui/SignUpForm";
import React from "react";

type SignUpPageProps = {};

export const SignUpPage: React.FC<SignUpPageProps> = ({}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
      }}
    >
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
