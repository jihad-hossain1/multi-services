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
    <nav className="p-4 bg-gray-50 shadow-[0_1px_5px_0_rgba(0,0,0,0.1)] border-b border-gray-300 text-gray-900 flex items-center justify-center gap-5 ">
      <div className="flex items-center gap-4 text-xs md:text-sm lg:text-lg">
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
              <Link href="/profile/links" className="link">
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
