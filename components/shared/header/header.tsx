"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useLayoutEffect } from "react";

import useAuth from "../../../helpers/hook/useAuth";
import Loader from "@/components/svg/loader";

const Header = () => {
    const { auth, setAuthenticated,setAuth } = useAuth()
    const path = usePathname();
    const router = useRouter();
    const [loading, setLoading] = React.useState(false)
    const [outSuccess, setOutSuccess] = React.useState(false)

    const handleLogout = async () => {
        try {
            setLoading(true)
            const response = await fetch("/api/v1/auth/logout")

            setLoading(false)
            const data = await response.json();

            if (data.success) {
                setOutSuccess(true)
                setAuthenticated("unauthenticated")
                setAuth(null as any)
            }
        } catch (error) {

        }
    }

    useLayoutEffect(() => {
        if (outSuccess) {
            router.refresh()
            setAuthenticated("unauthenticated")
            setTimeout(() => {
                router.push("/auth/login");
            }, 1500);
        }
    }, [outSuccess, router, setAuthenticated])

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
