"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "@/components/ui/use-toast"

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Liste des routes protégées qui nécessitent une authentification
    const protectedRoutes = [
      "/appointments",
      "/appointments/new",
      "/communaute/messages",
      "/communaute/groupes",
      "/profile",
      "/medical-record",
      "/donate",
    ]

    // Vérifier si la route actuelle est protégée
    const isProtectedRoute = protectedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))

    if (!isLoading && !isAuthenticated && isProtectedRoute) {
      toast({
        title: "Authentification requise",
        description: "Veuillez vous connecter pour accéder à cette page",
        variant: "destructive",
      })

      // Rediriger vers la page de connexion avec le retour prévu
      router.push(`/login?returnUrl=${encodeURIComponent(pathname)}`)
    }
  }, [isAuthenticated, isLoading, pathname, router])

  // Si en cours de chargement, afficher un indicateur de chargement
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Chargement...</div>
  }

  // Si l'utilisateur est authentifié ou si la route n'est pas protégée, afficher le contenu
  return <>{children}</>
}
