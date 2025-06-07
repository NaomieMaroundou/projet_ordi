"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Calendar,
  Video,
  Heart,
  Play,
  MapPin,
  Users,
  Shield,
  Settings,
  HelpCircle,
  LogOut,
  Activity,
  Stethoscope,
  MessageCircle,
  Download,
  Upload,
  Eye,
  Edit,
  Plus,
  ChevronRight,
  User,
  AlertTriangle,
  TrendingUp,
  Share2,
  Bookmark,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { motion } from "framer-motion"

// Données simulées
const healthData = {
  profile: {
    name: "Dr. Marie Obame",
    age: 35,
    bloodType: "O+",
    height: "165 cm",
    weight: "62 kg",
    allergies: ["Pénicilline", "Arachides"],
    chronicConditions: ["Hypertension"],
    emergencyContact: "+241 06 12 34 56",
  },
  appointments: [
    {
      id: 1,
      doctor: "Dr. Jean Nzé",
      specialty: "Cardiologie",
      date: "2024-01-20",
      time: "14:30",
      status: "confirmé",
      location: "Hôpital de Melen",
    },
    {
      id: 2,
      doctor: "Dr. Claire Mouele",
      specialty: "Dermatologie",
      date: "2024-01-25",
      time: "10:00",
      status: "en attente",
      location: "Clinique Sainte-Marie",
    },
  ],
  donations: [
    {
      id: 1,
      type: "Sang",
      date: "2023-12-15",
      location: "Centre de transfusion de Libreville",
      nextEligible: "2024-03-15",
    },
    {
      id: 2,
      type: "Plaquettes",
      date: "2023-11-20",
      location: "Hôpital de Melen",
      nextEligible: "2024-01-20",
    },
  ],
  videos: [
    {
      id: 1,
      title: "Exercices de respiration pour l'anxiété",
      duration: "8:45",
      category: "Bien-être mental",
      thumbnail: "/placeholder.svg?height=120&width=200&text=Respiration",
    },
    {
      id: 2,
      title: "Nutrition et prévention du diabète",
      duration: "12:30",
      category: "Nutrition",
      thumbnail: "/placeholder.svg?height=120&width=200&text=Nutrition",
    },
  ],
  nearbyHospitals: [
    {
      id: 1,
      name: "Hôpital de Melen",
      distance: "2.5 km",
      rating: 4.2,
      services: ["Urgences", "Cardiologie", "Pédiatrie"],
    },
    {
      id: 2,
      name: "Clinique Sainte-Marie",
      distance: "3.8 km",
      rating: 4.5,
      services: ["Dermatologie", "Gynécologie", "Radiologie"],
    },
  ],
  healthGroups: [
    {
      id: 1,
      name: "Diabétiques du Gabon",
      members: 245,
      category: "Maladie chronique",
      lastActivity: "Il y a 2h",
    },
    {
      id: 2,
      name: "Mamans de Libreville",
      members: 189,
      category: "Santé maternelle",
      lastActivity: "Il y a 1h",
    },
  ],
  healthMetrics: {
    steps: 8542,
    stepsGoal: 10000,
    heartRate: 72,
    bloodPressure: "120/80",
    weight: 62,
    bmi: 22.8,
  },
}

