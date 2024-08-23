"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Header = () => {
    const auth = true;
    const path = usePathname();

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
                    {auth ? (
                        <Link href='/auth/logout' className='link'>
                            Logout
                        </Link>
                    ) : (
                        <Link href='/login' className='link'>
                            Login
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Header;
