"use client"

import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Bell, CreditCard, History, LogOut, Settings, User } from "lucide-react"
import { useAuth } from "@/context/auth-context"

interface ProfileSidebarProps {
  activeItem: string
}

export default function ProfileSidebar({ activeItem }: ProfileSidebarProps) {
  const { logout } = useAuth()

  const menuItems = [
    { id: "personal", label: "Personal Information", icon: <User className="h-5 w-5 mr-2" />, href: "/profile" },
    {
      id: "notifications",
      label: "Notifications",
      icon: <Bell className="h-5 w-5 mr-2" />,
      href: "/profile/notifications",
    },
    { id: "settings", label: "Settings", icon: <Settings className="h-5 w-5 mr-2" />, href: "/profile/settings" },
    { id: "orders", label: "Order History", icon: <History className="h-5 w-5 mr-2" />, href: "/profile/orders" },
    {
      id: "payment",
      label: "Payment Methods",
      icon: <CreditCard className="h-5 w-5 mr-2" />,
      href: "/profile/payment",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center text-center">
        <div className="relative h-24 w-24 rounded-full overflow-hidden mb-2">
          <Image src="/placeholder.svg?height=96&width=96" alt="Profile" fill className="object-cover" />
        </div>
        <h2 className="font-bold text-lg">Darrell Steward</h2>
        <p className="text-sm text-gray-500">darrellsteward@gmail.com</p>
      </div>

      <div className="space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={cn(
              "flex items-center px-3 py-2 rounded-md text-sm",
              activeItem === item.id ? "bg-black text-white" : "hover:bg-gray-100",
            )}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
        <button
          onClick={logout}
          className="flex items-center px-3 py-2 rounded-md text-sm text-red-500 hover:bg-red-50 w-full text-left"
        >
          <LogOut className="h-5 w-5 mr-2" />
          Log out
        </button>
      </div>
    </div>
  )
}

