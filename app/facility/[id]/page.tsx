"use client"

import Link from "next/link"
import {
  ArrowLeft,
  MapPin,
  Phone,
  Clock,
  Star,
  Calendar,
  Navigation,
  Share2,
  MessageCircle,
  Info,
  Stethoscope,
  HeartPulse,
  Baby,
  Brain,
  Eye,
  Thermometer,
  Activity,
  Clipboard,
  Microscope,
  Syringe,
  Pill,
  Ambulance,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { ChatBot } from "@/components/chat-bot"

export default function FacilityPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#fff5f8]">
      {/* Header */}
      <header className="relative">
        <Image
          src="/placeholder.svg?height=250&width=500"
          alt="Facility"
          width={500}
          height={250}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-pink-500/30"></div>
        <Link href="/" className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md z-10">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <Button variant="ghost" size="icon" className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md z-10">
          <Share2 className="w-5 h-5" />
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 container p-4 -mt-6 relative z-10">
        <Card className="mb-4">
          <CardContent className="p-4">
            <h1 className="text-xl font-bold mb-1">Hôpital Central de Libreville</h1>
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span>Boulevard Omar Bongo, Libreville - Estuaire</span>
            </div>
            <div className="flex items-center mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 fill-current text-yellow-400" />
              ))}
              <span className="ml-1 text-sm text-gray-500">(128 avis)</span>
            </div>
            <div className="flex items-center text-sm mb-2">
              <div className="flex items-center mr-4">
                <Phone className="w-4 h-4 mr-1 text-blue-600" />
                <span>+241 77 12 34 56</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1 text-blue-600" />
                <span>Ouvert 24h/24</span>
              </div>
            </div>
            <div className="flex items-center text-sm mb-3">
              <MapPin className="w-4 h-4 mr-1 text-blue-600" />
              <span className="text-xs">0.3924° N, 9.4536° E</span>
              <Button variant="ghost" size="sm" className="ml-1 h-5 p-0 text-blue-600">
                Voir sur GPS
              </Button>
            </div>
            <div className="flex gap-2 mb-3">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                <Calendar className="w-4 h-4 mr-2" />
                Rendez-vous
              </Button>
              <Button variant="outline" className="flex-1">
                <Navigation className="w-4 h-4 mr-2" />
                Itinéraire
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="info" className="mb-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="info">Informations</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="reviews">Avis</TabsTrigger>
          </TabsList>
          <TabsContent value="info" className="mt-4">
            <Card>
              <CardContent className="p-4">
                <h2 className="font-bold mb-2 flex items-center">
                  <Info className="w-4 h-4 mr-2 text-blue-600" />À propos
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  L'Hôpital Central de Libreville est le plus grand établissement de santé du Gabon, offrant une gamme
                  complète de services médicaux et chirurgicaux. Fondé en 1965, il dispose d'équipements modernes et
                  d'une équipe de professionnels qualifiés.
                </p>

                <h2 className="font-bold mb-2 flex items-center">
                  <Stethoscope className="w-4 h-4 mr-2 text-blue-600" />
                  Spécialités
                </h2>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {[
                    { name: "Cardiologie", icon: <HeartPulse className="w-3 h-3 mr-1" /> },
                    { name: "Pédiatrie", icon: <Baby className="w-3 h-3 mr-1" /> },
                    { name: "Gynécologie", icon: <Activity className="w-3 h-3 mr-1" /> },
                    { name: "Neurologie", icon: <Brain className="w-3 h-3 mr-1" /> },
                    { name: "Ophtalmologie", icon: <Eye className="w-3 h-3 mr-1" /> },
                    { name: "Oncologie", icon: <Thermometer className="w-3 h-3 mr-1" /> },
                  ].map((specialty) => (
                    <div
                      key={specialty.name}
                      className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      {specialty.icon}
                      {specialty.name}
                    </div>
                  ))}
                </div>

                <h2 className="font-bold mb-2 flex items-center">
                  <Pill className="w-4 h-4 mr-2 text-blue-600" />
                  Pharmacies à proximité
                </h2>
                <div className="space-y-3">
                  {[1, 2].map((item) => (
                    <Link href={`/pharmacy/${item}`} key={item}>
                      <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-3">
                          <div className="flex items-center gap-3">
                            <Image
                              src="/placeholder.svg?height=50&width=50"
                              alt="Pharmacy"
                              width={50}
                              height={50}
                              className="rounded-lg"
                            />
                            <div className="flex-1">
                              <h3 className="font-medium">Pharmacie Centrale</h3>
                              <div className="flex items-center text-sm text-gray-500">
                                <MapPin className="w-3 h-3 mr-1" />
                                <span>0.3 km - 5 min à pied</span>
                              </div>
                              <div className="text-xs text-green-600 mt-1">Ouvert jusqu'à 22h</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="services" className="mt-4">
            <Card>
              <CardContent className="p-4">
                <h2 className="font-bold mb-3 flex items-center">
                  <Clipboard className="w-4 h-4 mr-2 text-blue-600" />
                  Services médicaux disponibles
                </h2>
                <div className="grid gap-3">
                  {[
                    { name: "Urgences", available: true, icon: <Ambulance className="w-4 h-4 mr-2 text-blue-600" /> },
                    { name: "Maternité", available: true, icon: <Baby className="w-4 h-4 mr-2 text-blue-600" /> },
                    {
                      name: "Laboratoire d'analyses",
                      available: true,
                      icon: <Microscope className="w-4 h-4 mr-2 text-blue-600" />,
                    },
                    {
                      name: "Imagerie médicale",
                      available: true,
                      icon: <Activity className="w-4 h-4 mr-2 text-blue-600" />,
                    },
                    {
                      name: "Soins intensifs",
                      available: true,
                      icon: <HeartPulse className="w-4 h-4 mr-2 text-blue-600" />,
                    },
                    { name: "Chirurgie", available: true, icon: <Syringe className="w-4 h-4 mr-2 text-blue-600" /> },
                    { name: "Dialyse", available: false, icon: <Activity className="w-4 h-4 mr-2 text-red-600" /> },
                    {
                      name: "Radiothérapie",
                      available: false,
                      icon: <Thermometer className="w-4 h-4 mr-2 text-red-600" />,
                    },
                  ].map((service) => (
                    <div
                      key={service.name}
                      className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
                    >
                      <div className="flex items-center">
                        {service.icon}
                        <span>{service.name}</span>
                      </div>
                      <span className={service.available ? "text-green-600" : "text-red-600"}>
                        {service.available ? "Disponible" : "Non disponible"}
                      </span>
                    </div>
                  ))}
                </div>

                <h2 className="font-bold mt-6 mb-3 flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-blue-600" />
                  Horaires des consultations
                </h2>
                <div className="grid gap-2">
                  {[
                    { day: "Lundi - Vendredi", hours: "08:00 - 17:00" },
                    { day: "Samedi", hours: "09:00 - 13:00" },
                    { day: "Dimanche", hours: "Fermé (sauf urgences)" },
                  ].map((schedule, index) => (
                    <div key={index} className="flex justify-between p-2 border-b last:border-0">
                      <span className="font-medium">{schedule.day}</span>
                      <span>{schedule.hours}</span>
                    </div>
                  ))}
                </div>

                <h2 className="font-bold mt-6 mb-3 flex items-center">
                  <Stethoscope className="w-4 h-4 mr-2 text-blue-600" />
                  Équipe médicale
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { name: "Dr. Marie Ndong", specialty: "Cardiologie", image: "/placeholder.svg?height=50&width=50" },
                    {
                      name: "Dr. Jean Moussavou",
                      specialty: "Pédiatrie",
                      image: "/placeholder.svg?height=50&width=50",
                    },
                    { name: "Dr. Sophie Obame", specialty: "Neurologie", image: "/placeholder.svg?height=50&width=50" },
                    { name: "Dr. Pierre Ondo", specialty: "Chirurgie", image: "/placeholder.svg?height=50&width=50" },
                  ].map((doctor, index) => (
                    <div key={index} className="flex items-center p-2 bg-blue-50 rounded-lg">
                      <Image
                        src={doctor.image || "/placeholder.svg"}
                        alt={doctor.name}
                        width={40}
                        height={40}
                        className="rounded-full mr-3"
                      />
                      <div>
                        <p className="font-medium">{doctor.name}</p>
                        <p className="text-xs text-blue-600">{doctor.specialty}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reviews" className="mt-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-3xl font-bold">4.8</div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          className="focus:outline-none hover:scale-110 transition-transform"
                          onClick={() => {
                            // Logique de notation
                            console.log(`Note donnée: ${star} étoiles`)
                          }}
                        >
                          <Star className="w-4 h-4 fill-current text-yellow-400 hover:text-yellow-500" />
                        </button>
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">128 avis</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Cliquez sur les étoiles pour noter</div>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      name: "Marie K.",
                      rating: 5,
                      date: "Il y a 2 jours",
                      comment: "Personnel très attentionné et compétent. Les installations sont propres et modernes.",
                    },
                    {
                      name: "Jean P.",
                      rating: 4,
                      date: "Il y a 1 semaine",
                      comment:
                        "Bon service mais temps d'attente un peu long aux urgences. Médecins très professionnels.",
                    },
                    {
                      name: "Sophie M.",
                      rating: 5,
                      date: "Il y a 2 semaines",
                      comment: "Excellente prise en charge pour mon accouchement. Je recommande vivement la maternité.",
                    },
                  ].map((review, index) => (
                    <div key={index} className="border-b pb-3 last:border-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-medium">{review.name}</div>
                        <div className="text-xs text-gray-500">{review.date}</div>
                      </div>
                      <div className="flex mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 fill-current ${star <= review.rating ? "text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 bg-white border-t border-gray-200">
        <div className="flex justify-around">
          <Link href="/" className="flex flex-col items-center py-2 flex-1">
            <svg
              className="w-6 h-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="text-xs">Accueil</span>
          </Link>
          <Link href="/facilities" className="flex flex-col items-center py-2 flex-1">
            <MapPin className="w-6 h-6 text-blue-600" />
            <span className="text-xs">Structures</span>
          </Link>
          <Link href="/appointments" className="flex flex-col items-center py-2 flex-1">
            <Calendar className="w-6 h-6 text-gray-500" />
            <span className="text-xs">Rendez-vous</span>
          </Link>
          <Link href="/chat" className="flex flex-col items-center py-2 flex-1">
            <MessageCircle className="w-6 h-6 text-gray-500" />
            <span className="text-xs">Assistance</span>
          </Link>
        </div>
      </nav>

      {/* Chatbot Component */}
      <ChatBot />
    </div>
  )
}
