"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  name: string
  email: string
  role: string
  image?: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (token: string, userData?: Partial<User>) => void
  logout: () => void
  updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
})

export const useAuth = () => useContext(AuthContext)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Load auth state from localStorage on initial render
  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token")
    const storedUser = localStorage.getItem("auth_user")

    if (storedToken) {
      setToken(storedToken)
      setIsAuthenticated(true)

      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser))
        } catch (error) {
          console.error("Failed to parse user data", error)
        }
      }
    }

    setLoading(false)
  }, [])

  // Function to login user
  const login = (newToken: string, userData?: Partial<User>) => {
    setToken(newToken)
    setIsAuthenticated(true)
    localStorage.setItem("auth_token", newToken)

    // Extract user info from JWT if available
    try {
     
      const tokenParts = newToken.split(".")
      if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1]))
        const extractedUser = {
          id: payload.id || "",
          name: payload.name || "User",
          email: payload.email || "",
          role: payload.role || "",
          ...userData,
        }

        setUser(extractedUser as User)
        localStorage.setItem("auth_user", JSON.stringify(extractedUser))
      }
    } catch (error) {
      console.error("Failed to parse token", error)

      // If token parsing fails but we have userData, use that
      if (userData) {
       
        const newUser = {
          id: userData.id || "",
          name: userData.name || "User",
          email: userData.email || "",
          role: userData.role || "",

        }
        setUser(newUser as User)
        localStorage.setItem("auth_user", JSON.stringify(newUser))
      }
    }
  }

  // Function to logout user
  const logout = () => {
    setUser(null)
    setToken(null)
    setIsAuthenticated(false)
    localStorage.removeItem("auth_token")
    localStorage.removeItem("auth_user")
    router.push("/")
  }

  // Function to update user data
  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem("auth_user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        login,
        logout,
        updateUser,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  )
}

