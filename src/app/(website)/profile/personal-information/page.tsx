"use client"

import type React from "react"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import ProtectedRoute from "@/components/ProtectedRoute"
import { useAuth } from "@/context/auth-context"

export default function PersonalInformation() {
  const { user, token } = useAuth() // Get the token from auth context
  const queryClient = useQueryClient()

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "",
    gender: user?.gender || "",
    address: user?.address || "",
  })

  const updateProfileMutation = useMutation({
    mutationFn: async (profileData: Omit<typeof formData, "email">) => {
      // Check if token exists
      if (!token) {
        throw new Error("Authentication token is missing")
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the token to the request
        },
        body: JSON.stringify(profileData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to update profile")
      }

      return response.json()
    },
    onSuccess: (data) => {
      // Invalidate and refetch any queries that depend on user data
      queryClient.invalidateQueries({ queryKey: ["user"] })

      toast.success(data.message || "Profile updated successfully")
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update profile")
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleGenderChange = (value: string) => {
    setFormData((prev) => ({ ...prev, gender: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Omit email as it's not needed in the request body
    const {  ...profileData } = formData

    // Execute the mutation
    updateProfileMutation.mutate(profileData)
  }

  return (
    <ProtectedRoute>
      <div className="max-w-full">
        <h1 className="mb-6 text-2xl font-bold">Personal Information</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled
                className="bg-gray-100"
              />
              <p className="text-xs text-gray-500">Email cannot be changed</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={formData.gender} onValueChange={handleGenderChange}>
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              placeholder="Address Here..."
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-black text-white hover:bg-black/90"
              disabled={updateProfileMutation.isPending}
            >
              {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </ProtectedRoute>
  )
}
