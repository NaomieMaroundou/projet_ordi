"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Search,
  MapPin,
  Star,
  Calendar,
  MessageCircle,
  Clock,
  X,
  History,
  TrendingUp,
  Filter,
} from "lucide-react"
import { InteractiveRating } from "@/components/interactive-rating"
import { useAuth } from "@/contexts/auth-context"

export default function RecherchePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const query = searchParams.get("q") || ""

  const [searchTerm, setSearchTerm] = useState(query)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState({
    structures: [] as any[],
    doctors: [] as any[],
    services: [] as any[],
  })

  // Charger l'historique de recherche
  useEffect(() => {
    if (isAuthenticated) {
      const history = localStorage.getItem("searchHistory")
      if (history) {
        setSearchHistory(JSON.parse(history))
      }
    }
  }, [isAuthenticated])

  // Sauvegarder la recherche dans l'historique
  const saveToHistory = (term: string) => {
    if (!isAuthenticated || !term.trim()) return

    const newHistory = [term, ...searchHistory.filter((h) => h !== term)].slice(0, 10)
    setSearchHistory(newHistory)
    localStorage.setItem("searchHistory", JSON.stringify(newHistory))
  }

  // Supprimer un élément de l'historique
  const removeFromHistory = (term: string) => {
    const newHistory = searchHistory.filter((h) => h !== term)
    setSearchHistory(newHistory)
    localStorage.setItem("searchHistory", JSON.stringify(newHistory))
  }

  // Effacer tout l'historique
  const clearHistory = () => {
    setSearchHistory([])
    localStorage.removeItem("searchHistory")
  }

  const handleSearch = (term: string) => {
    if (!term.trim()) return

    setIsLoading(true)
    saveToHistory(term)

    // Simulation de recherche
    setTimeout(() => {
      setResults({
        structures: [
          {
            id: 1,
            name: "Hôpital Central de Libreville",
            type: "Hôpital public",
            location: "Libreville, Estuaire",
            image: "/images/hospital1.png",
            rating: 4.5,
            reviews: 234,
            distance: "2.3 km",
            isOpen: true,
            services: ["Urgences 24/7", "Cardiologie", "Chirurgie"],
            phone: "+241 77 12 34 56",
          },
          {
            id: 2,
            name: "Clinique El Rapha",
            type: "Clinique privée",
            location: "Libreville, Estuaire",
            image: "/images/hospital2.png",
            rating: 4.7,
            reviews: 156,
            distance: "1.8 km",
            isOpen: true,
            services: ["Consultations", "Analyses", "Imagerie"],
            phone: "+241 65 43 21 09",
          },
        ],
        doctors: [
          {
            id: 1,
            name: "Dr. Jean Moussavou",
            specialty: "Cardiologie",
            image: "/images/doctor1.png",
            location: "Hôpital Central de Libreville",
            rating: 4.9,
            reviews: 89,
            nextAvailable: "Aujourd'hui 14h30",
            price: 25000,
          },
        ],
        services: [
          {
            id: 1,
            name: "Consultation cardiologique",
            description: "Examen complet du système cardiovasculaire",
            providers: 12,
            averagePrice: 25000,
          },
        ],
      })
      setIsLoading(false)
    }, 1000)
  }

  const popularSearches = [
    "Cardiologie Libreville",
    "Urgences Port-Gentil",
    "Pédiatre Franceville",
    "Pharmacie ouverte",
    "Téléconsultation",
    "Analyses médicales",
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm border-b">
        <div className="container flex items-center p-4">
          <Link href="/" className="mr-3 hover:bg-gray-100 p-2 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-lg font-bold">Recherche</h1>
            <p className="text-sm text-gray-500">Trouvez une structure près de chez vous</p>
          </div>
        </div>
      </header>

      {/* Barre de recherche principale */}
      <div className="bg-white border-b p-4">
        <div className="container max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="search"
              placeholder="Rechercher une structure, un médecin, un service..."
              className="pl-12 pr-4 py-3 text-lg rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch(searchTerm)}
            />
            <Button
              onClick={() => handleSearch(searchTerm)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 rounded-full px-6"
            >
              Rechercher
            </Button>
          </div>

          {/* Actions rapides */}
          <div className="flex items-center gap-4 mt-4">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Messagerie
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2" asChild>
              <Link href="/appointments/new">
                <Calendar className="w-4 h-4" />
                Prendre RDV
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filtres
            </Button>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <main className="flex-1 container p-4 max-w-6xl mx-auto">
        {!query && !isLoading && results.structures.length === 0 ? (
          /* Page d'accueil de recherche */
          <div className="space-y-8">
            {/* Carte de localisation */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
                  <h2 className="text-xl font-bold mb-2">Trouvez une structure près de chez vous</h2>
                  <p className="opacity-90">Localisez les hôpitaux, cliniques, pharmacies et laboratoires</p>
                </div>
                <div className="p-6">
                  <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Carte interactive des structures de santé</p>
                      <Button className="mt-4" variant="outline">
                        Activer la géolocalisation
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Historique de recherche */}
            {isAuthenticated && searchHistory.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <History className="w-5 h-5 text-gray-600" />
                      Recherches récentes
                    </h3>
                    <Button variant="ghost" size="sm" onClick={clearHistory}>
                      Effacer tout
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {searchHistory.map((term, index) => (
                      <div key={index} className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1">
                        <button
                          onClick={() => {
                            setSearchTerm(term)
                            handleSearch(term)
                          }}
                          className="text-sm hover:text-blue-600 transition-colors"
                        >
                          {term}
                        </button>
                        <button
                          onClick={() => removeFromHistory(term)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recherches populaires */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                  Recherches populaires
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {popularSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSearchTerm(search)
                        handleSearch(search)
                      }}
                      className="text-left p-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors border hover:border-blue-200"
                    >
                      <p className="font-medium text-sm">{search}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Structures recommandées */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Structures recommandées près de vous</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      name: "Hôpital Central de Libreville",
                      type: "Hôpital public",
                      distance: "2.3 km",
                      rating: 4.5,
                      image: "/images/hospital1.png",
                    },
                    {
                      name: "Clinique El Rapha",
                      type: "Clinique privée",
                      distance: "1.8 km",
                      rating: 4.7,
                      image: "/images/hospital2.png",
                    },
                  ].map((structure, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <Image
                        src={structure.image || "/placeholder.svg"}
                        alt={structure.name}
                        width={60}
                        height={60}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{structure.name}</h4>
                        <p className="text-sm text-gray-600">{structure.type}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm ml-1">{structure.rating}</span>
                          </div>
                          <span className="text-sm text-gray-500">• {structure.distance}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Résultats de recherche */
          <div className="space-y-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-600">Recherche en cours...</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Résultats pour "{query}"</h2>
                  <p className="text-gray-600">
                    {results.structures.length + results.doctors.length + results.services.length} résultats trouvés
                  </p>
                </div>

                {/* Structures */}
                {results.structures.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Structures de santé</h3>
                    <div className="space-y-4">
                      {results.structures.map((structure) => (
                        <Card key={structure.id} className="hover:shadow-lg transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex gap-4">
                              <Image
                                src={structure.image || "/placeholder.svg"}
                                alt={structure.name}
                                width={120}
                                height={80}
                                className="rounded-lg object-cover"
                              />
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <h4 className="font-bold text-lg">{structure.name}</h4>
                                    <p className="text-blue-600 font-medium">{structure.type}</p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Badge className={structure.isOpen ? "bg-green-500" : "bg-red-500"}>
                                      {structure.isOpen ? "Ouvert" : "Fermé"}
                                    </Badge>
                                  </div>
                                </div>

                                <div className="flex items-center text-sm text-gray-600 mb-2">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  <span>
                                    {structure.location} • {structure.distance}
                                  </span>
                                </div>

                                <div className="flex items-center gap-4 mb-3">
                                  <InteractiveRating initialRating={structure.rating} size="sm" />
                                  <span className="text-sm text-gray-600">({structure.reviews} avis)</span>
                                </div>

                                <div className="flex flex-wrap gap-1 mb-4">
                                  {structure.services.slice(0, 3).map((service: string) => (
                                    <Badge key={service} variant="outline" className="text-xs">
                                      {service}
                                    </Badge>
                                  ))}
                                </div>

                                <div className="flex items-center gap-3">
                                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700" asChild>
                                    <Link href={`/structures/${structure.id}`}>Voir détails</Link>
                                  </Button>
                                  <Button size="sm" variant="outline" asChild>
                                    <Link href={`/appointments/new?structure=${structure.id}`}>
                                      <Calendar className="w-4 h-4 mr-1" />
                                      Prendre RDV
                                    </Link>
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <MessageCircle className="w-4 h-4 mr-1" />
                                    Message
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Médecins */}
                {results.doctors.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Médecins</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {results.doctors.map((doctor) => (
                        <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                              <Image
                                src={doctor.image || "/placeholder.svg"}
                                alt={doctor.name}
                                width={60}
                                height={60}
                                className="rounded-full object-cover"
                              />
                              <div className="flex-1">
                                <h4 className="font-bold">{doctor.name}</h4>
                                <p className="text-blue-600 text-sm">{doctor.specialty}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <InteractiveRating initialRating={doctor.rating} size="sm" />
                                  <span className="text-xs text-gray-600">({doctor.reviews})</span>
                                </div>
                                <div className="flex items-center text-xs text-gray-600 mt-1">
                                  <Clock className="w-3 h-3 mr-1" />
                                  <span>{doctor.nextAvailable}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-green-600">{doctor.price.toLocaleString()} FCFA</p>
                                <Button size="sm" className="mt-2" asChild>
                                  <Link href={`/appointments/new?doctor=${doctor.id}`}>RDV</Link>
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
