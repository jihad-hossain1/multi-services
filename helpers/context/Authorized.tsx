"use client";

import React from "react";
import useAuth from "../hook/useAuth";
import { useRouter } from "next/navigation";

interface IProps {
  children: React.ReactNode;
}

const Authorized: React.FC<IProps> = ({ children }) => {
  const { auth } = useAuth();
  const router = useRouter();

  if (!auth) {
    router.push("/auth/login");
  }
  return <div>{children}</div>;
};

export default Authorized;