"use client"

import type React from "react"

import Link from "next/link"
import {
  Search,
  MapPin,
  Phone,
  ChevronDown,
  User,
  Info,
  Menu,
  Heart,
  LogIn,
  UserPlus,
  Bell,
  LogOut,
  Calendar,
  FileText,
  Settings,
  MessageCircle,
  Stethoscope,
  Home,
  Newspaper,
  Briefcase,
  Target,
  Leaf,
  UserCheck,
  Users,
  Activity,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { user, logout, isAuthenticated } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/recherche?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6 text-sm">
            <Link href="/urgences" className="hover:underline flex items-center transition-colors">
              <Phone className="w-3 h-3 mr-1" />
              Urgences: 1300
            </Link>
            <Link href="/locations" className="hover:underline flex items-center transition-colors">
              <MapPin className="w-3 h-3 mr-1" />9 provinces couvertes
            </Link>
          </div>
          <div className="flex items-center gap-4 text-sm">
            {!isAuthenticated ? (
              <>
                <Link href="/login" className="hover:underline flex items-center transition-colors">
                  <User className="w-3 h-3 mr-1" />
                  Se connecter
                </Link>
                <Link href="/about" className="hover:underline flex items-center transition-colors">
                  <Info className="w-3 h-3 mr-1" />À propos
                </Link>
              </>
            ) : (
              <>
                <Link href="/notifications" className="hover:underline flex items-center transition-colors relative">
                  <Bell className="w-3 h-3 mr-1" />
                  Notifications
                  <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 py-0 min-w-[16px] h-4">
                    3
                  </Badge>
                </Link>
                <Link href="/about" className="hover:underline flex items-center transition-colors">
                  <Info className="w-3 h-3 mr-1" />À propos
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white shadow-lg border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo avec espacement amélioré */}
            <div className="flex items-center gap-4 mr-12">
              <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="relative">
                  <Image
                    src="/placeholder.svg?height=45&width=45&text=SG"
                    alt="SantéGabon Logo"
                    width={45}
                    height={45}
                    className="rounded-full border-2 border-blue-100"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-blue-600">SantéGabon</h1>
                  <p className="text-xs text-gray-500">Votre santé, notre priorité</p>
                </div>
              </Link>
            </div>

            {/* Navigation principale avec espacement amélioré */}
            <nav className="hidden lg:flex items-center gap-6 flex-1">
              <Link href="/" className="font-medium text-blue-600 hover:text-blue-700 transition-colors relative group">
                <div className="flex items-center">
                  <Home className="w-4 h-4 mr-1" />
                  <span>Accueil</span>
                </div>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </Link>

              <Link
                href="/actualites"
                className="font-medium text-gray-700 hover:text-blue-600 transition-colors relative group"
              >
                <div className="flex items-center">
                  <Newspaper className="w-4 h-4 mr-1" />
                  <span>Actualités</span>
                </div>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </Link>

              <div className="relative group">
                <button className="flex items-center font-medium text-gray-700 hover:text-blue-600 transition-colors">
                  <Briefcase className="w-4 h-4 mr-1" />
                  <span>Services</span>
                  <ChevronDown className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-xl rounded-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-2">
                    <Link
                      href="/services/consultation"
                      className="flex items-center p-3 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Stethoscope className="w-5 h-5 text-blue-600 mr-3" />
                      <div>
                        <p className="font-medium">Consultations</p>
                        <p className="text-xs text-gray-500">Médecins généralistes et spécialistes</p>
                      </div>
                    </Link>
                    <Link
                      href="/services/teleconsultation"
                      className="flex items-center p-3 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <MessageCircle className="w-5 h-5 text-green-600 mr-3" />
                      <div>
                        <p className="font-medium">Téléconsultation</p>
                        <p className="text-xs text-gray-500">Consultations à distance 24/7</p>
                      </div>
                    </Link>
                    <Link
                      href="/services/urgences"
                      className="flex items-center p-3 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Phone className="w-5 h-5 text-red-600 mr-3" />
                      <div>
                        <p className="font-medium">Urgences</p>
                        <p className="text-xs text-gray-500">Services d'urgence 24/7</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              <Link
                href="/notre-mission"
                className="font-medium text-gray-700 hover:text-blue-600 transition-colors relative group"
              >
                <div className="flex items-center">
                  <Target className="w-4 h-4 mr-1" />
                  <span>Notre mission</span>
                </div>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </Link>

              <Link
                href="/culture-medecine"
                className="font-medium text-gray-700 hover:text-blue-600 transition-colors relative group"
              >
                <div className="flex items-center">
                  <Leaf className="w-4 h-4 mr-1" />
                  <span>Culture & médecine</span>
                </div>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </Link>

              {/* Menu supplémentaire pour utilisateurs connectés */}
              {isAuthenticated && (
                <>
                  <div className="relative group ml-2">
                    <button className="flex items-center font-medium text-green-600 hover:text-green-700 transition-colors">
                      <UserCheck className="w-4 h-4 mr-1" />
                      <span>Mon espace</span>
                      <ChevronDown className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" />
                    </button>
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white shadow-xl rounded-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="p-2">
                        <Link
                          href="/profile"
                          className="flex items-center p-3 hover:bg-green-50 rounded-lg transition-colors"
                        >
                          <User className="w-5 h-5 text-green-600 mr-3" />
                          Profil santé
                        </Link>
                        <Link
                          href="/dashboard"
                          className="flex items-center p-3 hover:bg-green-50 rounded-lg transition-colors"
                        >
                          <Activity className="w-5 h-5 text-green-600 mr-3" />
                          Tableau de bord
                        </Link>
                        <Link
                          href="/medical-record"
                          className="flex items-center p-3 hover:bg-green-50 rounded-lg transition-colors"
                        >
                          <FileText className="w-5 h-5 text-green-600 mr-3" />
                          Dossier médical
                        </Link>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/communaute"
                    className="font-medium text-purple-600 hover:text-purple-700 transition-colors relative group ml-2"
                  >
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span>Communauté</span>
                    </div>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
                  </Link>

                  <Link
                    href="/appointments/new"
                    className="font-medium text-orange-600 hover:text-orange-700 transition-colors relative group ml-2"
                  >
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>Rendez-vous</span>
                    </div>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all group-hover:w-full"></span>
                  </Link>

                  <Link
                    href="/bien-etre"
                    className="font-medium text-teal-600 hover:text-teal-700 transition-colors relative group ml-2"
                  >
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      <span>Bien-être</span>
                    </div>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 transition-all group-hover:w-full"></span>
                  </Link>
                </>
              )}
            </nav>

            {/* Barre de recherche et actions */}
            <div className="flex items-center gap-3 ml-4">
              {/* Recherche améliorée */}
              <form onSubmit={handleSearch} className="hidden md:flex relative">
                <Input
                  type="search"
                  placeholder="Rechercher médecin, structure, service..."
                  className="pl-10 pr-4 py-2 w-64 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </form>

              {/* Boutons d'action */}
              <Button
                variant="outline"
                size="sm"
                className="bg-red-600 hover:bg-red-700 text-white border-0 shadow-md hover:shadow-lg transition-all"
                asChild
              >
                <Link href="/emergency">
                  <Phone className="w-4 h-4 mr-1" />
                  URGENCE
                </Link>
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white border-0 shadow-md hover:shadow-lg transition-all"
                asChild
              >
                <Link href={isAuthenticated ? "/donate" : "/login"}>
                  <Heart className="w-4 h-4 mr-1" />
                  DON
                </Link>
              </Button>

              {/* Menu utilisateur */}
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="relative hover:bg-gray-100 transition-colors">
                      <Avatar className="w-9 h-9 border-2 border-blue-200">
                        <AvatarImage
                          src={user?.avatar || "/placeholder.svg?text=U"}
                          alt={user?.name || "Utilisateur"}
                        />
                        <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                          {user?.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      {user?.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64 shadow-xl border-0">
                    <div className="px-4 py-3 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
                      <p className="font-semibold text-gray-900">{user?.name}</p>
                      <p className="text-sm text-gray-600">{user?.role}</p>
                      <Badge variant="secondary" className="mt-1 text-xs">
                        {user?.status || "Actif"}
                      </Badge>
                    </div>
                    <div className="py-2">
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="flex items-center cursor-pointer px-4 py-2">
                          <User className="w-4 h-4 mr-3 text-blue-600" />
                          Mon profil
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/appointments" className="flex items-center cursor-pointer px-4 py-2">
                          <Calendar className="w-4 h-4 mr-3 text-green-600" />
                          Mes rendez-vous
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/medical-record" className="flex items-center cursor-pointer px-4 py-2">
                          <FileText className="w-4 h-4 mr-3 text-purple-600" />
                          Dossier médical
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/notifications" className="flex items-center cursor-pointer px-4 py-2">
                          <Bell className="w-4 h-4 mr-3 text-orange-600" />
                          Notifications
                          <Badge className="ml-auto bg-red-500 text-white text-xs">3</Badge>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/settings" className="flex items-center cursor-pointer px-4 py-2">
                          <Settings className="w-4 h-4 mr-3 text-gray-600" />
                          Paramètres
                        </Link>
                      </DropdownMenuItem>
                      <div className="border-t my-2"></div>
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="flex items-center cursor-pointer px-4 py-2 text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Déconnexion
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0 shadow-md hover:shadow-lg transition-all"
                    >
                      <User className="w-4 h-4 mr-1" />
                      Compte
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 shadow-xl">
                    <DropdownMenuItem asChild>
                      <Link href="/login" className="flex items-center cursor-pointer">
                        <LogIn className="w-4 h-4 mr-2" />
                        Se connecter
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/register" className="flex items-center cursor-pointer">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Créer un compte
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {/* Menu mobile */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Menu mobile */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t bg-gray-50">
              <div className="flex flex-col space-y-3">
                {/* Recherche mobile */}
                <form onSubmit={handleSearch} className="relative mb-4">
                  <Input
                    type="search"
                    placeholder="Rechercher..."
                    className="pl-10 pr-4 py-2 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </form>

                {/* Navigation mobile */}
                <Link href="/" className="px-3 py-2 hover:bg-white rounded-lg transition-colors font-medium">
                  <Home className="w-4 h-4 inline-block mr-2" />
                  Accueil
                </Link>
                <Link href="/actualites" className="px-3 py-2 hover:bg-white rounded-lg transition-colors font-medium">
                  <Newspaper className="w-4 h-4 inline-block mr-2" />
                  Actualités
                </Link>
                <Link href="/services" className="px-3 py-2 hover:bg-white rounded-lg transition-colors font-medium">
                  <Briefcase className="w-4 h-4 inline-block mr-2" />
                  Services
                </Link>
                <Link
                  href="/notre-mission"
                  className="px-3 py-2 hover:bg-white rounded-lg transition-colors font-medium"
                >
                  <Target className="w-4 h-4 inline-block mr-2" />
                  Notre mission
                </Link>
                <Link
                  href="/culture-medecine"
                  className="px-3 py-2 hover:bg-white rounded-lg transition-colors font-medium"
                >
                  <Leaf className="w-4 h-4 inline-block mr-2" />
                  Culture & médecine
                </Link>

                {/* Menu mobile pour utilisateurs connectés */}
                {isAuthenticated && (
                  <>
                    <div className="border-t pt-3 mt-3">
                      <p className="px-3 text-sm font-semibold text-gray-600 mb-2">Espace personnel</p>
                      <Link
                        href="/profile"
                        className="px-3 py-2 hover:bg-white rounded-lg transition-colors font-medium"
                      >
                        <User className="w-4 h-4 inline-block mr-2" />
                        Mon espace santé
                      </Link>
                      <Link
                        href="/communaute"
                        className="px-3 py-2 hover:bg-white rounded-lg transition-colors font-medium"
                      >
                        <Users className="w-4 h-4 inline-block mr-2" />
                        Communauté & Forum
                      </Link>
                      <Link
                        href="/appointments/new"
                        className="px-3 py-2 hover:bg-white rounded-lg transition-colors font-medium"
                      >
                        <Calendar className="w-4 h-4 inline-block mr-2" />
                        Rendez-vous Rapide
                      </Link>
                      <Link
                        href="/medical-record"
                        className="px-3 py-2 hover:bg-white rounded-lg transition-colors font-medium"
                      >
                        <FileText className="w-4 h-4 inline-block mr-2" />
                        Mon Dossier Médical
                      </Link>
                      <Link
                        href="/notifications"
                        className="px-3 py-2 hover:bg-white rounded-lg transition-colors font-medium"
                      >
                        <Bell className="w-4 h-4 inline-block mr-2" />
                        Notifications et alertes
                      </Link>
                      <Link
                        href="/bien-etre"
                        className="px-3 py-2 hover:bg-white rounded-lg transition-colors font-medium"
                      >
                        <Heart className="w-4 h-4 inline-block mr-2" />
                        Bien-Être Express
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
