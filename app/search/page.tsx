"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, MapPin, Star, Calendar, Filter, HeartPulse, Baby, Brain } from "lucide-react"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchTerm, setSearchTerm] = useState(query)
  const [activeTab, setActiveTab] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [results, setResults] = useState({
    doctors: [] as any[],
    facilities: [] as any[],
    services: [] as any[],
  })

  // Simuler une recherche
  useEffect(() => {
    if (query) {
      setIsLoading(true)
      // Dans une application réelle, nous ferions un appel API ici
      setTimeout(() => {
        // Données fictives pour la démonstration
        setResults({
          doctors: [
            {
              id: 1,
              name: "Dr. Jean Moussavou",
              specialty: "Cardiologie",
              image: "/images/doctor1.png",
              location: "Hôpital Central de Libreville",
              rating: 4.9,
            },
            {
              id: 2,
              name: "Dr. Marie Ndong",
              specialty: "Pédiatrie",
              image: "/images/doctor2.png",
              location: "Centre Hospitalier de Franceville",
              rating: 4.8,
            },
          ].filter(
            (doctor) =>
              doctor.name.toLowerCase().includes(query.toLowerCase()) ||
              doctor.specialty.toLowerCase().includes(query.toLowerCase()),
          ),
          facilities: [
            {
              id: 1,
              name: "Hôpital Central de Libreville",
              type: "Hôpital public",
              image: "/placeholder.svg?height=120&width=200&text=Hôpital",
              location: "Boulevard Omar Bongo, Libreville",
              rating: 4.5,
            },
            {
              id: 2,
              name: "Centre Hospitalier de Franceville",
              type: "Hôpital public",
              image: "/placeholder.svg?height=120&width=200&text=Centre+Hospitalier",
              location: "Avenue du Président Bongo, Franceville",
              rating: 4.3,
            },
            {
              id: 3,
              name: "Clinique El Rapha",
              type: "Clinique privée",
              image: "/placeholder.svg?height=120&width=200&text=Clinique",
              location: "Quartier Glass, Libreville",
              rating: 4.7,
            },
          ].filter(
            (facility) =>
              facility.name.toLowerCase().includes(query.toLowerCase()) ||
              facility.type.toLowerCase().includes(query.toLowerCase()),
          ),
          services: [
            {
              id: 1,
              name: "Cardiologie",
              description: "Diagnostic et traitement des maladies cardiaques",
              icon: "heart-pulse",
            },
            {
              id: 2,
              name: "Pédiatrie",
              description: "Soins médicaux pour les enfants et adolescents",
              icon: "baby",
            },
            {
              id: 3,
              name: "Neurologie",
              description: "Diagnostic et traitement des troubles du système nerveux",
              icon: "brain",
            },
          ].filter(
            (service) =>
              service.name.toLowerCase().includes(query.toLowerCase()) ||
              service.description.toLowerCase().includes(query.toLowerCase()),
          ),
        })
        setIsLoading(false)
      }, 1000)
    } else {
      setResults({ doctors: [], facilities: [], services: [] })
      setIsLoading(false)
    }
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Rediriger vers la même page avec le paramètre de recherche mis à jour
    window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`
  }

  const totalResults = results.doctors.length + results.facilities.length + results.services.length

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container flex items-center p-4">
          <Link href="/" className="mr-3">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-bold">Résultats de recherche</h1>
        </div>
      </header>

      {/* Search Bar */}
      <div className="bg-white border-b">
        <div className="container p-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Rechercher un médecin, un établissement, un service..."
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Rechercher
            </Button>
          </form>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container p-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Recherche en cours...</p>
          </div>
        ) : query ? (
          <>
            <div className="mb-4">
              <p className="text-gray-600">
                {totalResults} résultat{totalResults !== 1 ? "s" : ""} pour "{query}"
              </p>
            </div>

            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="all">Tous</TabsTrigger>
                <TabsTrigger value="doctors">Médecins</TabsTrigger>
                <TabsTrigger value="facilities">Établissements</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                {totalResults === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">Aucun résultat trouvé pour "{query}"</p>
                    <p className="text-gray-500 text-sm">
                      Essayez avec d'autres termes ou consultez nos suggestions ci-dessous
                    </p>
                  </div>
                ) : (
                  <>
                    {results.doctors.length > 0 && (
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-3">
                          <h2 className="text-lg font-bold">Médecins</h2>
                          {results.doctors.length > 2 && (
                            <Button
                              variant="link"
                              className="text-blue-600 p-0"
                              onClick={() => setActiveTab("doctors")}
                            >
                              Voir tout
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {results.doctors.slice(0, 2).map((doctor) => (
                            <Card key={doctor.id} className="hover:shadow-md transition-shadow">
                              <CardContent className="p-4">
                                <div className="flex items-center">
                                  <Image
                                    src={doctor.image || "/placeholder.svg?height=80&width=80&text=Dr"}
                                    alt={doctor.name}
                                    width={80}
                                    height={80}
                                    className="rounded-full object-cover mr-4"
                                  />
                                  <div className="flex-1">
                                    <h3 className="font-bold">{doctor.name}</h3>
                                    <p className="text-blue-600 text-sm">{doctor.specialty}</p>
                                    <div className="flex items-center text-sm text-gray-600 mt-1">
                                      <MapPin className="w-3 h-3 mr-1" />
                                      <span>{doctor.location}</span>
                                    </div>
                                    <div className="flex items-center mt-1">
                                      {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                          key={star}
                                          className={`w-3 h-3 ${
                                            star <= Math.floor(doctor.rating)
                                              ? "text-yellow-400 fill-current"
                                              : "text-gray-300"
                                          }`}
                                        />
                                      ))}
                                      <span className="ml-1 text-xs">{doctor.rating}</span>
                                    </div>
                                  </div>
                                  <Button className="bg-blue-600 hover:bg-blue-700" size="sm" asChild>
                                    <Link href={`/appointments/new?doctor=${doctor.id}`}>
                                      <Calendar className="w-4 h-4 mr-1" />
                                      RDV
                                    </Link>
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}

                    {results.facilities.length > 0 && (
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-3">
                          <h2 className="text-lg font-bold">Établissements</h2>
                          {results.facilities.length > 2 && (
                            <Button
                              variant="link"
                              className="text-blue-600 p-0"
                              onClick={() => setActiveTab("facilities")}
                            >
                              Voir tout
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {results.facilities.slice(0, 2).map((facility) => (
                            <Card key={facility.id} className="hover:shadow-md transition-shadow">
                              <CardContent className="p-4">
                                <div className="flex">
                                  <Image
                                    src={facility.image || "/placeholder.svg?height=80&width=120&text=Facility"}
                                    alt={facility.name}
                                    width={120}
                                    height={80}
                                    className="rounded-lg object-cover mr-4"
                                  />
                                  <div className="flex-1">
                                    <h3 className="font-bold">{facility.name}</h3>
                                    <p className="text-sm text-blue-600">{facility.type}</p>
                                    <div className="flex items-center text-sm text-gray-600 mt-1">
                                      <MapPin className="w-3 h-3 mr-1" />
                                      <span>{facility.location}</span>
                                    </div>
                                    <div className="flex items-center mt-1">
                                      {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                          key={star}
                                          className={`w-3 h-3 ${
                                            star <= Math.floor(facility.rating)
                                              ? "text-yellow-400 fill-current"
                                              : "text-gray-300"
                                          }`}
                                        />
                                      ))}
                                      <span className="ml-1 text-xs">{facility.rating}</span>
                                    </div>
                                  </div>
                                  <Button className="bg-blue-600 hover:bg-blue-700" size="sm" asChild>
                                    <Link href={`/facility/${facility.id}`}>
                                      <MapPin className="w-4 h-4 mr-1" />
                                      Voir
                                    </Link>
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}

                    {results.services.length > 0 && (
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <h2 className="text-lg font-bold">Services</h2>
                          {results.services.length > 3 && (
                            <Button
                              variant="link"
                              className="text-blue-600 p-0"
                              onClick={() => setActiveTab("services")}
                            >
                              Voir tout
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {results.services.slice(0, 3).map((service) => (
                            <Card key={service.id} className="hover:shadow-md transition-shadow">
                              <CardContent className="p-4 flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                                  {service.icon === "heart-pulse" && <HeartPulse className="w-8 h-8 text-blue-600" />}
                                  {service.icon === "baby" && <Baby className="w-8 h-8 text-blue-600" />}
                                  {service.icon === "brain" && <Brain className="w-8 h-8 text-blue-600" />}
                                </div>
                                <h3 className="font-bold">{service.name}</h3>
                                <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                                <Button className="mt-3 bg-blue-600 hover:bg-blue-700" size="sm" asChild>
                                  <Link href={`/services/${service.id}`}>En savoir plus</Link>
                                </Button>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </TabsContent>

              <TabsContent value="doctors">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold">Médecins ({results.doctors.length})</h2>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtrer
                  </Button>
                </div>
                {results.doctors.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600">Aucun médecin trouvé pour "{query}"</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {results.doctors.map((doctor) => (
                      <Card key={doctor.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center">
                            <Image
                              src={doctor.image || "/placeholder.svg?height=80&width=80&text=Dr"}
                              alt={doctor.name}
                              width={80}
                              height={80}
                              className="rounded-full object-cover mr-4"
                            />
                            <div className="flex-1">
                              <h3 className="font-bold">{doctor.name}</h3>
                              <p className="text-blue-600 text-sm">{doctor.specialty}</p>
                              <div className="flex items-center text-sm text-gray-600 mt-1">
                                <MapPin className="w-3 h-3 mr-1" />
                                <span>{doctor.location}</span>
                              </div>
                              <div className="flex items-center mt-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`w-3 h-3 ${
                                      star <= Math.floor(doctor.rating)
                                        ? "text-yellow-400 fill-current"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                                <span className="ml-1 text-xs">{doctor.rating}</span>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <Button className="bg-blue-600 hover:bg-blue-700" size="sm" asChild>
                                <Link href={`/appointments/new?doctor=${doctor.id}`}>
                                  <Calendar className="w-4 h-4 mr-1" />
                                  Rendez-vous
                                </Link>
                              </Button>
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/doctors/${doctor.id}`}>Profil</Link>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="facilities">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold">Établissements ({results.facilities.length})</h2>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtrer
                  </Button>
                </div>
                {results.facilities.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600">Aucun établissement trouvé pour "{query}"</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {results.facilities.map((facility) => (
                      <Card key={facility.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex">
                            <Image
                              src={facility.image || "/placeholder.svg?height=80&width=120&text=Facility"}
                              alt={facility.name}
                              width={120}
                              height={80}
                              className="rounded-lg object-cover mr-4"
                            />
                            <div className="flex-1">
                              <h3 className="font-bold">{facility.name}</h3>
                              <p className="text-sm text-blue-600">{facility.type}</p>
                              <div className="flex items-center text-sm text-gray-600 mt-1">
                                <MapPin className="w-3 h-3 mr-1" />
                                <span>{facility.location}</span>
                              </div>
                              <div className="flex items-center mt-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`w-3 h-3 ${
                                      star <= Math.floor(facility.rating)
                                        ? "text-yellow-400 fill-current"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                                <span className="ml-1 text-xs">{facility.rating}</span>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <Button className="bg-blue-600 hover:bg-blue-700" size="sm" asChild>
                                <Link href={`/facility/${facility.id}`}>
                                  <MapPin className="w-4 h-4 mr-1" />
                                  Détails
                                </Link>
                              </Button>
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/appointments/new?facility=${facility.id}`}>
                                  <Calendar className="w-4 h-4 mr-1" />
                                  RDV
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="services">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold">Services ({results.services.length})</h2>
                </div>
                {results.services.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600">Aucun service trouvé pour "{query}"</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.services.map((service) => (
                      <Card key={service.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4 flex flex-col items-center text-center">
                          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                            {service.icon === "heart-pulse" && <HeartPulse className="w-8 h-8 text-blue-600" />}
                            {service.icon === "baby" && <Baby className="w-8 h-8 text-blue-600" />}
                            {service.icon === "brain" && <Brain className="w-8 h-8 text-blue-600" />}
                          </div>
                          <h3 className="font-bold">{service.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                          <Button className="mt-4 bg-blue-600 hover:bg-blue-700" asChild>
                            <Link href={`/services/${service.id}`}>En savoir plus</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-bold mb-4">Que recherchez-vous ?</h2>
            <p className="text-gray-600 mb-8">
              Utilisez la barre de recherche ci-dessus pour trouver des médecins, des établissements ou des services.
            </p>

            <div className="mb-8">
              <h3 className="font-medium mb-3">Recherches populaires</h3>
              <div className="flex flex-wrap justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchTerm("cardiologie")
                    window.location.href = `/search?q=cardiologie`
                  }}
                >
                  Cardiologie
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchTerm("pédiatre")
                    window.location.href = `/search?q=pédiatre`
                  }}
                >
                  Pédiatre
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchTerm("hôpital libreville")
                    window.location.href = `/search?q=hôpital%20libreville`
                  }}
                >
                  Hôpital Libreville
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchTerm("urgences")
                    window.location.href = `/search?q=urgences`
                  }}
                >
                  Urgences
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
