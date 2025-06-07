"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Building, Users, Clock, Phone, Navigation, Star, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function FacilitiesAboutPage() {
  const provinces = [
    {
      name: "Estuaire",
      capital: "Libreville",
      structures: 45,
      population: "870,000",
      image: "/images/chu-libreville-entrance.png",
      description: "Province la plus peuplée avec les plus grandes infrastructures de santé du pays.",
    },
    {
      name: "Haut-Ogooué",
      capital: "Franceville",
      structures: 18,
      population: "250,000",
      image: "/images/chu-libreville-modern.png",
      description: "Centre minier important avec des besoins spécifiques en santé au travail.",
    },
    {
      name: "Ogooué-Maritime",
      capital: "Port-Gentil",
      structures: 22,
      population: "160,000",
      image: "/images/hospital1.png",
      description: "Capitale économique avec des infrastructures modernes de santé.",
    },
    {
      name: "Woleu-Ntem",
      capital: "Oyem",
      structures: 15,
      population: "155,000",
      image: "/images/hospital2.png",
      description: "Province frontalière nécessitant des soins transfrontaliers.",
    },
    {
      name: "Ngounié",
      capital: "Mouila",
      structures: 12,
      population: "100,000",
      image: "/images/chu-libreville-crowd.png",
      description: "Province rurale avec des défis d'accessibilité aux soins.",
    },
    {
      name: "Moyen-Ogooué",
      capital: "Lambaréné",
      structures: 8,
      population: "70,000",
      image: "/images/hospital3.png",
      description: "Berceau de l'hôpital Albert Schweitzer, pionnier de la médecine au Gabon.",
    },
    {
      name: "Ogooué-Ivindo",
      capital: "Makokou",
      structures: 6,
      population: "65,000",
      image: "/images/chu-libreville-modern.png",
      description: "Province forestière avec des besoins en médecine tropicale.",
    },
    {
      name: "Ogooué-Lolo",
      capital: "Koulamoutou",
      structures: 7,
      population: "65,000",
      image: "/images/chu-libreville-crowd.png",
      description: "Province enclavée nécessitant des solutions de télémédecine.",
    },
    {
      name: "Nyanga",
      capital: "Tchibanga",
      structures: 5,
      population: "55,000",
      image: "/images/chu-libreville-sign.png",
      description: "Province côtière avec des spécificités en santé maritime.",
    },
  ]

  const structureTypes = [
    {
      type: "Centres Hospitaliers Universitaires",
      count: 3,
      description: "Hôpitaux de référence avec formation médicale",
      icon: <Building className="w-8 h-8 text-blue-600" />,
    },
    {
      type: "Hôpitaux Régionaux",
      count: 12,
      description: "Hôpitaux principaux de chaque province",
      icon: <Building className="w-8 h-8 text-green-600" />,
    },
    {
      type: "Centres de Santé",
      count: 85,
      description: "Structures de soins de proximité",
      icon: <Heart className="w-8 h-8 text-purple-600" />,
    },
    {
      type: "Cliniques Privées",
      count: 35,
      description: "Établissements privés spécialisés",
      icon: <Star className="w-8 h-8 text-orange-600" />,
    },
    {
      type: "Pharmacies",
      count: 120,
      description: "Points de distribution de médicaments",
      icon: <Heart className="w-8 h-8 text-red-600" />,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">Structures de Santé au Gabon</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez le réseau complet des infrastructures de santé réparties dans les 9 provinces du Gabon.
          </p>
        </div>

        {/* Statistiques générales */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">255</div>
              <p className="text-gray-600">Structures totales</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">9</div>
              <p className="text-gray-600">Provinces couvertes</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <p className="text-gray-600">Services d'urgence</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-orange-600 mb-2">1.8M</div>
              <p className="text-gray-600">Population desservie</p>
            </CardContent>
          </Card>
        </div>

        {/* Types de structures */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-center text-3xl text-blue-600">Types de Structures</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-3 gap-6">
              {structureTypes.map((structure, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto mb-4">{structure.icon}</div>
                    <CardTitle className="text-lg">{structure.type}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900 mb-2">{structure.count}</div>
                    <p className="text-gray-600 text-sm">{structure.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Répartition par provinces */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Répartition par Provinces</h2>
          <div className="grid gap-6">
            {provinces.map((province, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <Image
                      src={province.image || "/placeholder.svg"}
                      alt={`Structures de santé - ${province.name}`}
                      width={150}
                      height={100}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-xl text-blue-600">{province.name}</h3>
                        <Badge className="bg-blue-600">{province.structures} structures</Badge>
                      </div>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>Capitale: {province.capital}</span>
                      </div>
                      <div className="flex items-center text-gray-600 mb-3">
                        <Users className="w-4 h-4 mr-2" />
                        <span>Population: {province.population} habitants</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{province.description}</p>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700" asChild>
                          <Link href={`/facilities?province=${province.name}`}>Voir les structures</Link>
                        </Button>
                        <Button size="sm" variant="outline">
                          <Navigation className="w-4 h-4 mr-1" />
                          Localiser
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Services disponibles */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-center text-3xl text-blue-600">Services Disponibles</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Services d'urgence</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Clock className="w-4 h-4 text-green-600 mr-2" />
                    <span>Urgences 24h/24 dans 15 structures</span>
                  </li>
                  <li className="flex items-center">
                    <Phone className="w-4 h-4 text-green-600 mr-2" />
                    <span>SAMU disponible (1515)</span>
                  </li>
                  <li className="flex items-center">
                    <Navigation className="w-4 h-4 text-green-600 mr-2" />
                    <span>Géolocalisation des services</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Spécialités médicales</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Cardiologie",
                    "Pédiatrie",
                    "Gynécologie",
                    "Neurologie",
                    "Chirurgie",
                    "Maternité",
                    "Radiologie",
                    "Laboratoire",
                  ].map((specialty) => (
                    <Badge key={specialty} variant="outline" className="justify-center">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="text-center">
          <CardContent className="p-8">
            <MapPin className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-blue-600 mb-4">Trouvez une Structure Près de Chez Vous</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Utilisez notre système de géolocalisation pour trouver rapidement la structure de santé la plus proche et
              prendre rendez-vous en ligne.
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                <Link href="/facilities">
                  <MapPin className="w-4 h-4 mr-2" />
                  Rechercher une structure
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/appointments/new">Prendre rendez-vous</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
