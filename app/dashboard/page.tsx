"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Video,
  FileText,
  Heart,
  Activity,
  Users,
  Building,
  CheckCircle,
  Star,
  MessageCircle,
  Bell,
  Settings,
  TrendingUp,
  Stethoscope,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ChatBot } from "@/components/chat-bot"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Jean Moussavou",
      specialty: "Cardiologie",
      date: "15 janvier 2025",
      time: "10:30",
      type: "Consultation",
      status: "confirmed",
      facility: "CHU Libreville",
      image: "/images/doctor1.png",
    },
    {
      id: 2,
      doctor: "Dr. Marie Ndong",
      specialty: "Pédiatrie",
      date: "18 janvier 2025",
      time: "14:00",
      type: "Téléconsultation",
      status: "pending",
      facility: "En ligne",
      image: "/images/doctor2.png",
    },
  ]

  const healthMetrics = [
    { label: "Tension artérielle", value: "120/80", status: "normal", icon: <Heart className="w-5 h-5" /> },
    { label: "Fréquence cardiaque", value: "72 bpm", status: "normal", icon: <Activity className="w-5 h-5" /> },
    { label: "Poids", value: "70 kg", status: "stable", icon: <TrendingUp className="w-5 h-5" /> },
    { label: "IMC", value: "22.5", status: "normal", icon: <Users className="w-5 h-5" /> },
  ]

  const recentActivities = [
    {
      type: "appointment",
      title: "Consultation terminée",
      description: "Dr. Pierre Obame - Neurologie",
      time: "Il y a 2 jours",
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
    },
    {
      type: "prescription",
      title: "Nouvelle ordonnance",
      description: "Médicaments prescrits par Dr. Jean Moussavou",
      time: "Il y a 3 jours",
      icon: <FileText className="w-5 h-5 text-blue-500" />,
    },
    {
      type: "reminder",
      title: "Rappel de vaccination",
      description: "Vaccination COVID-19 recommandée",
      time: "Il y a 1 semaine",
      icon: <Bell className="w-5 h-5 text-orange-500" />,
    },
  ]

  const nearbyFacilities = [
    {
      name: "CHU Libreville",
      distance: "2.5 km",
      type: "Hôpital public",
      rating: 4.5,
      emergency: true,
      image: "/images/chu-libreville-entrance.png",
    },
    {
      name: "Clinique El Rapha",
      distance: "3.2 km",
      type: "Clinique privée",
      rating: 4.7,
      emergency: false,
      image: "/images/hospital3.png",
    },
    {
      name: "Hôpital Melen",
      distance: "5.1 km",
      type: "Hôpital régional",
      rating: 4.1,
      emergency: true,
      image: "/images/melen-gab.png",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tableau de Bord</h1>
              <p className="text-gray-600">Bienvenue, Jean Dupont</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Paramètres
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="appointments">Rendez-vous</TabsTrigger>
            <TabsTrigger value="health">Santé</TabsTrigger>
            <TabsTrigger value="facilities">Structures</TabsTrigger>
          </TabsList>

          {/* Vue d'ensemble */}
          <TabsContent value="overview" className="space-y-6">
            {/* Statistiques rapides */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Prochains RDV</p>
                      <p className="text-2xl font-bold">2</p>
                    </div>
                    <Calendar className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Consultations</p>
                      <p className="text-2xl font-bold">12</p>
                    </div>
                    <Stethoscope className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Ordonnances</p>
                      <p className="text-2xl font-bold">5</p>
                    </div>
                    <FileText className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">État de santé</p>
                      <p className="text-2xl font-bold text-green-600">Bon</p>
                    </div>
                    <Heart className="w-8 h-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Prochains rendez-vous */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Prochains rendez-vous
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <Image
                        src={appointment.image || "/placeholder.svg"}
                        alt={appointment.doctor}
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{appointment.doctor}</h4>
                        <p className="text-sm text-gray-600">{appointment.specialty}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {appointment.date}
                          </span>
                          <span className="text-sm flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {appointment.time}
                          </span>
                          <span className="text-sm flex items-center gap-1">
                            {appointment.type === "Téléconsultation" ? (
                              <Video className="w-3 h-3" />
                            ) : (
                              <MapPin className="w-3 h-3" />
                            )}
                            {appointment.facility}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Badge
                          className={
                            appointment.status === "confirmed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {appointment.status === "confirmed" ? "Confirmé" : "En attente"}
                        </Badge>
                        <Button size="sm" variant="outline">
                          Détails
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button asChild>
                    <Link href="/appointments">Voir tous les rendez-vous</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Activités récentes */}
            <Card>
              <CardHeader>
                <CardTitle>Activités récentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      {activity.icon}
                      <div className="flex-1">
                        <h4 className="font-medium">{activity.title}</h4>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
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
                  <Calendar className="w-4 h-4 mr-2" />
                  Nouveau rendez-vous
                </Link>
              </Button>
            </div>

            <div className="grid gap-6">
              {upcomingAppointments.map((appointment) => (
                <Card key={appointment.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Image
                        src={appointment.image || "/placeholder.svg"}
                        alt={appointment.doctor}
                        width={80}
                        height={80}
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{appointment.doctor}</h3>
                        <p className="text-blue-600">{appointment.specialty}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {appointment.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {appointment.time}
                          </span>
                          <span className="flex items-center gap-1">
                            {appointment.type === "Téléconsultation" ? (
                              <Video className="w-4 h-4" />
                            ) : (
                              <MapPin className="w-4 h-4" />
                            )}
                            {appointment.facility}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Badge
                          className={
                            appointment.status === "confirmed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {appointment.status === "confirmed" ? "Confirmé" : "En attente"}
                        </Badge>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Phone className="w-3 h-3 mr-1" />
                            Appeler
                          </Button>
                          <Button size="sm">
                            <MessageCircle className="w-3 h-3 mr-1" />
                            Message
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Santé */}
          <TabsContent value="health" className="space-y-6">
            <h2 className="text-2xl font-bold">Mon état de santé</h2>

            {/* Métriques de santé */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {healthMetrics.map((metric, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      {metric.icon}
                      <Badge
                        className={
                          metric.status === "normal" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {metric.status}
                      </Badge>
                    </div>
                    <h3 className="font-semibold">{metric.label}</h3>
                    <p className="text-2xl font-bold">{metric.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Dossier médical */}
            <Card>
              <CardHeader>
                <CardTitle>Dossier médical</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Informations personnelles</h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Âge:</span> 35 ans
                      </p>
                      <p>
                        <span className="font-medium">Groupe sanguin:</span> O+
                      </p>
                      <p>
                        <span className="font-medium">Allergies:</span> Aucune connue
                      </p>
                      <p>
                        <span className="font-medium">Médecin traitant:</span> Dr. Jean Moussavou
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Derniers examens</h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Bilan sanguin:</span> 15/12/2024
                      </p>
                      <p>
                        <span className="font-medium">ECG:</span> 10/11/2024
                      </p>
                      <p>
                        <span className="font-medium">Radiographie:</span> 05/10/2024
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Télécharger le dossier complet
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Structures */}
          <TabsContent value="facilities" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Structures près de chez vous</h2>
              <Button asChild>
                <Link href="/facilities">
                  <Building className="w-4 h-4 mr-2" />
                  Voir toutes les structures
                </Link>
              </Button>
            </div>

            <div className="grid gap-6">
              {nearbyFacilities.map((facility, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <Image
                        src={facility.image || "/placeholder.svg"}
                        alt={facility.name}
                        width={100}
                        height={80}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg">{facility.name}</h3>
                          {facility.emergency && <Badge className="bg-red-600">Urgences 24/7</Badge>}
                        </div>
                        <p className="text-blue-600">{facility.type}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {facility.distance}
                          </span>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= Math.floor(facility.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="ml-1 text-sm">{facility.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button size="sm">
                          <Calendar className="w-3 h-3 mr-1" />
                          Rendez-vous
                        </Button>
                        <Button size="sm" variant="outline">
                          <MapPin className="w-3 h-3 mr-1" />
                          Itinéraire
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Chatbot */}
      <ChatBot />
    </div>
  )
}
