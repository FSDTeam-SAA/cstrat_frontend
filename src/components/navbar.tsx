"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LoginModal from "./login-modal";
import LogoutModal from "./logout-modal";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import ShopMenuContent from "./shop-menu";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);

  return (
    <header className="sticky  top-0 z-50 w-full bg-black text-white">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Drip Swag"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center justify-center flex-1">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-gray-300"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium transition-colors hover:text-gray-300"
            >
              About
            </Link>

            <DropdownMenu
              open={isShopMenuOpen}
              onOpenChange={setIsShopMenuOpen}
            >
              <DropdownMenuTrigger asChild>
                <button
                  className="text-sm font-medium transition-colors hover:text-gray-300 flex items-center"
                  onMouseEnter={() => setIsShopMenuOpen(true)}
                >
                  Shop
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="w-screen bg-white text-black p-0 rounded-none border-0 mt-0 shadow-lg"
                onMouseLeave={() => setIsShopMenuOpen(false)}
                onInteractOutside={() => setIsShopMenuOpen(false)}
                forceMount
              >
                <ShopMenuContent />
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/contact"
              className="text-sm font-medium transition-colors hover:text-gray-300"
            >
              Contact
            </Link>
          </div>
        </nav>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <Button
              variant="outline"
              onClick={() => setShowLogoutModal(true)}
              className="bg-white text-black hover:bg-gray-100"
            >
              Log out
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => setShowLoginModal(true)}
              className="bg-white text-black hover:bg-gray-100 rounded-md"
            >
              Log in
            </Button>
          )}

          {/* Mobile menu button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] bg-black text-white"
            >
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="/"
                  className="text-lg font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="text-lg font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/shop"
                  className="text-lg font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Shop
                </Link>
                <Link
                  href="/contact"
                  className="text-lg font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>

                <div className="border-t border-gray-700 my-4"></div>

                {isAuthenticated ? (
                  <button
                    className="text-lg font-medium py-2 text-left text-red-400"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setShowLogoutModal(true);
                    }}
                  >
                    Logout
                  </button>
                ) : (
                  <Button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setShowLoginModal(true);
                    }}
                    className="bg-white text-black hover:bg-gray-100 mt-4"
                  >
                    Log in
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />

      {/* Logout Confirmation Modal */}
      <LogoutModal
        open={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={logout}
      />
    </header>
  );
}
