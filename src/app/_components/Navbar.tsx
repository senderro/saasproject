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
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center py-6 px-6">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-gray-900">
          <Link href="/">XRPlataform</Link>
        </h1>

        {/* Links */}
        <div className="flex items-center space-x-6">
          <Link href="#features" className="text-gray-600 hover:text-gray-900">
            Features
          </Link>
          <Link href="#pricing" className="text-gray-600 hover:text-gray-900">
            Pricing
          </Link>
          <Link href="#contact" className="text-gray-600 hover:text-gray-900">
            Contact
          </Link>

          {/* Login/Logout */}
          {isClient && (
            <>
              <SignedOut>
                <Link
                  href="/sign-in"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
                >
                  Log In
                </Link>
              </SignedOut>
              <SignedIn>
                <UserButton />
                <Link href="/node" className="text-gray-600 hover:text-gray-900">
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
