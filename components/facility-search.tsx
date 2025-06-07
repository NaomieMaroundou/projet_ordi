"use client"

import { Calendar } from "@/components/ui/calendar"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Search, Filter, Phone, Star } from "lucide-react"
import Image from "next/image"

interface Facility {
  id: number
  name: string
  type: string
  location: string
  city: string
  province: string
  coordinates: { lat: number; lng: number }
  distance?: number
  isOpen: boolean
  phone: string
  rating: number
  services: string[]
  image: string
}

export function FacilitySearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [facilities, setFacilities] = useState<Facility[]>([])
  const [filteredFacilities, setFilteredFacilities] = useState<Facility[]>([])
  const [selectedType, setSelectedType] = useState("all")

  const allFacilities: Facility[] = [
    // Libreville
    {
      id: 1,
      name: "Centre Hospitalier Universitaire de Libreville",
      type: "Hôpital public",
      location: "Boulevard Omar Bongo, Libreville",
      city: "Libreville",
      province: "Estuaire",
      coordinates: { lat: 0.3924, lng: 9.4536 },
      isOpen: true,
      phone: "+241 77 12 34 56",
      rating: 4.5,
      services: ["Urgences 24/7", "Cardiologie", "Chirurgie", "Maternité"],
      image: "/images/chu-libreville-entrance.png",
    },
    {
      id: 2,
      name: "Hôpital Egypto-Gabonais",
      type: "Hôpital public",
      location: "Quartier Nzeng-Ayong, Libreville",
      city: "Libreville",
      province: "Estuaire",
      coordinates: { lat: 0.3833, lng: 9.45 },
      isOpen: true,
      phone: "+241 77 98 76 54",
      rating: 4.3,
      services: ["Urgences", "Pédiatrie", "Maternité"],
      image: "/images/egypto-gab.png",
    },
    {
      id: 3,
      name: "Hôpital Régional de Melen",
      type: "Hôpital public",
      location: "Melen, Libreville",
      city: "Libreville",
      province: "Estuaire",
      coordinates: { lat: 0.4167, lng: 9.4667 },
      isOpen: true,
      phone: "+241 74 56 78 90",
      rating: 4.1,
      services: ["Urgences", "Médecine générale", "Maternité"],
      image: "/images/melen-gab.png",
    },

    // Mouila
    {
      id: 4,
      name: "Hôpital Régional de Mouila",
      type: "Hôpital public",
      location: "Centre-ville, Mouila",
      city: "Mouila",
      province: "Ngounié",
      coordinates: { lat: -1.8667, lng: 11.0556 },
      isOpen: true,
      phone: "+241 77 45 67 89",
      rating: 4.1,
      services: ["Médecine générale", "Maternité", "Pédiatrie", "Urgences"],
      image: "/images/chu-libreville-crowd.png",
    },
    {
      id: 5,
      name: "Centre de Santé de Mouila",
      type: "Centre de santé",
      location: "Quartier Administratif, Mouila",
      city: "Mouila",
      province: "Ngounié",
      coordinates: { lat: -1.87, lng: 11.06 },
      isOpen: true,
      phone: "+241 77 23 45 67",
      rating: 3.8,
      services: ["Consultations", "Soins infirmiers", "Pharmacie"],
      image: "/images/chu-libreville-sign.png",
    },

    // Moabi
    {
      id: 6,
      name: "Centre Médical de Moabi",
      type: "Centre de santé",
      location: "Quartier résidentiel, Moabi",
      city: "Moabi",
      province: "Ogooué-Maritime",
      coordinates: { lat: -1.5333, lng: 9.2167 },
      isOpen: true,
      phone: "+241 77 23 45 67",
      rating: 3.9,
      services: ["Consultations", "Soins infirmiers", "Pharmacie"],
      image: "/images/chu-libreville-sign.png",
    },
    {
      id: 7,
      name: "Dispensaire de Moabi",
      type: "Dispensaire",
      location: "Centre-ville, Moabi",
      city: "Moabi",
      province: "Ogooué-Maritime",
      coordinates: { lat: -1.53, lng: 9.22 },
      isOpen: true,
      phone: "+241 77 12 34 56",
      rating: 3.5,
      services: ["Soins de base", "Vaccinations", "Consultations"],
      image: "/images/hospital2.png",
    },

    // Autres villes...
    {
      id: 8,
      name: "Centre Hospitalier de Franceville",
      type: "Hôpital public",
      location: "Avenue du Président Bongo, Franceville",
      city: "Franceville",
      province: "Haut-Ogooué",
      coordinates: { lat: -1.6333, lng: 13.5833 },
      isOpen: true,
      phone: "+241 77 98 76 54",
      rating: 4.3,
      services: ["Médecine générale", "Pédiatrie", "Gynécologie"],
      image: "/images/chu-libreville-modern.png",
    },
  ]

  // Calculer la distance entre deux points
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371 // Rayon de la Terre en km
    const dLat = (lat2 - lat1) * (Math.PI / 180)
    const dLng = (lng2 - lng1) * (Math.PI / 180)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  // Obtenir la géolocalisation de l'utilisateur
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.log("Erreur de géolocalisation:", error)
          // Position par défaut (Libreville)
          setUserLocation({ lat: 0.3924, lng: 9.4536 })
        },
      )
    }
  }, [])

  // Calculer les distances et trier par proximité
  useEffect(() => {
    if (userLocation) {
      const facilitiesWithDistance = allFacilities.map((facility) => ({
        ...facility,
        distance: calculateDistance(
          userLocation.lat,
          userLocation.lng,
          facility.coordinates.lat,
          facility.coordinates.lng,
        ),
      }))

      facilitiesWithDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0))
      setFacilities(facilitiesWithDistance)
      setFilteredFacilities(facilitiesWithDistance)
    }
  }, [userLocation])

  // Filtrer les structures
  useEffect(() => {
    let filtered = facilities

    // Filtrer par recherche
    if (searchQuery) {
      filtered = filtered.filter(
        (facility) =>
          facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          facility.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          facility.province.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filtrer par type
    if (selectedType !== "all") {
      filtered = filtered.filter((facility) => facility.type.toLowerCase().includes(selectedType.toLowerCase()))
    }

    setFilteredFacilities(filtered)
  }, [searchQuery, selectedType, facilities])

  return (
    <div className="space-y-6">
      {/* Barre de recherche */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Trouvez une structure près de chez vous
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Rechercher par nom, ville ou province..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedType === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType("all")}
              >
                Tous
              </Button>
              <Button
                variant={selectedType === "hôpital" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType("hôpital")}
              >
                Hôpitaux
              </Button>
              <Button
                variant={selectedType === "clinique" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType("clinique")}
              >
                Cliniques
              </Button>
              <Button
                variant={selectedType === "pharmacie" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType("pharmacie")}
              >
                Pharmacies
              </Button>
              <Button
                variant={selectedType === "centre" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType("centre")}
              >
                Centres de santé
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Résultats */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {filteredFacilities.length} structure(s) trouvée(s)
            {userLocation && " près de vous"}
          </h3>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtres
          </Button>
        </div>

        {filteredFacilities.map((facility) => (
          <Card key={facility.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
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
                    <h4 className="font-bold text-lg">{facility.name}</h4>
                    <Badge className={facility.isOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                      {facility.isOpen ? "Ouvert" : "Fermé"}
                    </Badge>
                  </div>
                  <p className="text-blue-600 font-medium">{facility.type}</p>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{facility.location}</span>
                    {facility.distance && (
                      <span className="ml-2 text-green-600 font-medium">• {facility.distance.toFixed(1)} km</span>
                    )}
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
                          star <= Math.floor(facility.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
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
                <div className="flex flex-col gap-2">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Calendar className="w-3 h-3 mr-1" />
                    Rendez-vous
                  </Button>
                  <Button size="sm" variant="outline">
                    <Navigation className="w-3 h-3 mr-1" />
                    Itinéraire
                  </Button>
                  <Button size="sm" variant="outline">
                    <Phone className="w-3 h-3 mr-1" />
                    Appeler
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFacilities.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Aucune structure trouvée</h3>
            <p className="text-gray-500">
              Essayez de modifier vos critères de recherche ou élargissez votre zone géographique.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
