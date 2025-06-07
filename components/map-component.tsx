"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Navigation, Phone, Clock, Locate } from "lucide-react"
import Image from "next/image"

// Définition des types pour les établissements de santé
type HealthFacility = {
  id: number
  name: string
  location: string
  coordinates: {
    lat: number
    lng: number
  }
  type: "hospital" | "clinic" | "pharmacy" | "laboratory"
  isOpen: boolean
  phone: string
  image: string // Required
}

// Liste des établissements de santé au Gabon
const healthFacilities: HealthFacility[] = [
  {
    id: 1,
    name: "Hôpital Central de Libreville",
    location: "Boulevard Omar Bongo, Libreville - Estuaire",
    coordinates: { lat: 0.3924, lng: 9.4536 },
    type: "hospital",
    isOpen: true,
    phone: "+241 77 12 34 56",
    image: "/hopital_central_libreville.jpeg",
  },
  {
    id: 2,
    name: "Centre Hospitalier de Franceville",
    location: "Avenue du Président Bongo, Franceville - Haut-Ogooué",
    coordinates: { lat: -1.6333, lng: 13.5833 },
    type: "hospital",
    isOpen: true,
    phone: "+241 77 98 76 54",
    image: "/ch_franceville.jpeg",
  },
  {
    id: 3,
    name: "Hôpital Régional de Port-Gentil",
    location: "Rue des Palmiers, Port-Gentil - Ogooué-Maritime",
    coordinates: { lat: -0.7193, lng: 8.7815 },
    type: "hospital",
    isOpen: true,
    phone: "+241 74 56 78 90",
    image: "/hopital_port_gentil.jpeg",
  },
  {
    id: 4,
    name: "Centre Médical de Lambaréné",
    location: "Avenue Albert Schweitzer, Lambaréné - Moyen-Ogooué",
    coordinates: { lat: -0.7001, lng: 10.2406 },
    type: "clinic",
    isOpen: false,
    phone: "+241 66 12 34 56",
    image: "/centre_medical_lambarene.jpeg",
  },
  {
    id: 5,
    name: "Clinique El Rapha",
    location: "Avenue de la Liberté, Libreville - Estuaire",
    coordinates: { lat: 0.3954, lng: 9.4673 },
    type: "clinic",
    isOpen: true,
    phone: "+241 65 43 21 09",
    image: "/clinique_el_rapha.jpeg",
  },
  {
    id: 6,
    name: "Pharmacie Centrale",
    location: "Avenue de la Liberté, Libreville - Estuaire",
    coordinates: { lat: 0.3914, lng: 9.4496 },
    type: "pharmacy",
    isOpen: true,
    phone: "+241 77 11 22 33",
    image: "/pharmacie_centrale.jpeg",
  },
  {
    id: 7,
    name: "Laboratoire d'Analyses Médicales",
    location: "Rue des Sciences, Libreville - Estuaire",
    coordinates: { lat: 0.3934, lng: 9.4556 },
    type: "laboratory",
    isOpen: true,
    phone: "+241 77 22 33 44",
    image: "/laboratoire_analyses.jpeg",
  },
]

