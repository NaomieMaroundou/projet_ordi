import Link from "next/link"
import { ArrowLeft, MapPin, Search, Filter, Calendar, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export default function FacilitiesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fff5f8]">
      {/* Top Bar */}
      <div className="bg-blue-600 text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4 text-sm">
            <Link href="/contact" className="hover:underline flex items-center">
              <svg
                className="w-3 h-3 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              +241 77 12 34 56
            </Link>
            <Link href="/locations" className="hover:underline flex items-center">
              <MapPin className="w-3 h-3 mr-1" />
              Nos emplacements
            </Link>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/login" className="hover:underline flex items-center">
              <svg
                className="w-3 h-3 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Se connecter
            </Link>
            <Link href="/about" className="hover:underline flex items-center">
              <svg
                className="w-3 h-3 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              À propos
            </Link>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container flex items-center p-4">
          <Link href="/" className="mr-3">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-bold">Structures de Santé</h1>
          <Button variant="outline" size="sm" className="ml-auto bg-red-600 hover:bg-red-700 text-white border-0">
            URGENCE
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container p-4">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une structure..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <Filter className="w-5 h-5" />
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="mb-4">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="hospitals">Hôpitaux</TabsTrigger>
            <TabsTrigger value="clinics">Cliniques</TabsTrigger>
            <TabsTrigger value="pharmacies">Pharmacies</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <div className="space-y-3">
              {[
                {
                  name: "Hôpital Central de Libreville",
                  location: "Boulevard Omar Bongo, Libreville - Estuaire",
                  isOpen: true,
                  image: "/images/chu-libreville-entrance.png",
                },
                {
                  name: "Centre Hospitalier de Franceville",
                  location: "Avenue du Président Bongo, Franceville - Haut-Ogooué",
                  isOpen: true,
                  image: "/images/chu-libreville-modern.png",
                },
                {
                  name: "Hôpital Régional de Port-Gentil",
                  location: "Rue des Palmiers, Port-Gentil - Ogooué-Maritime",
                  isOpen: true,
                  image: "/images/hospital1.png",
                },
                {
                  name: "Centre Médical de Lambaréné",
                  location: "Avenue Albert Schweitzer, Lambaréné - Moyen-Ogooué",
                  isOpen: false,
                  image: "/images/hospital3.png",
                },
                {
                  name: "Hôpital Régional de Melen",
                  location: "Melen, Libreville - Estuaire",
                  isOpen: true,
                  image: "/images/melen-gab.png",
                },
              ].map((facility, index) => (
                <Link href={`/facility/${index + 1}`} key={index}>
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-3">
                      <div className="flex gap-3">
                        <Image
                          src={facility.image || "/placeholder.svg"}
                          alt={facility.name}
                          width={80}
                          height={80}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{facility.name}</h3>
                          <div className="flex items-center text-sm text-gray-500 mb-1">
                            <MapPin className="w-3 h-3 mr-1" />
                            <span>{facility.location}</span>
                          </div>
                          <div className={`text-sm ${facility.isOpen ? "text-green-600" : "text-red-600"} mb-1`}>
                            {facility.isOpen ? "Ouvert" : "Fermé"}
                          </div>
                          <div className="flex gap-2 mt-1">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs text-blue-600 border-blue-600 h-7 px-2"
                            >
                              En savoir plus
                            </Button>
                            <Button size="sm" className="text-xs bg-blue-600 hover:bg-blue-700 h-7 px-2">
                              Rendez-vous
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          {/* Autres onglets similaires... */}
        </Tabs>
      </main>

      {/* Map Button */}
      <div className="fixed bottom-20 right-4">
        <Button className="rounded-full px-4 py-2 bg-blue-600 hover:bg-blue-700 shadow-lg">
          <MapPin className="w-4 h-4 mr-2" />
          Voir la carte
        </Button>
      </div>

      {/* Bottom Navigation */}
      <nav className="md:hidden sticky bottom-0 bg-white border-t border-gray-200">
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

      {/* PAS DE FOOTER ICI */}
    </div>
  )
}
