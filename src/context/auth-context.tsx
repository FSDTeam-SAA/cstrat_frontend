"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  _id: string
  name: string
  email: string
  phone?: string
  role: string
  image?: string
  address?: string
  gender?: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (token: string, userData?: Partial<User>) => Promise<void>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
  refetchUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  updateUser: () => {},
  refetchUser: async () => {},
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

  const fetchFullUserData = useCallback(async (userId: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()

      if (data.status && data.user) {
        setUser(data.user)
        localStorage.setItem("auth_user", JSON.stringify(data.user))
      }
    } catch (err) {
      console.error("Failed to fetch full user data", err)
    }
  }, [token])

  const refetchUser = async () => {
    if (user?._id) {
      await fetchFullUserData(user._id)
    }
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token")
    const storedUser = localStorage.getItem("auth_user")

    const init = async () => {
      if (storedToken) {
        setToken(storedToken)
        setIsAuthenticated(true)

        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser)
            setUser(parsedUser)

            if (parsedUser._id) {
              await fetchFullUserData(parsedUser._id)
            }
          } catch (error) {
            console.error("Failed to parse user data", error)
          }
        }
      }

      setLoading(false)
    }

    init()
  }, [fetchFullUserData])

  const login = async (newToken: string, userData?: Partial<User>) => {
    setToken(newToken)
    setIsAuthenticated(true)
    localStorage.setItem("auth_token", newToken)

    try {
      const tokenParts = newToken.split(".")
      if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1]))
        const extractedUser: Partial<User> = {
          id: payload.id || "",
          _id: payload._id || payload.id || "",
          name: payload.name || "User",
          email: payload.email || "",
          role: payload.role || "",
          ...userData,
        }

        setUser(extractedUser as User)
        localStorage.setItem("auth_user", JSON.stringify(extractedUser))

        if (extractedUser._id) {
          await fetchFullUserData(extractedUser._id)
        }
      }
    } catch (error) {
      console.error("Failed to parse token", error)

      if (userData) {
        const fallbackUser: Partial<User> = {
          id: userData.id || "",
          _id: userData._id || userData.id || "",
          name: userData.name || "User",
          email: userData.email || "",
          role: userData.role || "",
        }

        setUser(fallbackUser as User)
        localStorage.setItem("auth_user", JSON.stringify(fallbackUser))

        if (fallbackUser._id) {
          await fetchFullUserData(fallbackUser._id)
        }
      }
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    setIsAuthenticated(false)
    localStorage.removeItem("auth_token")
    localStorage.removeItem("auth_user")
    router.push("/")
  }

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
        refetchUser,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  )
}
