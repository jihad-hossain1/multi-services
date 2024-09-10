"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

import useAuth from "../../../helpers/hook/useAuth";
import Logout from "./logout";
import { navLinks } from "@/constant";

const Header = () => {
  const { auth } = useAuth();
  const path = usePathname();
  const paths = ["/service/code-share"];

  const hiddenPath = paths.some((item) => path.startsWith(item));
  return (
    <nav className="p-4 bg-violet-700 text-white flex items-center justify-between ">
      <div className="flex items-center gap-4">
        {navLinks?.map((item) => (
          <Link href={item?.href} key={item?.name} className="link">
            {item?.name}
          </Link>
        ))}
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
