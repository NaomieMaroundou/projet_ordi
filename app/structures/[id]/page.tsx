"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  Star,
  MapPin,
  Phone,
  Clock,
  Heart,
  Share2,
  MessageCircle,
  Users,
  Calendar,
  Navigation,
  Camera,
  Video,
  Send,
  AlertCircle,
} from "lucide-react"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"
import { ReviewSystem } from "@/components/review-system"

type StructureData = {
  id: string
  name: string
  type: string
  logo: string
  images: string[]
  videos: string[]
  description: string
  address: string
  city: string
  province: string
  phone: string
  emergencyPhone: string
  website?: string
  email?: string
  rating: number
  reviews: number
  likes: number
  followers: number
  isFollowed: boolean
  isOpen: boolean
  openingHours: { [key: string]: string }
  services: string[]
  specialties: string[]
  doctors: Array<{
    id: string
    name: string
    specialty: string
    avatar: string
  }>
  nearbyStructures: Array<{
    id: string
    name: string
    distance: string
    isOpen: boolean
  }>
}

export default function StructureDetailPage({ params }: { params: { id: string } }) {
  const { isAuthenticated } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [newMessage, setNewMessage] = useState("")
  const [isLiked, setIsLiked] = useState(false)

  // Données simulées - en réalité, ces données viendraient d'une API
  const structure: StructureData = {
    id: params.id,
    name: "Hôpital Central de Libreville",
    type: "Hôpital Public",
    logo: "/placeholder.svg?height=100&width=100&text=HCL",
    images: [
      "/images/hospital1.png",
      "/placeholder.svg?height=300&width=400&text=Urgences",
      "/placeholder.svg?height=300&width=400&text=Maternité",
      "/placeholder.svg?height=300&width=400&text=Cardiologie",
    ],
    videos: ["/placeholder-video.mp4"],
    description:
      "L'Hôpital Central de Libreville est le principal établissement hospitalier public du Gabon. Il offre des soins de qualité dans toutes les spécialités médicales avec une équipe de professionnels expérimentés.",
    address: "Boulevard Omar Bongo, Libreville",
    city: "Libreville",
    province: "Estuaire",
    phone: "+241 77 12 34 56",
    emergencyPhone: "+241 77 12 34 57",
    website: "www.hcl-gabon.com",
    email: "contact@hcl-gabon.com",
    rating: 4.5,
    reviews: 234,
    likes: 1250,
    followers: 3400,
    isFollowed: false,
    isOpen: true,
    openingHours: {
      Lundi: "24h/24",
      Mardi: "24h/24",
      Mercredi: "24h/24",
      Jeudi: "24h/24",
      Vendredi: "24h/24",
      Samedi: "24h/24",
      Dimanche: "24h/24",
    },
    services: [
      "Urgences 24h/24",
      "Consultations externes",
      "Hospitalisation",
      "Chirurgie",
      "Maternité",
      "Pédiatrie",
      "Radiologie",
      "Laboratoire",
    ],
    specialties: ["Cardiologie", "Neurologie", "Orthopédie", "Gynécologie", "Ophtalmologie", "Dermatologie"],
    doctors: [
      {
        id: "1",
        name: "Dr. Jean Moussavou",
        specialty: "Cardiologie",
        avatar: "/images/doctor1.png",
      },
      {
        id: "2",
        name: "Dr. Marie Ndong",
        specialty: "Pédiatrie",
        avatar: "/images/doctor2.png",
      },
    ],
    nearbyStructures: [
      {
        id: "2",
        name: "Clinique El Rapha",
        distance: "1.2 km",
        isOpen: true,
      },
      {
        id: "3",
        name: "Pharmacie du Centre",
        distance: "0.8 km",
        isOpen: false,
      },
    ],
  }

  const handleFollow = () => {
    if (!isAuthenticated) {
      // Rediriger vers la connexion
      return
    }
    // Logique pour suivre/ne plus suivre
  }

  const handleLike = () => {
    if (!isAuthenticated) {
      // Rediriger vers la connexion
      return
    }
    setIsLiked(!isLiked)
  }

  const handleSendMessage = () => {
    if (!isAuthenticated || newMessage.trim() === "") return

    // Logique pour envoyer le message
    setNewMessage("")
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container flex items-center p-4">
          <Link href="/recherche" className="mr-3">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-bold line-clamp-1">{structure.name}</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container py-6">
        {/* Structure Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <Image
                  src={structure.logo || "/placeholder.svg"}
                  alt={structure.name}
                  width={100}
                  height={100}
                  className="rounded-lg object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-2xl font-bold mb-2">Bienvenue sur la plateforme {structure.name}</h1>
                    <Badge className={`${structure.isOpen ? "bg-green-500" : "bg-red-500"} text-white mb-2`}>
                      {structure.isOpen ? "Ouvert" : "Fermé"}
                    </Badge>
                    <p className="text-gray-600">{structure.type}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-medium">{structure.rating}</span>
                    <span className="text-gray-500">({structure.reviews} avis)</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>
                      {structure.address}, {structure.city}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>{structure.phone}</span>
                  </div>
                  <div className="flex items-center text-red-600">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    <span>Urgences: {structure.emergencyPhone}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button
                    variant={structure.isFollowed ? "default" : "outline"}
                    onClick={handleFollow}
                    className="flex items-center gap-2"
                  >
                    <Users className="w-4 h-4" />
                    {structure.isFollowed ? "Suivi" : "Suivre"}
                    <span className="text-sm">({structure.followers})</span>
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handleLike}
                    className={`flex items-center gap-2 ${isLiked ? "text-red-600" : ""}`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
                    J'aime
                    <span className="text-sm">({structure.likes})</span>
                  </Button>

                  <Button variant="outline" className="flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Partager
                  </Button>

                  <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2" asChild>
                    <Link href={`/appointments/new?structure=${structure.id}`}>
                      <Calendar className="w-4 h-4" />
                      Prendre RDV
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 mb-6">
            <TabsTrigger value="overview">Aperçu</TabsTrigger>
            <TabsTrigger value="media">Photos/Vidéos</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="reviews">Avis</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Description */}
                <Card>
                  <CardHeader>
                    <CardTitle>À propos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{structure.description}</p>
                  </CardContent>
                </Card>

                {/* Services */}
                <Card>
                  <CardHeader>
                    <CardTitle>Services disponibles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      {structure.services.map((service) => (
                        <Badge key={service} variant="secondary" className="justify-center p-2">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Doctors */}
                <Card>
                  <CardHeader>
                    <CardTitle>Médecins</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {structure.doctors.map((doctor) => (
                        <div key={doctor.id} className="flex items-center gap-3 p-3 border rounded-lg">
                          <Avatar>
                            <AvatarImage src={doctor.avatar || "/placeholder.svg"} alt={doctor.name} />
                            <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-medium">{doctor.name}</h4>
                            <p className="text-sm text-gray-600">{doctor.specialty}</p>
                          </div>
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/doctors/${doctor.id}`}>Voir profil</Link>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Direct Contact */}
                <Card>
                  <CardHeader>
                    <CardTitle>Contacter la structure</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Textarea
                        placeholder="Posez votre question à la structure (disponibilité, services, etc.)..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        rows={3}
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!isAuthenticated || newMessage.trim() === ""}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Envoyer
                      </Button>
                      {!isAuthenticated && (
                        <p className="text-sm text-gray-500">Connectez-vous pour envoyer un message</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Opening Hours */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Horaires
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {Object.entries(structure.openingHours).map(([day, hours]) => (
                        <div key={day} className="flex justify-between text-sm">
                          <span className="font-medium">{day}</span>
                          <span className="text-gray-600">{hours}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Nearby Structures */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Navigation className="w-5 h-5" />
                      Structures à proximité
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {structure.nearbyStructures.map((nearby) => (
                        <div key={nearby.id} className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-sm">{nearby.name}</p>
                            <p className="text-xs text-gray-500">{nearby.distance}</p>
                          </div>
                          <Badge
                            variant={nearby.isOpen ? "default" : "secondary"}
                            className={nearby.isOpen ? "bg-green-500" : "bg-gray-500"}
                          >
                            {nearby.isOpen ? "Ouvert" : "Fermé"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Actions rapides</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <a href={`tel:${structure.phone}`}>
                        <Phone className="w-4 h-4 mr-2" />
                        Appeler
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href={`/directions?to=${structure.id}`}>
                        <Navigation className="w-4 h-4 mr-2" />
                        Itinéraire
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href={`/communaute/messages?structure=${structure.id}`}>
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Message
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Media Tab */}
          <TabsContent value="media">
            <div className="space-y-6">
              {/* Photos */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="w-5 h-5" />
                    Photos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {structure.images.map((image, index) => (
                      <div key={index} className="relative group cursor-pointer">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Photo ${index + 1}`}
                          width={200}
                          height={150}
                          className="w-full h-32 object-cover rounded-lg group-hover:scale-105 transition-transform"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Videos */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="w-5 h-5" />
                    Vidéos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {structure.videos.map((video, index) => (
                      <div
                        key={index}
                        className="relative bg-gray-200 rounded-lg h-48 flex items-center justify-center"
                      >
                        <Video className="w-12 h-12 text-gray-400" />
                        <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                          Vidéo {index + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Services généraux</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {structure.services.map((service) => (
                      <div key={service} className="flex items-center gap-2 p-2 border rounded">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span>{service}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Spécialités médicales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {structure.specialties.map((specialty) => (
                      <div key={specialty} className="flex items-center gap-2 p-2 border rounded">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span>{specialty}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informations de contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Téléphone principal</p>
                      <p className="text-gray-600">{structure.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <div>
                      <p className="font-medium">Urgences</p>
                      <p className="text-gray-600">{structure.emergencyPhone}</p>
                    </div>
                  </div>

                  {structure.email && (
                    <div className="flex items-center gap-3">
                      <MessageCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-gray-600">{structure.email}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-medium">Adresse</p>
                      <p className="text-gray-600">{structure.address}</p>
                      <p className="text-gray-600">
                        {structure.city}, {structure.province}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Localisation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Carte interactive</p>
                  </div>
                  <Button className="w-full mt-4" variant="outline" asChild>
                    <Link href={`/directions?to=${structure.id}`}>
                      <Navigation className="w-4 h-4 mr-2" />
                      Obtenir l'itinéraire
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <ReviewSystem facilityId={structure.id} isLoggedIn={isAuthenticated} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
