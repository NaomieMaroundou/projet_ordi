"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
  id: string
  name: string
  email: string
  avatar?: string
  role: "patient" | "doctor" | "psychologist" | "pharmacist" | "other"
  bloodType?: string
  city?: string
  phone?: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  loginWithPhone: (phone: string, code: string) => Promise<void>
  register: (userData: any) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté (localStorage ou cookie)
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simuler une API de connexion
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Utilisateur fictif pour la démonstration
      const mockUser: User = {
        id: "user-123",
        name: "Jean Dupont",
        email: email,
        avatar: "/placeholder.svg?height=40&width=40&text=JD",
        role: "patient",
        bloodType: "O+",
        city: "Libreville",
        phone: "+241 77 12 34 56",
      }

      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
    } catch (error) {
      console.error("Erreur de connexion:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithPhone = async (phone: string, code: string) => {
    setIsLoading(true)
    try {
      // Simuler une API de connexion par téléphone
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Utilisateur fictif pour la démonstration
      const mockUser: User = {
        id: "user-123",
        name: "Jean Dupont",
        email: "jean.dupont@example.com",
        avatar: "/placeholder.svg?height=40&width=40&text=JD",
        role: "patient",
        bloodType: "O+",
        city: "Libreville",
        phone: phone,
      }

      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
    } catch (error) {
      console.error("Erreur de connexion:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: any) => {
    setIsLoading(true)
    try {
      // Simuler une API d'inscription
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Utilisateur fictif pour la démonstration
      const mockUser: User = {
        id: "user-" + Math.random().toString(36).substr(2, 9),
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        avatar: `/placeholder.svg?height=40&width=40&text=${userData.firstName.charAt(0)}${userData.lastName.charAt(0)}`,
        role: "patient",
        city: userData.city || "Libreville",
        phone: userData.phone,
      }

      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
    } catch (error) {
      console.error("Erreur d'inscription:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        loginWithPhone,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider")
  }
  return context
}
