'use client';

import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';

// Icons placeholder
const HomeIcon = () => <div>🏠</div>;
const ShoppingCartIcon = () => <div>🛒</div>;
const PackageIcon = () => <div>📦</div>;
const UsersIcon = () => <div>👥</div>;
const LineChartIcon = () => <div>📈</div>;
const Package2Icon = () => <div>📦</div>;

const sidebarVariants = {
  open: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  closed: { x: '-100%', opacity: 0, transition: { duration: 0.5 } },
};

const linkVariants = {
  hover: {
    scale: 1.1,
    transition: { type: 'spring', stiffness: 300 },
  },
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      {/* Sidebar for large screens */}
      <motion.div
        initial="closed"
        animate="open"
        variants={sidebarVariants}
        className="hidden border-r bg-muted/40 lg:block lg:max-w-[250px]"
      >
        <div className="flex flex-col gap-2">
          <div className="flex h-[60px] items-center px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2Icon />
              <span className="">Back to Home</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-4 text-sm font-medium">
              <motion.div whileHover="hover" variants={linkVariants}>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <HomeIcon />
                  Home
                </Link>
              </motion.div>

              <motion.div whileHover="hover" variants={linkVariants}>
                <Link
                  href="/profile/links"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <ShoppingCartIcon />
                  Links
                </Link>
              </motion.div>

              <motion.div whileHover="hover" variants={linkVariants}>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <PackageIcon />
                  Products
                </Link>
              </motion.div>

              <motion.div whileHover="hover" variants={linkVariants}>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <UsersIcon />
                  Customers
                </Link>
              </motion.div>

              <motion.div whileHover="hover" variants={linkVariants}>
                <Link
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <LineChartIcon />
                  Analytics
                </Link>
              </motion.div>
            </nav>
          </div>
        </div>
      </motion.div>

      {/* Mobile Navigation (hidden on large screens) */}
      <motion.div
        initial="closed"
        animate="open"
        variants={sidebarVariants}
        className="block lg:hidden  h-full bg-muted/40"
      >
        <div className="p-4">
          <h2 className="font-bold text-lg">Menu</h2>
          <nav className="flex flex-col gap-4 mt-4">
            <Link href="/">Home</Link>
            <Link href="/profile/links">Links</Link>
            <Link href="#">Products</Link>
            <Link href="#">Customers</Link>
            <Link href="#">Analytics</Link>
          </nav>
        </div>
      </motion.div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 p-6"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Layout;
