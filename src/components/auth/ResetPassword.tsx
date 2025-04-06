"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import Image from "next/image"
import { Eye, EyeOff } from "lucide-react"

export default function ResetPassword() {
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""
  const router = useRouter()

  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // useEffect(() => {
  //   if (!email) {
  //     router.push("/forgot-password")
  //   }
  // }, [email, router])

  const resetPasswordMutation = useMutation({
    mutationFn: async (password: string) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword: password }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to reset password")
      }

      return response.json()
    },
    onSuccess: () => {
      toast.success("Password reset successfully")
      router.push("/login")
    },
    onError: (error) => {
      toast.error(error.message || "Failed to reset password")
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long")
      return
    }

    resetPasswordMutation.mutate(newPassword)
  }

  return (
    <div className="flex h-screen overflow-hidden">
     {/* Left side - Image */}
              <div className="hidden md:block md:w-1/2 bg-stone-100">
                <Image height={200} width={1100} src="/images/otp.png" alt="Fashion model" className="  min-w-[405px] min-h-[1000px] " />
              </div>
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md px-8">
          <h1 className="text-3xl font-bold mb-6">Reset Password</h1>

          <form onSubmit={handleSubmit}>
          <div className="mb-4">
        <label htmlFor="newPassword" className="block text-sm font-medium mb-1">
          New Password
        </label>
        <div className="relative">
          <input
            id="newPassword"
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter your new password"
            className="w-full p-2 border rounded-md pr-16"
            required
          />
          <button
            type="button"
            onClick={() => setShowNewPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-black"
          >
            {showNewPassword ? <Eye  size={20} /> : <EyeOff size={20} />}
          </button>
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
          Confirm New Password
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your new password"
            className="w-full p-2 border rounded-md pr-16"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-black"
          >
            {showConfirmPassword ? <Eye  size={20} /> : <EyeOff size={20} />}
          </button>
        </div>
      </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-md"
              disabled={resetPasswordMutation.isPending}
            >
              {resetPasswordMutation.isPending ? "Resetting..." : "Continue"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

