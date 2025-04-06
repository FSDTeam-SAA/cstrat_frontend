"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import Image from "next/image"
import Link from "next/link"

export default function VerifyOtp() {
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""
  const router = useRouter()

  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

//   useEffect(() => {
//     if (!email) {
//       router.push("/forgot-password")
//     }
//   }, [email, router])

  const verifyOtpMutation = useMutation({
    mutationFn: async (otpValue: string) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp: otpValue }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Invalid OTP")
      }

      return response.json()
    },
    onSuccess: () => {
      toast.success("OTP verified successfully")
      router.replace(`/reset-password?email=${encodeURIComponent(email)}`)
    },
    onError: (error) => {
      toast.error(error.message || "Failed to verify OTP")
    },
  })

  const handleChange = (index: number, value: string) => {
    // Allow only numbers
    if (value && !/^\d+$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Move to previous input on backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const otpValue = otp.join("")
    if (otpValue.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP")
      return
    }
    verifyOtpMutation.mutate(otpValue)
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left side - Image */}
          <div className="hidden md:block md:w-1/2 bg-stone-100">
            <Image height={200} width={1100} src="/images/otp.png" alt="Fashion model" className="  min-w-[405px] min-h-[1000px] " />
          </div>
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md px-8">
          <h1 className="text-3xl font-bold mb-2">Enter OTP</h1>
          <p className="text-gray-500 mb-6">
            We have sent a code to your registered email address
            <br />
            <span className="text-gray-400">{email}</span>
          </p>

          <form onSubmit={handleSubmit}>
            <div className="flex gap-2 mb-6 justify-between">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-xl border rounded-md"
                  required
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-md"
              disabled={verifyOtpMutation.isPending}
            >
              {verifyOtpMutation.isPending ? "Verifying..." : "Verify"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
              Didn&apos;t receive code? Resend
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

