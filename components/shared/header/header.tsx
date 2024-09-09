"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

import useAuth from "../../../helpers/hook/useAuth";
import Logout from "./logout";

const Header = () => {
  const { auth } = useAuth();
  console.log("🚀 ~ Header ~ auth:", auth);
  const path = usePathname();
  const router = useRouter();

  const paths = ["/service/code-share"];

  const hiddenPath = paths.some((item) => path.startsWith(item));
  return (
    <nav className="p-4 bg-violet-700 text-white flex items-center justify-between ">
      <div className="flex items-center gap-4">
        <Link href="/" className="link">
          Home
        </Link>
        <Link href="/service/code-share" className="link">
          Code Share
        </Link>
        <Link href="/service/yt-downloader" className="link">
          YT Downloader
        </Link>
        <Link href="/service" className="link">
          All Services
        </Link>
      </div>

      {hiddenPath && (
        <div>
          {auth ? (
            <div className="flex items-center gap-2">
              {auth?.role == "XADMIN" && (
                <Link href="/xdashboard" className="link">
                  Admin
                </Link>
              )}
              <Link href="/profile" className="link">
                Profile
              </Link>
              <hr className="border-2 h-5 border-gray-400 " />
              <Logout />
            </div>
          ) : (
            <Link href="/auth/login" className="link">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Header;
