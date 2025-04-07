'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import ShopMenuContent from '../shop/shop-menu';
import Logo from '../../../public/images/drip-logo.png';
import Hideon from '@/provider/Hideon';
import {  User } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
export default function Navbar() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isAuthenticated, user, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);
  const router = useRouter()
  return (

    
    <Hideon
    routes={[
      "/sign-up",
      "/login",
      "/reset-password",
      "/verify-otp",
      "/reset-password",
      "/forgot-password",
    ]}
    >


 
    <header className="sticky top-0 z-50 w-full bg-black text-white">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src={Logo} alt="Drip Swag" width={120} height={40} className="h-10 w-auto" />
        </Link>

        <nav className="hidden flex-1 items-center justify-center md:flex">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-gray-300">
              Home
            </Link>
            <Link href="/about" className="text-sm font-medium transition-colors hover:text-gray-300">
              About
            </Link>

            <DropdownMenu open={isShopMenuOpen} onOpenChange={setIsShopMenuOpen}>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex items-center text-sm font-medium transition-colors hover:text-gray-300"
                  onMouseEnter={() => setIsShopMenuOpen(true)}
                >
                  Shop
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="mt-0 w-screen rounded-none border-0 bg-white p-0 text-black shadow-lg"
                onMouseLeave={() => setIsShopMenuOpen(false)}
                onInteractOutside={() => setIsShopMenuOpen(false)}
                forceMount
              >
                <ShopMenuContent />
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/contact" className="text-sm font-medium transition-colors hover:text-gray-300">
              Contact
            </Link>
          </div>
        </nav>

        <div className="flex items-center gap-4">
       
        <div className="flex items-center gap-4">
            {/* User account and auth buttons */}
            {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-5">
              <Link href="/cart">
                <Image src="/images/cart-img.png" width={30} height={30} alt="cart image" />
              </Link>

              <Link href="/wishlist">
                <Image src="/images/wishlist.png" width={30} height={30} alt="wishlist" />
              </Link>
            </div>
              <DropdownMenu  >
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="md:flex items-center gap-2 text-white hidden ">
                    <User className="h-4 w-4" />
                    <span className="hidden md:inline">{user?.name || "Account"}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 ">
                  <div className="px-2 py-1.5 text-sm font-medium">{user?.email}</div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">My Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-500 focus:text-red-500" onClick={logout}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            
               
              </>
            ) : (
              <Button
                variant="outline"
                onClick={() => router.push("/login")}
                className="rounded-md bg-white text-black hover:bg-gray-100"
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

              <SheetContent side="right" className="w-[300px] bg-black text-white sm:w-[400px]">
                <nav className="mt-8 flex flex-col gap-4">
                  <Link href="/" className="py-2 text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                    Home
                  </Link>
                  <Link href="/about" className="py-2 text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                    About
                  </Link>
                  <Link href="/shop" className="py-2 text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                    Shop
                  </Link>
                  <Link href="/contact" className="py-2 text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                    Contact
                  </Link>

                  <div className="my-4 border-t border-gray-700"></div>

                  {isAuthenticated ? (
                    <>
                      <div className="py-2 text-lg font-medium">Hello, {user?.name || "User"}</div>
                      <Link
                        href="/profile"
                        className="py-2 text-lg font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        My Profile
                      </Link>
                      <Link
                        href="/orders"
                        className="py-2 text-lg font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        My Orders
                      </Link>
                      <button
                        className="py-2 text-left text-lg font-medium text-red-400"
                        onClick={() => {
                          setIsMobileMenuOpen(false)
                          logout()
                        }}
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Button
                      onClick={() => {
                        setIsMobileMenuOpen(false)
                        router.push("/login")
                      }}
                      className="mt-4 bg-white text-black hover:bg-gray-100"
                    >
                      Log in
                    </Button>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

    

          {/* Mobile menu button
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            
            <SheetContent side="right" className="w-[300px] bg-black text-white sm:w-[400px]">
              <nav className="mt-8 flex flex-col gap-4">
                <Link href="/" className="py-2 text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  Home
                </Link>
                <Link href="/about" className="py-2 text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  About
                </Link>
                <Link href="/shop" className="py-2 text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  Shop
                </Link>
                <Link href="/contact" className="py-2 text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  Contact
                </Link>

                <div className="my-4 border-t border-gray-700"></div>

                
              </nav>
            </SheetContent>
          </Sheet> */}
        </div>
      </div>

    </header>

    </Hideon>
  );
}

