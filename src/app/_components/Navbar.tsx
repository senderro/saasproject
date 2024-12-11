"use client";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-4 md:py-6 px-4 md:px-6 space-y-4 md:space-y-0">
        {/* Logo */}
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
            XRPlataform
          </Link>
        </h1>

        {/* Links */}
        <div className="flex items-center flex-wrap justify-center space-x-4 md:space-x-6">
          <Link 
            href="#features" 
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
          >
            Features
          </Link>
          <Link 
            href="#pricing" 
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
          >
            Pricing
          </Link>
          <Link 
            href="#contact" 
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
          >
            Contact
          </Link>

          {/* Login/Logout */}
          {isClient && (
            <>
              <SignedOut>
                <Link
                  href="/sign-in"
                  className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-4 py-2 rounded transition-colors duration-200"
                >
                  Log In
                </Link>
              </SignedOut>
              <SignedIn>
                <UserButton />
                <Link 
                  href="/node" 
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                >
                  Nodes
                </Link>
              </SignedIn>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}