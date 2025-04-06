"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import Image from "next/image"
import Link from "next/link"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const router = useRouter()

  const forgotPasswordMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to send OTP")
      }

      return response.json()
    },
    onSuccess: () => {
      toast.success("OTP sent to your email")
      router.push(`/verify-otp?email=${encodeURIComponent(email)}`)
    },
    onError: (error) => {
      toast.error(error.message || "Failed to send OTP")
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    forgotPasswordMutation.mutate(email)
  }

  return (
    <div className="flex h-screen  overflow-hidden">
      {/* Left side - Image */}
          <div className="hidden md:block md:w-1/2 bg-stone-100">
                  <Image height={200} width={1100} src="/images/login.png" alt="Fashion model" className="  min-w-[405px] min-h-[90px] h-auto " />
                </div>
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md px-8">
          <h1 className="text-3xl font-bold mb-2">Forgot Password</h1>
          <p className="text-gray-500 mb-6">
            Enter your registered email address, we&apos;ll send you a code to reset your password.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-md mt-4"
              disabled={forgotPasswordMutation.isPending}
            >
              {forgotPasswordMutation.isPending ? "Sending..." : "Send OTP"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link href="/login" className="text-sm text-blue-600 hover:underline">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

