"use client";

import React, { useEffect } from "react";
import useAuth from "../hook/useAuth";
import { useRouter } from "next/navigation";
import Loader from "@/components/svg/loader";

interface IProps {
  children: React.ReactNode;
}

const Authorized: React.FC<IProps> = ({ children }) => {
  const { auth, loading } = useAuth();
  const router = useRouter();

 
  useEffect(() => {
    if (!auth) {
      router.push("/auth/login");
    }
  }, [auth, router]);

  if (loading) {
    return <div className="flex flex-col justify-center items-center h-screen">
    <Loader width={50} height={50} className="animate-spin" />
  </div>
  }
  
  return <div>{children}</div>;
  
};

export default Authorized;