export function MapComponent() {
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [selectedFacility, setSelectedFacility] = useState<HealthFacility | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number | null; lng: number | null }>({
    lat: null,
    lng: null,
  })

  useEffect(() => {
    // Obtenir la position de l'utilisateur
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.error("Erreur lors de la récupération de la géolocalisation :", error)
        },
      )
    } else {
      console.error("La géolocalisation n'est pas prise en charge par ce navigateur.")
    }
  }, [])

  // Filtrer les établissements par type
  const filteredFacilities =
    activeFilter === "all" ? healthFacilities : healthFacilities.filter((facility) => facility.type === activeFilter)

  // Obtenir l'itinéraire vers un établissement
  const getDirections = (facility: HealthFacility) => {
    // Ouvrir Google Maps dans un nouvel onglet avec l'itinéraire
    let url = ""
    if (userLocation.lat && userLocation.lng) {
      url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${facility.coordinates.lat},${facility.coordinates.lng}`
    } else {
      url = `https://www.google.com/maps/search/?api=1&query=${facility.coordinates.lat},${facility.coordinates.lng}`
    }
    window.open(url, "_blank")
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Trouvez une structure près de chez vous</h2>

      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          variant={activeFilter === "all" ? "default" : "outline"}
          size="sm"
          className="rounded-full"
          onClick={() => setActiveFilter("all")}
        >
          Tous
        </Button>
        <Button
          variant={activeFilter === "hospital" ? "default" : "outline"}
          size="sm"
          className="rounded-full"
          onClick={() => setActiveFilter("hospital")}
        >
          Hôpitaux
        </Button>
        <Button
          variant={activeFilter === "clinic" ? "default" : "outline"}
          size="sm"
          className="rounded-full"
          onClick={() => setActiveFilter("clinic")}
        >
          Cliniques
        </Button>
        <Button
          variant={activeFilter === "pharmacy" ? "default" : "outline"}
          size="sm"
          className="rounded-full"
          onClick={() => setActiveFilter("pharmacy")}
        >
          Pharmacies
        </Button>
        <Button
          variant={activeFilter === "laboratory" ? "default" : "outline"}
          size="sm"
          className="rounded-full"
          onClick={() => setActiveFilter("laboratory")}
        >
          Laboratoires
        </Button>
        {userLocation.lat && userLocation.lng && (
          <Button variant="outline" size="sm" className="rounded-full" disabled>
            <Locate className="w-4 h-4 mr-2" />
            Localisation activée
          </Button>
        )}
      </div>

      <div className="relative w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden mb-4">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-2" />
            <p className="text-gray-600 mb-4">Carte des établissements de santé au Gabon</p>
            <p className="text-sm text-gray-500 max-w-md mx-auto mb-4">
              Pour activer la carte interactive, vous devez obtenir une clé API Google Maps et l'ajouter à votre projet.
            </p>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() =>
                window.open("https://developers.google.com/maps/documentation/javascript/get-api-key", "_blank")
              }
            >
              Obtenir une clé API Google Maps
            </Button>
          </div>
        </div>
        <Image
          src="/placeholder.svg?height=400&width=800&text=Carte+du+Gabon"
          alt="Carte du Gabon"
          width={800}
          height={400}
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {filteredFacilities.map((facility) => (
          <Card
            key={facility.id}
            className={`hover:shadow-md transition-shadow cursor-pointer ${
              selectedFacility?.id === facility.id ? "border-2 border-blue-600" : ""
            }`}
            onClick={() => setSelectedFacility(facility)}
          >
            <CardContent className="p-4">
              <div className="flex">
                <div className="w-20 h-20 mr-4">
                  <Image
                    src={facility.image || "/placeholder.svg"}
                    alt={facility.name}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold">{facility.name}</h3>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>{facility.location}</span>
                  </div>
                  <div className="flex items-center text-sm mt-1">
                    <Phone className="w-3 h-3 mr-1 text-blue-600" />
                    <span>{facility.phone}</span>
                  </div>
                  <div className="flex items-center text-sm mt-1">
                    <Clock className="w-3 h-3 mr-1" />
                    <span className={facility.isOpen ? "text-green-600" : "text-red-600"}>
                      {facility.isOpen ? "Ouvert maintenant" : "Fermé"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedFacility && (
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{selectedFacility.name}</h3>
                <p className="text-sm text-gray-600">{selectedFacility.location}</p>
                <p className="text-sm mt-1">
                  <span className={selectedFacility.isOpen ? "text-green-600" : "text-red-600"}>
                    {selectedFacility.isOpen ? "Ouvert" : "Fermé"}
                  </span>
                </p>
                <p className="text-sm mt-1">{selectedFacility.phone}</p>
                <p className="text-sm mt-1">
                  Coordonnées GPS: {selectedFacility.coordinates.lat}° N, {selectedFacility.coordinates.lng}° E
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => getDirections(selectedFacility)}
              >
                <Navigation className="w-4 h-4" />
                Voir sur Google Maps
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="text-center text-sm text-gray-500 mt-4">
        <p>
          Pour intégrer une carte interactive complète, vous devez{" "}
          <a
            href="https://developers.google.com/maps/documentation/javascript/get-api-key"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            obtenir une clé API Google Maps
          </a>{" "}
          et l'ajouter à votre projet.
        </p>
      </div>
    </div>
  )
}
