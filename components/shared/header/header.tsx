"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import useAuth from "../../../helpers/hook/useAuth";
import Logout from "./logout";
import { navLinks } from "@/constant";
import { authConfig } from "@/config/auth.config";

const Header = () => {
    const { auth } = useAuth();
    const path = usePathname();
    const paths = ["/xdashboard",'/dashboard','/auth/login', '/auth/register'];
    const openRef = React.useRef<HTMLDivElement>(null);

    const hiddenPath = paths.some((item) => path.startsWith(item));

    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if (openRef.current) {
            // click outside to close
            const handleClickOutside = (event: MouseEvent) => {
                if (
                    openRef.current &&
                    !openRef.current.contains(event.target as Node)
                ) {
                    setOpen(false);
                }
            };

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, [open]);

    return (
        <nav className={hiddenPath ? "hidden" : 'p-4 bg-gray-50 shadow-[0_1px_5px_0_rgba(0,0,0,0.1)] border-b border-gray-300 text-gray-900 flex items-center justify-center gap-5 '}>
            <div className='flex items-center gap-4 text-xs md:text-sm lg:text-lg'>
                {navLinks?.map((item) => (
                    <Link href={item?.href} key={item?.name} className='link'>
                        {item?.name}
                    </Link>
                ))}
            </div>

            <div className='flex flex-col gap-2 relative'>
                <div
                    onClick={() => setOpen(!open)}
                    className='link cursor-pointer'
                >
                    Account
                </div>
                {open && (
                    <div
                        ref={openRef}
                        className={
                            "absolute z-20 top-10 right-0 flex flex-col gap-2 bg-gray-50 shadow-[0_1px_5px_0_rgba(0,0,0,0.1)] border border-gray-300 text-gray-900 max-w-[200px] px-4 py-2 rounded"
                        }
                    >
                        {auth ? (
                            <div className='flex flex-col gap-2 text-nowrap items-start'>
                                {auth?.role == authConfig.userRole.admin && (
                                    <Link href='/xdashboard' className='link'>
                                        Admin Dashboard
                                    </Link>
                                )}
                                <Link href='/dashboard' className='link'>
                                    Dashboard
                                </Link>
                               
                                {/* <hr className="border-2 h-5 border-gray-400 " /> */}
                                <Logout />
                            </div>
                        ) : (
                            <div className='flex flex-col gap-2'>
                                <Link href='/auth/register' className='link'>
                                    Signup
                                </Link>
                                <Link href='/auth/login' className='link'>
                                    Login
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Header;
