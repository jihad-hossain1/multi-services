'use client';

import Link from "next/link";
import React from "react";

const DashNavbar = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen:  React.Dispatch<React.SetStateAction<boolean>> }) => {
    
    const menuRef = React.useRef<HTMLDivElement | null>(null);

    
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setIsOpen]);


    return (
        <div>
            <div
                ref={menuRef}
                className={`${isOpen ? "transform translate-x-0" : "transform translate-x-full"
                    } fixed top-0 right-0 w-8/12 h-full bg-violet-50 shadow-lg transition-transform duration-300 ease-in-out md:hidden z-50`}
            >
                <div
                    className="block lg:hidden  h-full bg-muted/40"
                >
                    <div className="p-4">
                        <h2 className="font-bold text-lg">Menu</h2>
                        <nav className="flex flex-col gap-4 mt-4">
                            <Link href="/dashboard">Dashboard</Link>
                            <Link href="/dashboard/profile/links">Links</Link>
                            <Link href="/dashboard/expense">Expense</Link>
                            <Link href="#">Customers</Link>
                            <Link href="#">Analytics</Link>
                        </nav>
                    </div>
                </div>

                
            </div>
        </div>
    )
}


export default DashNavbar