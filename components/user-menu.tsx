"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  User,
  Search,
  Stethoscope,
  Users,
  Settings,
  LogOut,
  Calendar,
  FileText,
  BarChart3,
  MapPin,
  Heart,
  Video,
  Bell,
  Shield,
  Palette,
  MessageCircle,
  Activity,
  X,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

export function UserMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Menu Principal</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Connecté en tant que <span className="font-medium">{user?.name}</span>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Search */}
          <Card
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => {
              router.push("/recherche")
              onClose()
            }}
          >
            <CardContent className="p-4 flex items-center gap-3">
              <Search className="w-5 h-5 text-blue-600" />
              <div>
                <h3 className="font-medium">Recherche</h3>
                <p className="text-sm text-gray-500">Trouver structures et services</p>
              </div>
            </CardContent>
          </Card>

          {/* Espace Personnel */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <User className="w-5 h-5 text-green-600" />
                Espace Personnel
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/profile" onClick={onClose} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                <User className="w-4 h-4" />
                <span className="text-sm">Profil Santé</span>
              </Link>
              <Link
                href="/dashboard"
                onClick={onClose}
                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded"
              >
                <BarChart3 className="w-4 h-4" />
                <span className="text-sm">Tableau de Bord</span>
              </Link>
              <Link
                href="/medical-record"
                onClick={onClose}
                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded"
              >
                <FileText className="w-4 h-4" />
                <span className="text-sm">Dossier Médical Numérique</span>
              </Link>
            </CardContent>
          </Card>

          {/* Services Médicaux */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <Stethoscope className="w-5 h-5 text-blue-600" />
                Services Médicaux
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link
                href="/appointments"
                onClick={onClose}
                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded"
              >
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Rendez-vous & Téléconsultation</span>
              </Link>
              <Link
                href="/recherche"
                onClick={onClose}
                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded"
              >
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Structures de Santé à Proximité</span>
              </Link>
              <Link href="/services" onClick={onClose} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                <Activity className="w-4 h-4" />
                <span className="text-sm">Services de Santé Interactifs</span>
              </Link>
            </CardContent>
          </Card>

          {/* Engagement et Communauté */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <Users className="w-5 h-5 text-purple-600" />
                Engagement et Communauté
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/donate" onClick={onClose} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                <Heart className="w-4 h-4" />
                <span className="text-sm">Mes Dons de Santé</span>
              </Link>
              <Link href="/videos" onClick={onClose} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                <Video className="w-4 h-4" />
                <span className="text-sm">Vidéos et Conseils Médicaux</span>
              </Link>
              <Link
                href="/communaute"
                onClick={onClose}
                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">Groupes et Communautés</span>
              </Link>
            </CardContent>
          </Card>

          {/* Fonctions Utiles */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <Settings className="w-5 h-5 text-gray-600" />
                Fonctions Utiles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link
                href="/notifications"
                onClick={onClose}
                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded"
              >
                <Bell className="w-4 h-4" />
                <span className="text-sm">Notifications</span>
              </Link>
              <Link href="/settings" onClick={onClose} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                <Palette className="w-4 h-4" />
                <span className="text-sm">Personnalisation</span>
              </Link>
              <Link href="/privacy" onClick={onClose} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                <Shield className="w-4 h-4" />
                <span className="text-sm">Sécurité et Confidentialité</span>
              </Link>
            </CardContent>
          </Card>

          {/* Logout */}
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleLogout}>
            <CardContent className="p-4 flex items-center gap-3">
              <LogOut className="w-5 h-5 text-red-600" />
              <div>
                <h3 className="font-medium text-red-600">Déconnexion</h3>
                <p className="text-sm text-gray-500">Retour à la page d'accueil</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
