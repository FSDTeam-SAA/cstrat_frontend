// components/ProtectedRoute.tsx
"use client"

import { useAuth } from "@/context/auth-context"
// import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  // Optionally, show a loading spinner or blank while redirecting
  if (!isAuthenticated) return null

  return <>{children}</>
}

export default ProtectedRoute
