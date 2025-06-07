"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Phone, Clock, Star, Route } from "lucide-react"
import Image from "next/image"

interface Location {
  lat: number
  lng: number
}

interface HealthFacility {
  id: number
  name: string
  type: string
  address: string
  city: string
  province: string
  coordinates: Location
  phone: string
  isOpen: boolean
  rating: number
  image: string
  services: string[]
  distance?: number
  estimatedTime?: string
}

export function GPSComponent() {
  const [userLocation, setUserLocation] = useState<Location | null>(null)
  const [nearbyFacilities, setNearbyFacilities] = useState<HealthFacility[]>([])
  const [selectedFacility, setSelectedFacility] = useState<HealthFacility | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const healthFacilities: HealthFacility[] = [
    {
      id: 1,
      name: "Centre Hospitalier Universitaire de Libreville",
      type: "Hôpital public",
      address: "Boulevard Omar Bongo",
      city: "Libreville",
      province: "Estuaire",
      coordinates: { lat: 0.3924, lng: 9.4536 },
      phone: "+241 77 12 34 56",
      isOpen: true,
      rating: 4.5,
      image: "/images/chu-libreville-entrance.png",
      services: ["Urgences 24/7", "Cardiologie", "Chirurgie", "Maternité"],
    },
    {
      id: 2,
      name: "Hôpital Egypto-Gabonais",
      type: "Hôpital public",
      address: "Quartier Nzeng-Ayong",
      city: "Libreville",
      province: "Estuaire",
      coordinates: { lat: 0.3833, lng: 9.45 },
      phone: "+241 77 98 76 54",
      isOpen: true,
      rating: 4.3,
      image: "/images/egypto-gab.png",
      services: ["Urgences", "Pédiatrie", "Maternité"],
    },
    {
      id: 3,
      name: "Hôpital Régional de Melen",
      type: "Hôpital public",
      address: "Melen",
      city: "Libreville",
      province: "Estuaire",
      coordinates: { lat: 0.4167, lng: 9.4667 },
      phone: "+241 74 56 78 90",
      isOpen: true,
      rating: 4.1,
      image: "/images/melen-gab.png",
      services: ["Urgences", "Médecine générale", "Maternité"],
    },
  ]

  // Calculer la distance entre deux points
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371 // Rayon de la Terre en km
    const dLat = (lat2 - lat1) * (Math.PI / 180)
    const dLng = (lng2 - lng1) * (Math.PI / 180)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  // Estimer le temps de trajet
  const estimateTime = (distance: number): string => {
    const avgSpeed = 30 // km/h en ville
    const timeInHours = distance / avgSpeed
    const timeInMinutes = Math.round(timeInHours * 60)
    return `${timeInMinutes} min`
  }

  // Obtenir la géolocalisation
  const getCurrentLocation = () => {
    setIsLoading(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setUserLocation(location)
          findNearbyFacilities(location)
          setIsLoading(false)
        },
        (error) => {
          console.error("Erreur de géolocalisation:", error)
          // Position par défaut (Libreville)
          const defaultLocation = { lat: 0.3924, lng: 9.4536 }
          setUserLocation(defaultLocation)
          findNearbyFacilities(defaultLocation)
          setIsLoading(false)
        },
      )
    }
  }

  // Trouver les structures à proximité
  const findNearbyFacilities = (location: Location) => {
    const facilitiesWithDistance = healthFacilities.map((facility) => {
      const distance = calculateDistance(location.lat, location.lng, facility.coordinates.lat, facility.coordinates.lng)
      return {
        ...facility,
        distance: distance,
        estimatedTime: estimateTime(distance),
      }
    })

    // Trier par distance
    facilitiesWithDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0))
    setNearbyFacilities(facilitiesWithDistance.slice(0, 5)) // Top 5 plus proches
  }

  // Obtenir l'itinéraire
  const getDirections = (facility: HealthFacility) => {
    if (userLocation) {
      const url = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${facility.coordinates.lat},${facility.coordinates.lng}`
      window.open(url, "_blank")
    }
  }

  useEffect(() => {
    getCurrentLocation()
  }, [])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="w-5 h-5 text-blue-600" />
            GPS - Structures de santé à proximité
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-600">
                {userLocation ? "Position actuelle détectée" : "Position non détectée"}
              </span>
            </div>
            <Button size="sm" onClick={getCurrentLocation} disabled={isLoading}>
              <Navigation className="w-4 h-4 mr-2" />
              {isLoading ? "Localisation..." : "Actualiser position"}
            </Button>
          </div>

          {userLocation && (
            <div className="bg-green-50 p-3 rounded-lg mb-4">
              <p className="text-sm text-green-800">
                📍 Votre position : {userLocation.lat.toFixed(4)}°N, {userLocation.lng.toFixed(4)}°E
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {nearbyFacilities.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Structures les plus proches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nearbyFacilities.map((facility) => (
                <div
                  key={facility.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedFacility?.id === facility.id ? "border-blue-500 bg-blue-50" : "hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedFacility(facility)}
                >
                  <div className="flex gap-4">
                    <Image
                      src={facility.image || "/placeholder.svg"}
                      alt={facility.name}
                      width={80}
                      height={60}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold">{facility.name}</h4>
                        <Badge className={facility.isOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                          {facility.isOpen ? "Ouvert" : "Fermé"}
                        </Badge>
                      </div>
                      <p className="text-sm text-blue-600 mb-1">{facility.type}</p>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span>
                          {facility.address}, {facility.city}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center">
                            <Route className="w-3 h-3 mr-1 text-green-600" />
                            <span className="text-sm font-medium text-green-600">
                              {facility.distance?.toFixed(1)} km
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1 text-blue-600" />
                            <span className="text-sm font-medium text-blue-600">{facility.estimatedTime}</span>
                          </div>
                          <div className="flex items-center">
                            <Star className="w-3 h-3 mr-1 text-yellow-500" />
                            <span className="text-sm font-medium">{facility.rating}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => getDirections(facility)}>
                            <Navigation className="w-3 h-3 mr-1" />
                            Itinéraire
                          </Button>
                          <Button size="sm" variant="outline">
                            <Phone className="w-3 h-3 mr-1" />
                            Appeler
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {selectedFacility && (
        <Card>
          <CardHeader>
            <CardTitle>Détails de la structure sélectionnée</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Image
                src={selectedFacility.image || "/placeholder.svg"}
                alt={selectedFacility.name}
                width={120}
                height={90}
                className="rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{selectedFacility.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{selectedFacility.type}</p>
                <div className="space-y-1 text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>
                      {selectedFacility.address}, {selectedFacility.city}, {selectedFacility.province}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>{selectedFacility.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Route className="w-4 h-4 mr-2" />
                    <span>Distance : {selectedFacility.distance?.toFixed(1)} km</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Temps estimé : {selectedFacility.estimatedTime}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {selectedFacility.services.map((service) => (
                    <Badge key={service} variant="outline" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => getDirections(selectedFacility)} className="bg-blue-600 hover:bg-blue-700">
                    <Navigation className="w-4 h-4 mr-2" />
                    Voir l'itinéraire
                  </Button>
                  <Button variant="outline">
                    <Phone className="w-4 h-4 mr-2" />
                    Appeler
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