const menuItems = [
  {
    id: "health-record",
    title: "📘 Carnet de Santé Intelligent",
    description: "Votre dossier médical complet et sécurisé",
    icon: <BookOpen className="w-6 h-6" />,
    color: "bg-blue-500",
  },
  {
    id: "appointments",
    title: "📅 Mes Rendez-vous Médicaux",
    description: "Gérez vos consultations et rappels",
    icon: <Calendar className="w-6 h-6" />,
    color: "bg-green-500",
  },
  {
    id: "teleconsultation",
    title: "💻 Téléconsultation",
    description: "Consultations vidéo avec vos médecins",
    icon: <Video className="w-6 h-6" />,
    color: "bg-purple-500",
  },
  {
    id: "donations",
    title: "🩸 Mes Dons",
    description: "Historique de vos dons de sang et organes",
    icon: <Heart className="w-6 h-6" />,
    color: "bg-red-500",
  },
  {
    id: "health-videos",
    title: "🎥 Mes Vidéos Santé",
    description: "Contenus éducatifs personnalisés",
    icon: <Play className="w-6 h-6" />,
    color: "bg-orange-500",
  },
  {
    id: "nearby-hospitals",
    title: "🏥 Hôpitaux & Centres à Proximité",
    description: "Trouvez les structures de santé près de vous",
    icon: <MapPin className="w-6 h-6" />,
    color: "bg-teal-500",
  },
  {
    id: "health-groups",
    title: "👥 Mes Groupes Santé / Communautés",
    description: "Rejoignez des communautés de patients",
    icon: <Users className="w-6 h-6" />,
    color: "bg-indigo-500",
  },
  {
    id: "security",
    title: "🔒 Sécurité & Confidentialité",
    description: "Gérez la confidentialité de vos données",
    icon: <Shield className="w-6 h-6" />,
    color: "bg-gray-600",
  },
  {
    id: "settings",
    title: "⚙️ Paramètres",
    description: "Personnalisez votre expérience",
    icon: <Settings className="w-6 h-6" />,
    color: "bg-slate-500",
  },
  {
    id: "help",
    title: "📢 Assistance & Aide",
    description: "Support et questions fréquentes",
    icon: <HelpCircle className="w-6 h-6" />,
    color: "bg-yellow-500",
  },
  {
    id: "logout",
    title: "🚪 Déconnexion",
    description: "Se déconnecter de l'application",
    icon: <LogOut className="w-6 h-6" />,
    color: "bg-red-600",
  },
]

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState("overview")
  const { user, logout } = useAuth()

  const handleMenuClick = (itemId: string) => {
    if (itemId === "logout") {
      logout()
      return
    }
    setActiveSection(itemId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* En-tête du profil */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <Avatar className="w-24 h-24 border-4 border-white/20">
                  <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                  <AvatarFallback className="bg-white/20 text-white text-2xl font-bold">
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center md:text-left flex-1">
                  <h1 className="text-3xl font-bold mb-2">{healthData.profile.name}</h1>
                  <p className="text-white/80 mb-4">
                    {healthData.profile.age} ans • Groupe sanguin: {healthData.profile.bloodType}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <Badge className="bg-white/20 text-white border-white/30">
                      <Activity className="w-3 h-3 mr-1" />
                      Profil actif
                    </Badge>
                    <Badge className="bg-white/20 text-white border-white/30">
                      <Shield className="w-3 h-3 mr-1" />
                      Données sécurisées
                    </Badge>
                  </div>
                </div>
                <div className="text-center">
                  <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                    <Edit className="w-4 h-4 mr-2" />
                    Modifier le profil
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation par onglets */}
        <Tabs value={activeSection} onValueChange={setActiveSection} className="mb-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="health-record">Carnet de santé</TabsTrigger>
            <TabsTrigger value="appointments">Rendez-vous</TabsTrigger>
            <TabsTrigger value="donations">Mes dons</TabsTrigger>
            <TabsTrigger value="health-videos">Vidéos santé</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>

          {/* Vue d'ensemble */}
          <TabsContent value="overview" className="space-y-6">
            {/* Métriques de santé */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Pas aujourd'hui</p>
                      <p className="text-2xl font-bold">{healthData.healthMetrics.steps.toLocaleString()}</p>
                      <Progress
                        value={(healthData.healthMetrics.steps / healthData.healthMetrics.stepsGoal) * 100}
                        className="mt-2 bg-blue-400"
                      />
                    </div>
                    <Activity className="w-8 h-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-red-100">Rythme cardiaque</p>
                      <p className="text-2xl font-bold">{healthData.healthMetrics.heartRate} bpm</p>
                      <p className="text-red-100 text-sm">Normal</p>
                    </div>
                    <Heart className="w-8 h-8 text-red-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">Tension artérielle</p>
                      <p className="text-2xl font-bold">{healthData.healthMetrics.bloodPressure}</p>
                      <p className="text-green-100 text-sm">Optimal</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">IMC</p>
                      <p className="text-2xl font-bold">{healthData.healthMetrics.bmi}</p>
                      <p className="text-purple-100 text-sm">Normal</p>
                    </div>
                    <User className="w-8 h-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Menu principal */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105"
                    onClick={() => handleMenuClick(item.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div
                          className={`p-3 rounded-lg ${item.color} text-white group-hover:scale-110 transition-transform`}
                        >
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 text-sm">{item.description}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Prochains rendez-vous */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                  Prochains rendez-vous
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {healthData.appointments.slice(0, 2).map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Stethoscope className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{appointment.doctor}</h4>
                          <p className="text-sm text-gray-600">{appointment.specialty}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(appointment.date).toLocaleDateString("fr-FR")} à {appointment.time}
                          </p>
                        </div>
                      </div>
                      <Badge variant={appointment.status === "confirmé" ? "default" : "secondary"}>
                        {appointment.status}
                      </Badge>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4" asChild>
                  <Link href="/appointments">Voir tous les rendez-vous</Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Carnet de santé */}
          <TabsContent value="health-record" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informations personnelles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Âge</label>
                      <p className="font-medium">{healthData.profile.age} ans</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Groupe sanguin</label>
                      <p className="font-medium">{healthData.profile.bloodType}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Taille</label>
                      <p className="font-medium">{healthData.profile.height}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Poids</label>
                      <p className="font-medium">{healthData.profile.weight}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Contact d'urgence</label>
                    <p className="font-medium">{healthData.profile.emergencyContact}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
                    Allergies et conditions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Allergies</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {healthData.profile.allergies.map((allergy) => (
                        <Badge key={allergy} variant="destructive">
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Conditions chroniques</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {healthData.profile.chronicConditions.map((condition) => (
                        <Badge key={condition} variant="secondary">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="h-auto p-4 flex flex-col items-center gap-2">
                    <Upload className="w-6 h-6" />
                    <span>Ajouter un document</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                    <Download className="w-6 h-6" />
                    <span>Télécharger le carnet</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                    <Share2 className="w-6 h-6" />
                    <span>Partager avec un médecin</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rendez-vous */}
          <TabsContent value="appointments" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Mes rendez-vous</h2>
              <Button asChild>
                <Link href="/appointments/new">
                  <Plus className="w-4 h-4 mr-2" />
                  Nouveau rendez-vous
                </Link>
              </Button>
            </div>

            <div className="space-y-4">
              {healthData.appointments.map((appointment) => (
                <Card key={appointment.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                          <Stethoscope className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{appointment.doctor}</h3>
                          <p className="text-gray-600">{appointment.specialty}</p>
                          <p className="text-sm text-gray-500 flex items-center mt-1">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(appointment.date).toLocaleDateString("fr-FR")} à {appointment.time}
                          </p>
                          <p className="text-sm text-gray-500 flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {appointment.location}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={appointment.status === "confirmé" ? "default" : "secondary"} className="mb-2">
                          {appointment.status}
                        </Badge>
                        <div className="space-y-2">
                          <Button size="sm" className="w-full">
                            <Video className="w-4 h-4 mr-2" />
                            Téléconsultation
                          </Button>
                          <Button size="sm" variant="outline" className="w-full">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Contacter
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Mes dons */}
          <TabsContent value="donations" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Historique de mes dons</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Programmer un don
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {healthData.donations.map((donation) => (
                <Card key={donation.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <Heart className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Don de {donation.type}</h3>
                        <p className="text-sm text-gray-600">{donation.location}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Date du don:</span>
                        <span>{new Date(donation.date).toLocaleDateString("fr-FR")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Prochain don possible:</span>
                        <span className="font-medium text-green-600">
                          {new Date(donation.nextEligible).toLocaleDateString("fr-FR")}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <Heart className="w-8 h-8 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Votre impact</h3>
                    <p className="text-gray-600">Vos dons ont aidé à sauver des vies au Gabon</p>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge className="bg-red-600">2 dons cette année</Badge>
                      <Badge variant="outline">Donneur régulier</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vidéos santé */}
          <TabsContent value="health-videos" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Mes vidéos santé</h2>
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Voir tout
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {healthData.videos.map((video) => (
                <Card key={video.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-blue-600 ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <Badge className="mb-2">{video.category}</Badge>
                    <h3 className="font-semibold mb-2">{video.title}</h3>
                    <div className="flex justify-between items-center">
                      <Button size="sm">Regarder</Button>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost">
                          <Bookmark className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-6">
                <div className="text-center">
                  <Play className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Contenu personnalisé</h3>
                  <p className="text-gray-600 mb-4">
                    Découvrez des vidéos adaptées à votre profil de santé et vos besoins
                  </p>
                  <Button>Explorer les recommandations</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Paramètres */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold">Paramètres</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Rappels de rendez-vous</p>
                      <p className="text-sm text-gray-600">Recevoir des notifications avant vos consultations</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Activé
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Actualités santé</p>
                      <p className="text-sm text-gray-600">Recevoir les dernières actualités médicales</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Activé
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Rappels de médicaments</p>
                      <p className="text-sm text-gray-600">Notifications pour la prise de médicaments</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Désactivé
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Confidentialité</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Profil public</p>
                      <p className="text-sm text-gray-600">Permettre aux autres utilisateurs de voir votre profil</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Privé
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Partage de données</p>
                      <p className="text-sm text-gray-600">Partager des données anonymes pour la recherche</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Autorisé
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Authentification à deux facteurs</p>
                      <p className="text-sm text-gray-600">Sécurité renforcée pour votre compte</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Activé
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Zone de danger</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
                  <div>
                    <p className="font-medium text-red-600">Supprimer le compte</p>
                    <p className="text-sm text-gray-600">
                      Cette action est irréversible. Toutes vos données seront supprimées.
                    </p>
                  </div>
                  <Button variant="destructive">Supprimer</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
