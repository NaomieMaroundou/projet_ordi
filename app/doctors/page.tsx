import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Star, Filter, Search, ArrowLeft, Video } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ChatBot } from "@/components/chat-bot"
import { Badge } from "@/components/ui/badge"

export default function DoctorsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container flex items-center p-4">
          <Link href="/" className="mr-3">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-bold">Nos Médecins</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container p-4">
        {/* Section héro avec vidéo de présentation */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl font-bold mb-6">Nos Médecins Spécialisés</h1>
                <p className="text-xl text-blue-100 mb-8">
                  Découvrez notre équipe de professionnels de santé qualifiés, disponibles pour vous accompagner dans
                  votre parcours de soins.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold">500+</div>
                    <div className="text-blue-200">Médecins</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">15</div>
                    <div className="text-blue-200">Spécialités</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">24/7</div>
                    <div className="text-blue-200">Disponibilité</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">4.8★</div>
                    <div className="text-blue-200">Note moyenne</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <video
                    className="w-full rounded-xl"
                    controls
                    poster="/images/doctors-team-presentation-poster.jpg"
                    preload="metadata"
                  >
                    <source src="/videos/doctors-presentation.mp4" type="video/mp4" />
                    <source src="/videos/doctors-presentation.webm" type="video/webm" />
                    Votre navigateur ne supporte pas la lecture vidéo.
                  </video>
                </div>
                {/* Éléments décoratifs */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Rechercher un médecin par nom ou spécialité..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <Filter className="w-5 h-5" />
          </Button>
        </div>

        {/* Filtres avec icônes de spécialités */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Button variant="outline" size="sm" className="rounded-full bg-transparent">
            <Image src="/images/all-specialties-icon.png" alt="Toutes" width={16} height={16} className="mr-2" />
            Tous
          </Button>
          <Button variant="outline" size="sm" className="rounded-full bg-blue-50 text-blue-600 border-blue-200">
            <Image src="/images/cardiology-icon.png" alt="Cardiologie" width={16} height={16} className="mr-2" />
            Cardiologie
          </Button>
          <Button variant="outline" size="sm" className="rounded-full bg-transparent">
            <Image src="/images/pediatrics-icon.png" alt="Pédiatrie" width={16} height={16} className="mr-2" />
            Pédiatrie
          </Button>
          <Button variant="outline" size="sm" className="rounded-full bg-transparent">
            <Image src="/images/neurology-icon.png" alt="Neurologie" width={16} height={16} className="mr-2" />
            Neurologie
          </Button>
          <Button variant="outline" size="sm" className="rounded-full bg-transparent">
            <Image src="/images/ophthalmology-icon.png" alt="Ophtalmologie" width={16} height={16} className="mr-2" />
            Ophtalmologie
          </Button>
          <Button variant="outline" size="sm" className="rounded-full bg-transparent">
            <Image src="/images/gynecology-icon.png" alt="Gynécologie" width={16} height={16} className="mr-2" />
            Gynécologie
          </Button>
        </div>

        {/* Doctors List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              id: 1,
              name: "Dr. Jean Moussavou",
              specialty: "Cardiologie",
              image: "/images/cardio-medecin-gab.png",
              location: "Hôpital Central de Libreville",
              rating: 4.9,
              reviews: 128,
              experience: 15,
              available: true,
            },
            {
              id: 2,
              name: "Dr. Marie Ndong",
              specialty: "Pédiatrie",
              image: "/images/doctor-female-1.png",
              location: "Centre Hospitalier de Franceville",
              rating: 4.8,
              reviews: 96,
              experience: 12,
              available: true,
            },
            {
              id: 3,
              name: "Dr. Pierre Obame",
              specialty: "Neurologie",
              image: "/images/doctor-male.png",
              location: "Hôpital Régional de Port-Gentil",
              rating: 4.7,
              reviews: 84,
              experience: 10,
              available: true,
            },
            {
              id: 4,
              name: "Dr. Sophie Mba",
              specialty: "Ophtalmologie",
              image: "/images/doctor-female-2.png",
              location: "Clinique El Rapha, Libreville",
              rating: 4.9,
              reviews: 112,
              experience: 14,
              available: false,
            },
            {
              id: 5,
              name: "Dr. Paul Nzeng",
              specialty: "Gynécologie",
              image: "/images/surgeons-team.png",
              location: "Centre Médical de Lambaréné",
              rating: 4.6,
              reviews: 76,
              experience: 8,
              available: true,
            },
            {
              id: 6,
              name: "Dr. Claire Oyono",
              specialty: "Dermatologie",
              image: "/images/medical-training.png",
              location: "Hôpital Central de Libreville",
              rating: 4.8,
              reviews: 92,
              experience: 11,
              available: true,
            },
          ].map((doctor) => (
            <Card key={doctor.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className="relative">
                <Image
                  src={doctor.image || "/placeholder.svg"}
                  alt={doctor.name}
                  width={400}
                  height={400}
                  className="w-full h-64 object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
                {!doctor.available && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    Indisponible
                  </div>
                )}
                {/* Badge de spécialité */}
                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
                  <Image
                    src={`/images/specialty-${doctor.specialty.toLowerCase().replace(/\s+/g, "-")}-icon.png`}
                    alt={doctor.specialty}
                    width={16}
                    height={16}
                    className="object-contain"
                  />
                  <span className="text-xs font-medium">{doctor.specialty}</span>
                </div>
                {/* Overlay avec informations rapides */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-sm">
                        {doctor.rating} ({doctor.reviews} avis)
                      </span>
                    </div>
                    <p className="text-sm opacity-90">{doctor.experience} ans d'expérience</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg">{doctor.name}</h3>
                    <p className="text-blue-600 text-sm">{doctor.specialty}</p>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">{doctor.rating}</span>
                    <span className="text-xs text-gray-500 ml-1">({doctor.reviews})</span>
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{doctor.location}</span>
                </div>

                <div className="text-sm text-gray-600 mb-3">{doctor.experience} ans d&apos;expérience</div>

                {/* Badges de services */}
                <div className="flex flex-wrap gap-1 mb-3">
                  <Badge variant="outline" className="text-xs">
                    <Video className="w-3 h-3 mr-1" />
                    Téléconsultation
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Calendar className="w-3 h-3 mr-1" />
                    Urgences
                  </Badge>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-blue-600 border-blue-600 bg-transparent"
                    asChild
                  >
                    <Link href={`/doctors/${doctor.id}`}>Profil</Link>
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    disabled={!doctor.available}
                    asChild
                  >
                    <Link href={`/appointments/new?doctor=${doctor.id}`}>
                      <Calendar className="w-4 h-4 mr-1" />
                      Rendez-vous
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Chatbot */}
      <ChatBot />
    </div>
  )
}
