"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
// import { useToast } from "@/hooks/use-toast"
import { toast } from "sonner"
import { useAuth } from "@/context/auth-context"
// import { useAuth } from "@/hooks/use-auth" // Assuming this hook exists

export default function Settings() {
  // const { toast } = useToast()
  const { user } = useAuth() // Get user data from useAuth hook

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  // Set up mutation with Tanstack Query
  const updatePasswordMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await fetch(`http://localhost:8001/api/v1/auth/set-new-password/${user?._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to update password")
      }

      return response.json()
    },
    onSuccess: (data) => {
      // toast({
      //   title: "Success",
      //   description: data.message || "Password updated successfully",
      //   variant: "default",
      // })
      toast.success(data.message || "Password updated successfully")

      // Reset form after successful submission
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    },
    onError: (error: Error) => {
      // toast({
      //   title: "Error",
      //   description: error.message || "Failed to update password",
      //   variant: "destructive",
      // })
      toast.error(error.message || "Failed to update password")
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const togglePasswordVisibility = (key: "current" | "new" | "confirm") => {
    setShowPassword((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.newPassword !== formData.confirmPassword) {
      // toast({
      //   title: "Error",
      //   description: "New passwords do not match",
      //   variant: "destructive",
      // })
      toast.error("New passwords do not match")
      return
    }

    if (!user?._id) {
      // toast({
      //   title: "Error",
      //   description: "User information not available",
      //   variant: "destructive",
      // })

      toast.error("User information not available")
      return
    }

    updatePasswordMutation.mutate(formData)
  }

  return (
    <div className="max-w-full px-4">
      <h1 className="mb-6 text-2xl font-bold">Change password :</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        {/* Current Password */}
        <div className="space-y-2 relative">
          <Label htmlFor="currentPassword">Current Password</Label>
          <Input
            id="currentPassword"
            name="currentPassword"
            type={showPassword.current ? "text" : "password"}
            value={formData.currentPassword}
            onChange={handleChange}
            placeholder="••••••••••••"
            required
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility("current")}
            className="absolute right-3 top-[38px] text-gray-500"
            tabIndex={-1}
          >
            {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* New + Confirm Password */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* New Password */}
          <div className="space-y-2 relative">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type={showPassword.new ? "text" : "password"}
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="••••••••••••"
              required
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("new")}
              className="absolute right-3 top-[38px] text-gray-500"
              tabIndex={-1}
            >
              {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm New Password */}
          <div className="space-y-2 relative">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword.confirm ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••••••"
              required
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("confirm")}
              className="absolute right-3 top-[38px] text-gray-500"
              tabIndex={-1}
            >
              {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-black text-white hover:bg-black/90"
            disabled={updatePasswordMutation.isPending}
          >
            {updatePasswordMutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  )
}
