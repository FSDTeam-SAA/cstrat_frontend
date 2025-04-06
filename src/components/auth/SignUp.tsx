"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useMutation } from "@tanstack/react-query"
import { z } from "zod"
import Image from "next/image"
import { Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"

// Form validation schema
const signupSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    role: z.literal("customer"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

type SignupFormData = z.infer<typeof signupSchema>

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter()
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "customer",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [termsAccepted, setTermsAccepted] = useState(false)

  const signupMutation = useMutation({
    mutationFn: async (data: SignupFormData) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Registration failed")
      }

      return response.json()
    },
    onSuccess: () => {
        toast.success("Registration completed successfully!")
      router.push("/login")
    },
    onError: (error: Error) => {
      setErrors({ api: error.message })
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Validate form data
      signupSchema.parse(formData)

      // Clear previous errors
      setErrors({})

      // Submit form if terms are accepted
      if (!termsAccepted) {
        setErrors({ terms: "You must accept the Terms & Conditions" })
        return
      }

      // Submit form
      signupMutation.mutate(formData)
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Convert Zod errors to a more usable format
        const fieldErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path) {
            fieldErrors[err.path[0]] = err.message
          }
        })
        setErrors(fieldErrors)
      }
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left side - Image */}
      <div className="hidden md:block md:w-1/2 bg-stone-100">
        <Image height={200} width={1100} src="/images/signup.png" alt="Fashion model" className="  min-w-[405px] min-h-[1000px] " />
      </div>

      {/* Right side - Form */}
      <div className="w-full md:w-1/2 p-8 flex items-center justify-center">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Create New Account</h1>
            <p className="text-gray-500 mt-2">Please enter details</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.api && <div className="p-3 bg-red-100 text-red-700 rounded-md">{errors.api}</div>}

            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md ${errors.name ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md ${errors.email ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter your Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md ${errors.phone ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>

            <div>
      <label htmlFor="password" className="block text-sm font-medium mb-1">
        Password
      </label>
      <div className="relative">
        <input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          className={`w-full p-3 border rounded-md ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-black"
        >
          {showPassword ? <Eye  size={20} /> : <EyeOff size={20} />}
        </button>
      </div>
      {errors.password && (
        <p className="mt-1 text-sm text-red-600">{errors.password}</p>
      )}
    </div>

    <div>
      <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
        Confirm Password
      </label>
      <div className="relative">
        <input
          id="confirmPassword"
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Enter Confirm password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={`w-full p-3 border rounded-md ${
            errors.confirmPassword ? "border-red-500" : "border-gray-300"
          }`}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-black"
        >
          {showConfirmPassword ? <Eye  size={20} /> : <EyeOff size={20} />}
        </button>
      </div>
      {errors.confirmPassword && (
        <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
      )}
    </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={() => setTermsAccepted(!termsAccepted)}
                  className="w-4 h-4 border border-gray-300 rounded"
                />
                
              </div>
              <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                I agree to the Terms & Conditions
              </label>
            </div>
            {errors.terms && <p className="mt-1 text-sm text-red-600">{errors.terms}</p>}

            <button
              type="submit"
              disabled={signupMutation.isPending}
              className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors"
            >
              {signupMutation.isPending ? "Signing up..." : "Signup"}
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-black font-medium hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

