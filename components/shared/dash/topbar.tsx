'use client';

import Link from "next/link";
import React from "react";


const Topbar = ({isOpen, setIsOpen}: {isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {
   

    return <div className='p-3 border-b md:p-5'>
      <div className='flex justify-between'>
        <div>
          <Link href="/" className="flex items-center gap-2">
          Multi Service 
          </Link>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
            
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>
    </div>;
  };

  export default Topbar