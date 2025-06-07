import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Star, Filter, Search, ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ChatBot } from "@/components/chat-bot"

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

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Button variant="outline" size="sm" className="rounded-full">
            Tous
          </Button>
          <Button variant="outline" size="sm" className="rounded-full bg-blue-50 text-blue-600 border-blue-200">
            Cardiologie
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Pédiatrie
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Neurologie
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Ophtalmologie
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
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
            <Card key={doctor.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="relative">
                <Image
                  src={doctor.image || "/placeholder.svg"}
                  alt={doctor.name}
                  width={400}
                  height={400}
                  className="w-full h-64 object-cover object-top"
                />
                {!doctor.available && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    Indisponible
                  </div>
                )}
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

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 text-blue-600 border-blue-600" asChild>
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
