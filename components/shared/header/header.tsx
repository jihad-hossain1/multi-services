import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <nav className="p-4 flex items-center gap-4">
      <Link href="/">Home</Link>
      <Link href="/service">Service</Link>
      <Link href="/service/yt-downloader">YT Downloader</Link>
    </nav>
  );
};

export default Header;
