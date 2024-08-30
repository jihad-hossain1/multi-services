"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import useAuth  from "../../../helpers/hook/useAuth";
import Loader from "@/components/svg/loader";

const Header = () => {
    const auth: any  = useAuth()
    const path = usePathname();
    const [loading, setLoading] = React.useState(false)

    const handleLogout = async () => {
        try {
            setLoading(true)
            const response = await fetch("/api/v1/auth/logout")

            setLoading(false)
            const data = await response.json();

            if (data.success) {
                window.location.reload();
            }
        } catch (error) {
            
        }
    }

    const paths = ["/service/code-share"];

    const hiddenPath = paths.some((item) => path.startsWith(item));
    return (
        <nav className='p-4 bg-violet-700 text-white flex items-center justify-between '>
            <div className='flex items-center gap-4'>
                <Link href='/' className='link'>
                    Home
                </Link>
                <Link href='/service/code-share' className='link'>
                    Code Share
                </Link>
                <Link href='/service/yt-downloader' className='link'>
                    YT Downloader
                </Link>
                <Link href='/service' className='link'>
                    All Services
                </Link>
            </div>

            {hiddenPath && (
                <div>
                    {auth?.auth?.userId ? (
                        <div className="flex items-center gap-2">
                        <Link href='/profile' className='link'>
                            Profile
                        </Link>
                        <hr className="border-2 h-5 border-gray-400 " />
                        <button onClick={handleLogout} className='link' disabled={loading}>
                            {loading ? <Loader className="w-5 h-5 animate-spin" /> : "Logout"}
                        </button>
                        </div>
                    ) : (
                        <Link href='/auth/login' className='link'>
                            Login
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Header;
