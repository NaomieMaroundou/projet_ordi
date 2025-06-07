"use client"

import { Calendar } from "@/components/ui/calendar"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  Clock,
  MapPin,
  ArrowLeft,
  Search,
  CalendarIcon,
  Check,
  Star,
  Phone,
  CreditCard,
  FileText,
  AlertCircle,
  Video,
  Building,
  Navigation,
  MessageCircle,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { Bookmark, Share2, Heart, ThumbsUp, HelpCircle } from "lucide-react"

type Doctor = {
  id: number
  name: string
  specialty: string
  image: string
  location: string
  rating: number
  price: number
  available: boolean
  nextAvailable: string
  languages: string[]
  experience: number
  verified: boolean
}

type Facility = {
  id: number
  name: string
  type: string
  location: string
  province: string
  city: string
  image: string
  rating: number
  available: boolean
  services: string[]
  phone: string
  emergency: boolean
  coordinates: { lat: number; lng: number }
  openHours: string
  description: string
}

export default function NewAppointmentPage() {
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [appointmentType, setAppointmentType] = useState("in-person")
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProvince, setSelectedProvince] = useState("all")
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")
  const [reason, setReason] = useState("")
  const [notes, setNotes] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("on-site")
  const [documents, setDocuments] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [userLocation, setUserLocation] = useState("")

  // Redirection si non connecté
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login?redirect=/appointments/new")
    }
  }, [isAuthenticated, router])

  const provinces = [
    "Estuaire",
    "Haut-Ogooué",
    "Moyen-Ogooué",
    "Ngounié",
    "Nyanga",
    "Ogooué-Ivindo",
    "Ogooué-Lolo",
    "Ogooué-Maritime",
    "Woleu-Ntem",
  ]

  const specialties = [
    "Médecine générale",
    "Cardiologie",
    "Dermatologie",
    "Gynécologie",
    "Neurologie",
    "Ophtalmologie",
    "Orthopédie",
    "Pédiatrie",
    "Psychiatrie",
    "Radiologie",
    "Urologie",
  ]

  const doctors: Doctor[] = [
    {
      id: 1,
      name: "Dr. Jean Moussavou",
      specialty: "Cardiologie",
      image: "/images/doctor1.png",
      location: "Hôpital Central de Libreville - Estuaire",
      rating: 4.9,
      price: 25000,
      available: true,
      nextAvailable: "Aujourd'hui 14h30",
      languages: ["Français", "Fang"],
      experience: 15,
      verified: true,
    },
    {
      id: 2,
      name: "Dr. Marie Ndong",
      specialty: "Pédiatrie",
      image: "/images/doctor2.png",
      location: "Centre Hospitalier de Franceville - Haut-Ogooué",
      rating: 4.8,
      price: 20000,
      available: true,
      nextAvailable: "Demain 09h00",
      languages: ["Français", "Téké"],
      experience: 12,
      verified: true,
    },
    {
      id: 3,
      name: "Dr. Pierre Obame",
      specialty: "Neurologie",
      image: "/images/doctor3.png",
      location: "Hôpital Régional de Port-Gentil - Ogooué-Maritime",
      rating: 4.7,
      price: 30000,
      available: false,
      nextAvailable: "Lundi 10h00",
      languages: ["Français", "Myéné"],
      experience: 18,
      verified: true,
    },
  ]

  const facilities: Facility[] = [
    // Estuaire
    {
      id: 1,
      name: "Centre Hospitalier Universitaire de Libreville",
      type: "Hôpital public",
      location: "Boulevard Omar Bongo, Libreville",
      province: "Estuaire",
      city: "Libreville",
      image: "/images/chu-libreville-entrance.png",
      rating: 4.5,
      available: true,
      services: ["Urgences 24/7", "Cardiologie", "Chirurgie", "Maternité", "Pédiatrie", "Neurologie"],
      phone: "+241 77 12 34 56",
      emergency: true,
      coordinates: { lat: 0.3924, lng: 9.4536 },
      openHours: "24h/24",
      description:
        "Le plus grand centre hospitalier du Gabon avec des équipements modernes et une équipe médicale qualifiée.",
    },
    {
      id: 2,
      name: "Hôpital de la Coopération Egypto-Gabonaise",
      type: "Hôpital public",
      location: "Quartier Nzeng-Ayong, Libreville",
      province: "Estuaire",
      city: "Libreville",
      image: "/images/egypto-gab.png",
      rating: 4.3,
      available: true,
      services: ["Urgences", "Pédiatrie", "Maternité", "Chirurgie"],
      phone: "+241 77 98 76 54",
      emergency: true,
      coordinates: { lat: 0.3833, lng: 9.45 },
      openHours: "24h/24",
      description: "Hôpital de coopération offrant des soins spécialisés.",
    },
    {
      id: 3,
      name: "Hôpital Régional de l'Estuaire Melen",
      type: "Hôpital public",
      location: "Melen, Libreville",
      province: "Estuaire",
      city: "Libreville",
      image: "/images/melen-gab.png",
      rating: 4.1,
      available: true,
      services: ["Urgences", "Médecine générale", "Maternité"],
      phone: "+241 74 56 78 90",
      emergency: true,
      coordinates: { lat: 0.4167, lng: 9.4667 },
      openHours: "24h/24",
      description: "Hôpital régional en cours de modernisation.",
    },

    // Haut-Ogooué
    {
      id: 4,
      name: "Centre Hospitalier de Franceville",
      type: "Hôpital public",
      location: "Avenue du Président Bongo, Franceville",
      province: "Haut-Ogooué",
      city: "Franceville",
      image: "/images/chu-libreville-modern.png",
      rating: 4.3,
      available: true,
      services: ["Médecine générale", "Pédiatrie", "Gynécologie", "Chirurgie"],
      phone: "+241 77 98 76 54",
      emergency: false,
      coordinates: { lat: -1.6333, lng: 13.5833 },
      openHours: "08h00 - 18h00",
      description: "Centre hospitalier régional offrant des soins de qualité dans le Haut-Ogooué.",
    },

    // Ngounié
    {
      id: 5,
      name: "Hôpital Régional de Mouila",
      type: "Hôpital public",
      location: "Centre-ville, Mouila",
      province: "Ngounié",
      city: "Mouila",
      image: "/images/chu-libreville-crowd.png",
      rating: 4.1,
      available: true,
      services: ["Médecine générale", "Maternité", "Pédiatrie", "Urgences"],
      phone: "+241 77 45 67 89",
      emergency: true,
      coordinates: { lat: -1.8667, lng: 11.0556 },
      openHours: "24h/24",
      description: "Hôpital régional desservant la province de la Ngounié.",
    },

    // Ogooué-Maritime
    {
      id: 6,
      name: "Centre Médical de Moabi",
      type: "Centre de santé",
      location: "Quartier résidentiel, Moabi",
      province: "Ogooué-Maritime",
      city: "Moabi",
      image: "/images/chu-libreville-sign.png",
      rating: 3.9,
      available: true,
      services: ["Consultations", "Soins infirmiers", "Pharmacie"],
      phone: "+241 77 23 45 67",
      emergency: false,
      coordinates: { lat: -1.5333, lng: 9.2167 },
      openHours: "07h00 - 19h00",
      description: "Centre de santé communautaire offrant des soins de base.",
    },
    {
      id: 7,
      name: "Hôpital Régional de Port-Gentil",
      type: "Hôpital public",
      location: "Centre-ville, Port-Gentil",
      province: "Ogooué-Maritime",
      city: "Port-Gentil",
      image: "/images/hospital1.png",
      rating: 4.2,
      available: true,
      services: ["Urgences 24/7", "Cardiologie", "Chirurgie", "Maternité"],
      phone: "+241 77 34 56 78",
      emergency: true,
      coordinates: { lat: -0.7193, lng: 8.7815 },
      openHours: "24h/24",
      description: "Principal hôpital de la capitale économique.",
    },

    // Woleu-Ntem
    {
      id: 8,
      name: "Hôpital Régional d'Oyem",
      type: "Hôpital public",
      location: "Centre-ville, Oyem",
      province: "Woleu-Ntem",
      city: "Oyem",
      image: "/images/hospital2.png",
      rating: 4.0,
      available: true,
      services: ["Médecine générale", "Pédiatrie", "Maternité", "Urgences"],
      phone: "+241 77 56 78 90",
      emergency: true,
      coordinates: { lat: 1.5993, lng: 11.5793 },
      openHours: "24h/24",
      description: "Hôpital régional du nord du Gabon.",
    },

    // Moyen-Ogooué
    {
      id: 9,
      name: "Hôpital Albert Schweitzer de Lambaréné",
      type: "Hôpital privé",
      location: "Lambaréné",
      province: "Moyen-Ogooué",
      city: "Lambaréné",
      image: "/images/hospital3.png",
      rating: 4.6,
      available: true,
      services: ["Médecine générale", "Chirurgie", "Recherche médicale"],
      phone: "+241 77 67 89 01",
      emergency: false,
      coordinates: { lat: -0.7, lng: 10.2333 },
      openHours: "08h00 - 18h00",
      description: "Hôpital historique fondé par Albert Schweitzer.",
    },

    // Ogooué-Ivindo
    {
      id: 10,
      name: "Centre Hospitalier de Makokou",
      type: "Hôpital public",
      location: "Centre-ville, Makokou",
      province: "Ogooué-Ivindo",
      city: "Makokou",
      image: "/images/chu-libreville-modern.png",
      rating: 3.8,
      available: true,
      services: ["Médecine générale", "Maternité", "Urgences"],
      phone: "+241 77 78 90 12",
      emergency: true,
      coordinates: { lat: 0.5738, lng: 12.8644 },
      openHours: "24h/24",
      description: "Centre hospitalier de la province de l'Ogooué-Ivindo.",
    },

    // Ogooué-Lolo
    {
      id: 11,
      name: "Hôpital de Koulamoutou",
      type: "Hôpital public",
      location: "Centre-ville, Koulamoutou",
      province: "Ogooué-Lolo",
      city: "Koulamoutou",
      image: "/images/chu-libreville-crowd.png",
      rating: 3.9,
      available: true,
      services: ["Médecine générale", "Pédiatrie", "Maternité"],
      phone: "+241 77 89 01 23",
      emergency: false,
      coordinates: { lat: -1.1369, lng: 12.4631 },
      openHours: "08h00 - 18h00",
      description: "Hôpital régional de l'Ogooué-Lolo.",
    },

    // Nyanga
    {
      id: 12,
      name: "Hôpital Régional de Tchibanga",
      type: "Hôpital public",
      location: "Centre-ville, Tchibanga",
      province: "Nyanga",
      city: "Tchibanga",
      image: "/images/chu-libreville-sign.png",
      rating: 3.7,
      available: true,
      services: ["Médecine générale", "Maternité", "Urgences"],
      phone: "+241 77 90 12 34",
      emergency: true,
      coordinates: { lat: -2.85, lng: 11.0167 },
      openHours: "24h/24",
      description: "Hôpital régional de la province de la Nyanga.",
    },
  ]

  const availableDates = [
    { date: "2024-01-15", label: "Aujourd'hui", available: true },
    { date: "2024-01-16", label: "Demain", available: true },
    { date: "2024-01-17", label: "Mercredi 17", available: true },
    { date: "2024-01-18", label: "Jeudi 18", available: false },
    { date: "2024-01-19", label: "Vendredi 19", available: true },
  ]

  const availableTimes = [
    { time: "08:00", available: true, price: 25000 },
    { time: "08:30", available: false, price: 25000 },
    { time: "09:00", available: true, price: 25000 },
    { time: "09:30", available: true, price: 25000 },
    { time: "10:00", available: false, price: 25000 },
    { time: "10:30", available: true, price: 25000 },
    { time: "14:00", available: true, price: 30000 },
    { time: "14:30", available: true, price: 30000 },
    { time: "15:00", available: true, price: 30000 },
    { time: "15:30", available: false, price: 30000 },
    { time: "16:00", available: true, price: 30000 },
  ]

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesProvince = selectedProvince === "all" || doctor.location.includes(selectedProvince)
    const matchesSpecialty = selectedSpecialty === "all" || doctor.specialty === selectedSpecialty
    return matchesSearch && matchesProvince && matchesSpecialty
  })

  const filteredFacilities = facilities.filter((facility) => {
    const matchesSearch =
      facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      facility.type.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesProvince = selectedProvince === "all" || facility.location.includes(selectedProvince)
    return matchesSearch && matchesProvince
  })

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulation de l'envoi
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Envoi d'email de confirmation automatique
    console.log("Email de confirmation envoyé à:", user?.email)

    setIsLoading(false)
    setStep(6) // Étape de confirmation
  }

  if (!isAuthenticated) {
    return null // Le useEffect redirigera
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm border-b">
        <div className="container flex items-center p-4">
          <Link href="/appointments" className="mr-3 hover:bg-gray-100 p-2 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-lg font-bold">Nouveau rendez-vous</h1>
            <p className="text-sm text-gray-500">Étape {step} sur 5</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container p-4 max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    step >= i
                      ? "bg-blue-600 text-white shadow-lg"
                      : step === i
                        ? "bg-blue-100 text-blue-600 border-2 border-blue-600"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step > i ? <Check className="w-5 h-5" /> : i}
                </div>
                {i < 5 && (
                  <div className={`h-1 w-full mx-2 transition-all ${step > i ? "bg-blue-600" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3 text-xs text-gray-500">
            <span>Type</span>
            <span>Praticien</span>
            <span>Créneaux</span>
            <span>Infos</span>
            <span>Confirmation</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Localisation de l'utilisateur */}
          {step === 1 && (
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  Où vous trouvez-vous ?
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="userLocation" className="text-base font-medium">
                      Votre localisation actuelle *
                    </Label>
                    <div className="mt-2 space-y-4">
                      <Input
                        id="userLocation"
                        value={userLocation}
                        onChange={(e) => setUserLocation(e.target.value)}
                        placeholder="Ex: Libreville, Franceville, Mouila, Moabi..."
                        className="text-lg p-4"
                        required
                      />

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {[
                          "Libreville",
                          "Port-Gentil",
                          "Franceville",
                          "Oyem",
                          "Mouila",
                          "Lambaréné",
                          "Moabi",
                          "Tchibanga",
                          "Makokou",
                        ].map((city) => (
                          <Button
                            key={city}
                            type="button"
                            variant="outline"
                            onClick={() => setUserLocation(city)}
                            className="h-12 text-left justify-start"
                          >
                            <MapPin className="w-4 h-4 mr-2" />
                            {city}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-medium">Type de consultation</Label>
                    <RadioGroup value={appointmentType} onValueChange={setAppointmentType} className="mt-3">
                      <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                        <RadioGroupItem value="in-person" id="in-person" />
                        <Label htmlFor="in-person" className="flex items-center cursor-pointer flex-1">
                          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                            <Building className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-lg">Consultation en personne</p>
                            <p className="text-gray-600">Rendez-vous dans une structure de santé</p>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-green-300 transition-colors">
                        <RadioGroupItem value="video" id="video" />
                        <Label htmlFor="video" className="flex items-center cursor-pointer flex-1">
                          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                            <Video className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-lg">Téléconsultation</p>
                            <p className="text-gray-600">Consultation vidéo à distance</p>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <Button
                    type="button"
                    className="bg-blue-600 hover:bg-blue-700 px-8 py-3"
                    onClick={nextStep}
                    disabled={!userLocation}
                  >
                    Continuer
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Choix du praticien/établissement */}
          {step === 2 && (
            <div className="space-y-6">
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
                  <CardTitle>
                    {appointmentType === "in-person"
                      ? "Choisissez un médecin ou un établissement"
                      : "Choisissez un médecin pour la téléconsultation"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {/* Filtres de recherche */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Rechercher un médecin..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>

                    <Select value={selectedProvince} onValueChange={setSelectedProvince}>
                      <SelectTrigger>
                        <SelectValue placeholder="Province" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Toutes les provinces</SelectItem>
                        {provinces.map((province) => (
                          <SelectItem key={province} value={province}>
                            {province}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                      <SelectTrigger>
                        <SelectValue placeholder="Spécialité" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Toutes les spécialités</SelectItem>
                        {specialties.map((specialty) => (
                          <SelectItem key={specialty} value={specialty}>
                            {specialty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Tabs defaultValue="doctor">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="doctor">Par médecin ({filteredDoctors.length})</TabsTrigger>
                      {appointmentType === "in-person" && (
                        <TabsTrigger value="facility">Par établissement ({filteredFacilities.length})</TabsTrigger>
                      )}
                    </TabsList>

                    <TabsContent value="doctor">
                      <div className="space-y-4">
                        {filteredDoctors.map((doctor) => (
                          <Card
                            key={doctor.id}
                            className={`cursor-pointer transition-all hover:shadow-md ${
                              selectedDoctor?.id === doctor.id ? "border-2 border-blue-600 bg-blue-50" : ""
                            }`}
                            onClick={() => setSelectedDoctor(doctor)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center gap-4">
                                <div className="relative">
                                  <Image
                                    src={doctor.image || "/placeholder.svg"}
                                    alt={doctor.name}
                                    width={80}
                                    height={80}
                                    className="rounded-full object-cover border-2 border-gray-200"
                                  />
                                  {doctor.verified && (
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                                      <Check className="w-4 h-4 text-white" />
                                    </div>
                                  )}
                                </div>

                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-bold text-lg">{doctor.name}</h3>
                                    {doctor.verified && <Badge className="bg-blue-600">Vérifié</Badge>}
                                  </div>
                                  <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                                  <div className="flex items-center text-sm text-gray-600 mt-1">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    <span>{doctor.location}</span>
                                  </div>
                                  <div className="flex items-center gap-4 mt-2">
                                    <div className="flex items-center">
                                      {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                          key={star}
                                          className={`w-4 h-4 ${
                                            star <= Math.floor(doctor.rating)
                                              ? "text-yellow-400 fill-current"
                                              : "text-gray-300"
                                          }`}
                                        />
                                      ))}
                                      <span className="ml-1 text-sm font-medium">{doctor.rating}</span>
                                    </div>
                                    <Badge variant="outline">{doctor.experience} ans d'expérience</Badge>
                                  </div>
                                  <div className="flex items-center gap-2 mt-2">
                                    {doctor.languages.map((lang) => (
                                      <Badge key={lang} variant="secondary" className="text-xs">
                                        {lang}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>

                                <div className="text-right">
                                  <div className="text-2xl font-bold text-green-600">
                                    {doctor.price.toLocaleString()} FCFA
                                  </div>
                                  <div className={`text-sm ${doctor.available ? "text-green-600" : "text-orange-600"}`}>
                                    {doctor.available ? "Disponible" : "Occupé"}
                                  </div>
                                  <div className="text-xs text-gray-500 mt-1">Prochain: {doctor.nextAvailable}</div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    {appointmentType === "in-person" && (
                      <TabsContent value="facility">
                        <div className="space-y-4">
                          {filteredFacilities.map((facility) => (
                            <Card
                              key={facility.id}
                              className={`cursor-pointer transition-all hover:shadow-md ${
                                selectedFacility?.id === facility.id ? "border-2 border-blue-600 bg-blue-50" : ""
                              }`}
                              onClick={() => setSelectedFacility(facility)}
                            >
                              <CardContent className="p-4">
                                <div className="flex gap-4">
                                  <Image
                                    src={facility.image || "/placeholder.svg"}
                                    alt={facility.name}
                                    width={120}
                                    height={80}
                                    className="rounded-lg object-cover"
                                  />
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h3 className="font-bold text-lg">{facility.name}</h3>
                                      {facility.emergency && <Badge className="bg-red-600">Urgences 24/7</Badge>}
                                    </div>
                                    <p className="text-blue-600 font-medium">{facility.type}</p>
                                    <div className="flex items-center text-sm text-gray-600 mt-1">
                                      <MapPin className="w-4 h-4 mr-1" />
                                      <span>{facility.location}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600 mt-1">
                                      <Phone className="w-4 h-4 mr-1" />
                                      <span>{facility.phone}</span>
                                    </div>
                                    <div className="flex items-center mt-2">
                                      {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                          key={star}
                                          className={`w-4 h-4 ${
                                            star <= Math.floor(facility.rating)
                                              ? "text-yellow-400 fill-current"
                                              : "text-gray-300"
                                          }`}
                                        />
                                      ))}
                                      <span className="ml-1 text-sm font-medium">{facility.rating}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                      {facility.services.slice(0, 3).map((service) => (
                                        <Badge key={service} variant="outline" className="text-xs">
                                          {service}
                                        </Badge>
                                      ))}
                                      {facility.services.length > 3 && (
                                        <Badge variant="outline" className="text-xs">
                                          +{facility.services.length - 3} autres
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div
                                      className={`text-sm font-medium ${
                                        facility.available ? "text-green-600" : "text-red-600"
                                      }`}
                                    >
                                      {facility.available ? "Ouvert" : "Fermé"}
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>
                    )}
                  </Tabs>

                  {/* Affichage spécial pour Hôpital Central de Libreville */}
                  {selectedFacility?.id === 1 && (
                    <Card className="mt-6 border-2 border-blue-600">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-4">Centre Hospitalier Universitaire de Libreville</h3>

                        {/* Images de la structure */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          <div className="relative h-48">
                            <Image
                              src="/images/chu-libreville-entrance.png"
                              alt="Entrée principale du CHU"
                              fill
                              className="object-cover rounded-lg"
                            />
                            <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                              Entrée principale
                            </div>
                          </div>
                          <div className="relative h-48">
                            <Image
                              src="/images/chu-libreville-modern.png"
                              alt="Bâtiment moderne du CHU"
                              fill
                              className="object-cover rounded-lg"
                            />
                            <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                              Bâtiment moderne
                            </div>
                          </div>
                          <div className="relative h-48">
                            <Image
                              src="/images/chu-libreville-crowd.png"
                              alt="Personnel médical du CHU"
                              fill
                              className="object-cover rounded-lg"
                            />
                            <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                              Équipe médicale
                            </div>
                          </div>
                        </div>

                        {/* GPS et localisation */}
                        <div className="bg-blue-50 p-4 rounded-lg mb-4">
                          <h4 className="font-semibold mb-2 flex items-center">
                            <Navigation className="w-4 h-4 mr-2" />
                            Nous retrouver
                          </h4>
                          <p className="text-sm text-gray-600 mb-3">
                            Coordonnées GPS: {selectedFacility.coordinates.lat}°N, {selectedFacility.coordinates.lng}°E
                          </p>
                          <div className="flex gap-2">
                            <Button size="sm" className="bg-blue-600">
                              <Navigation className="w-4 h-4 mr-1" />
                              Ouvrir dans Maps
                            </Button>
                            <Button variant="outline" size="sm">
                              <Share2 className="w-4 h-4 mr-1" />
                              Partager
                            </Button>
                          </div>
                        </div>

                        {/* Système de notation */}
                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                          <h4 className="font-semibold mb-3">Évaluez cette structure</h4>
                          <div className="flex items-center gap-2 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                onClick={() => {
                                  console.log(`Note donnée: ${star} étoiles`)
                                  // Logique de sauvegarde de la note
                                }}
                                className="focus:outline-none hover:scale-110 transition-transform"
                              >
                                <Star className="w-6 h-6 text-yellow-400 hover:text-yellow-500 fill-current" />
                              </button>
                            ))}
                          </div>
                          <p className="text-sm text-gray-600">Cliquez sur les étoiles pour noter</p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                          <Button className="flex-1 bg-green-600 hover:bg-green-700">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Envoyer un message
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <Bookmark className="w-4 h-4 mr-2" />
                            Enregistrer
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <Share2 className="w-4 h-4 mr-2" />
                            Partager
                          </Button>
                        </div>

                        {/* Section commentaires */}
                        <div className="mt-6 border-t pt-4">
                          <h4 className="font-semibold mb-3">Commentaires et avis</h4>
                          <div className="space-y-3">
                            {[
                              {
                                name: "Marie K.",
                                comment: "Excellent service, personnel très professionnel",
                                rating: 5,
                              },
                              {
                                name: "Jean P.",
                                comment: "Bonne prise en charge mais temps d'attente long",
                                rating: 4,
                              },
                            ].map((review, index) => (
                              <div key={index} className="bg-white p-3 rounded border">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-medium">{review.name}</span>
                                  <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star
                                        key={star}
                                        className={`w-4 h-4 ${star <= review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                      />
                                    ))}
                                  </div>
                                </div>
                                <p className="text-sm text-gray-600">{review.comment}</p>
                              </div>
                            ))}
                          </div>

                          <div className="mt-4 flex gap-2">
                            <Button variant="outline" size="sm">
                              <Heart className="w-4 h-4 mr-1" />
                              S'abonner
                            </Button>
                            <Button variant="outline" size="sm">
                              <ThumbsUp className="w-4 h-4 mr-1" />
                              Liker
                            </Button>
                            <Button variant="outline" size="sm">
                              <MessageCircle className="w-4 h-4 mr-1" />
                              Commenter
                            </Button>
                            <Button variant="outline" size="sm">
                              <HelpCircle className="w-4 h-4 mr-1" />
                              Poser une question
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={prevStep} className="px-8">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour
                </Button>
                <Button
                  type="button"
                  className="bg-blue-600 hover:bg-blue-700 px-8"
                  onClick={nextStep}
                  disabled={!selectedDoctor && !selectedFacility}
                >
                  Continuer
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Créneaux disponibles */}
          {step === 3 && (
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-purple-600" />
                  Choisissez votre créneau
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Sélection de date */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Date du rendez-vous</h3>
                    <div className="space-y-2">
                      {availableDates.map((dateOption) => (
                        <button
                          key={dateOption.date}
                          type="button"
                          disabled={!dateOption.available}
                          className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                            selectedDate === dateOption.date
                              ? "border-blue-600 bg-blue-50"
                              : dateOption.available
                                ? "border-gray-200 hover:border-blue-300"
                                : "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
                          }`}
                          onClick={() => dateOption.available && setSelectedDate(dateOption.date)}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{dateOption.label}</p>
                              <p className="text-sm text-gray-500">{dateOption.date}</p>
                            </div>
                            {!dateOption.available && (
                              <Badge variant="secondary" className="bg-gray-200">
                                Complet
                              </Badge>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sélection d'heure */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Heure du rendez-vous</h3>
                    {selectedDate ? (
                      <div className="grid grid-cols-2 gap-2">
                        {availableTimes.map((timeOption) => (
                          <button
                            key={timeOption.time}
                            type="button"
                            disabled={!timeOption.available}
                            className={`p-3 text-center rounded-lg border-2 transition-all ${
                              selectedTime === timeOption.time
                                ? "border-blue-600 bg-blue-50"
                                : timeOption.available
                                  ? "border-gray-200 hover:border-blue-300"
                                  : "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
                            }`}
                            onClick={() => timeOption.available && setSelectedTime(timeOption.time)}
                          >
                            <div className="flex flex-col items-center">
                              <Clock className="w-4 h-4 mb-1" />
                              <span className="font-medium">{timeOption.time}</span>
                              <span className="text-xs text-gray-500">{timeOption.price.toLocaleString()} FCFA</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <CalendarIcon className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                        <p>Sélectionnez d'abord une date</p>
                      </div>
                    )}
                  </div>
                </div>

                {selectedDate && selectedTime && (
                  <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Récapitulatif de votre créneau</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Date:</span>
                        <span className="ml-2 font-medium">{selectedDate}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Heure:</span>
                        <span className="ml-2 font-medium">{selectedTime}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Médecin:</span>
                        <span className="ml-2 font-medium">{selectedDoctor?.name}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Prix:</span>
                        <span className="ml-2 font-medium text-green-600">
                          {availableTimes.find((t) => t.time === selectedTime)?.price.toLocaleString()} FCFA
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-8 flex justify-between">
                  <Button type="button" variant="outline" onClick={prevStep} className="px-8">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour
                  </Button>
                  <Button
                    type="button"
                    className="bg-blue-600 hover:bg-blue-700 px-8"
                    onClick={nextStep}
                    disabled={!selectedDate || !selectedTime}
                  >
                    Continuer
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Informations et documents */}
          {step === 4 && (
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-orange-600" />
                  Informations complémentaires
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Informations personnelles */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Vos informations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nom complet *</Label>
                        <Input id="name" defaultValue={user?.name} className="mt-1" required />
                      </div>
                      <div>
                        <Label htmlFor="phone">Téléphone *</Label>
                        <Input id="phone" defaultValue={user?.phone} className="mt-1" required />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input id="email" type="email" defaultValue={user?.email} className="mt-1" required />
                      </div>
                      <div>
                        <Label htmlFor="age">Âge</Label>
                        <Input id="age" type="number" className="mt-1" />
                      </div>
                    </div>
                  </div>

                  {/* Documents requis */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Documents requis</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="carte-identite"
                          checked={documents.includes("carte-identite")}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setDocuments([...documents, "carte-identite"])
                            } else {
                              setDocuments(documents.filter((doc) => doc !== "carte-identite"))
                            }
                          }}
                        />
                        <Label htmlFor="carte-identite">Carte d'identité ou passeport</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="carte-vitale"
                          checked={documents.includes("carte-vitale")}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setDocuments([...documents, "carte-vitale"])
                            } else {
                              setDocuments(documents.filter((doc) => doc !== "carte-vitale"))
                            }
                          }}
                        />
                        <Label htmlFor="carte-vitale">Carte d'assurance maladie (si applicable)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="ordonnances"
                          checked={documents.includes("ordonnances")}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setDocuments([...documents, "ordonnances"])
                            } else {
                              setDocuments(documents.filter((doc) => doc !== "ordonnances"))
                            }
                          }}
                        />
                        <Label htmlFor="ordonnances">Ordonnances précédentes ou résultats d'examens</Label>
                      </div>
                    </div>
                  </div>

                  {/* Mode de paiement */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Mode de paiement</h3>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 border rounded-lg">
                        <RadioGroupItem value="on-site" id="on-site" />
                        <Label htmlFor="on-site" className="flex items-center cursor-pointer flex-1">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                            <CreditCard className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">Paiement sur place</p>
                            <p className="text-sm text-gray-500">Espèces ou carte bancaire</p>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-3 border rounded-lg">
                        <RadioGroupItem value="online" id="online" />
                        <Label htmlFor="online" className="flex items-center cursor-pointer flex-1">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <Phone className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">Paiement mobile</p>
                            <p className="text-sm text-gray-500">Airtel Money, Moov Money</p>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Informations importantes */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-800">Informations importantes</h4>
                        <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                          <li>• Arrivez 15 minutes avant votre rendez-vous</li>
                          <li>• Apportez tous les documents cochés ci-dessus</li>
                          <li>• En cas d'empêchement, prévenez au moins 2h à l'avance</li>
                          <li>• Un SMS de rappel vous sera envoyé 24h avant</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <Button type="button" variant="outline" onClick={prevStep} className="px-8">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour
                  </Button>
                  <Button
                    type="button"
                    className="bg-blue-600 hover:bg-blue-700 px-8"
                    onClick={nextStep}
                    disabled={documents.length === 0}
                  >
                    Continuer
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 5: Confirmation finale */}
          {step === 5 && (
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
                <CardTitle className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  Confirmez votre rendez-vous
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Récapitulatif complet */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-4">Récapitulatif de votre rendez-vous</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div>
                          <span className="text-gray-600 text-sm">Type de consultation:</span>
                          <p className="font-medium">
                            {appointmentType === "in-person" ? "Consultation en personne" : "Téléconsultation"}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600 text-sm">Médecin:</span>
                          <p className="font-medium">{selectedDoctor?.name}</p>
                          <p className="text-sm text-blue-600">{selectedDoctor?.specialty}</p>
                        </div>
                        <div>
                          <span className="text-gray-600 text-sm">Lieu:</span>
                          <p className="font-medium">{selectedDoctor?.location}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <span className="text-gray-600 text-sm">Date et heure:</span>
                          <p className="font-medium">
                            {selectedDate} à {selectedTime}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600 text-sm">Raison:</span>
                          <p className="font-medium">{reason}</p>
                        </div>
                        <div>
                          <span className="text-gray-600 text-sm">Prix:</span>
                          <p className="font-medium text-green-600 text-xl">
                            {availableTimes.find((t) => t.time === selectedTime)?.price.toLocaleString()} FCFA
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Conditions d'utilisation */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox id="terms" required />
                      <Label htmlFor="terms" className="text-sm leading-relaxed">
                        J'accepte les{" "}
                        <Link href="/terms" className="text-blue-600 hover:underline">
                          conditions générales d'utilisation
                        </Link>{" "}
                        et la{" "}
                        <Link href="/privacy" className="text-blue-600 hover:underline">
                          politique de confidentialité
                        </Link>
                      </Label>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Checkbox id="data-sharing" />
                      <Label htmlFor="data-sharing" className="text-sm leading-relaxed">
                        J'autorise le partage de mes données médicales avec le professionnel de santé consulté
                      </Label>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Checkbox id="reminders" defaultChecked />
                      <Label htmlFor="reminders" className="text-sm leading-relaxed">
                        Je souhaite recevoir des rappels par SMS et email
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <Button type="button" variant="outline" onClick={prevStep} className="px-8">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour
                  </Button>
                  <Button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 px-8 py-3 text-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Confirmation en cours...
                      </>
                    ) : (
                      <>
                        <Check className="w-5 h-5 mr-2" />
                        Confirmer le rendez-vous
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 6: Succès */}
          {step === 6 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-green-800">Rendez-vous confirmé !</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Votre rendez-vous a été programmé avec succès pour le {selectedDate} à {selectedTime}.
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-md mx-auto mb-8">
                <h3 className="font-semibold text-green-800 mb-3">Prochaines étapes</h3>
                <ul className="text-sm text-green-700 space-y-2 text-left">
                  <li>✅ Email de confirmation envoyé</li>
                  <li>✅ SMS de rappel programmé</li>
                  <li>✅ Rendez-vous ajouté à votre agenda</li>
                  <li>✅ Instructions d'accès envoyées</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" className="border-green-600 text-green-600" asChild>
                  <Link href="/appointments">
                    <Calendar className="w-4 h-4 mr-2" />
                    Voir mes rendez-vous
                  </Link>
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                  <Link href="/">Retour à l'accueil</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/appointments/new">Nouveau rendez-vous</Link>
                </Button>
              </div>
            </div>
          )}
        </form>
      </main>
    </div>
  )
}
