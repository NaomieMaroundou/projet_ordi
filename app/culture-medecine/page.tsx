"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Leaf, BookOpen, Users, Globe, Heart, Star } from "lucide-react"
import Image from "next/image"

export default function CultureMedecinePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-600 mb-4">Culture et Médecine</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez la richesse de la médecine traditionnelle gabonaise et son intégration harmonieuse avec la
            médecine moderne pour des soins holistiques.
          </p>
        </div>

        {/* Featured Section */}
        <Card className="mb-12">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div>
              <Badge className="mb-4 bg-green-100 text-green-800">Médecine Traditionnelle</Badge>
              <h2 className="text-3xl font-bold text-green-600 mb-4">L'Héritage Thérapeutique du Gabon</h2>
              <p className="text-gray-600 mb-4">
                Depuis des millénaires, les peuples du Gabon ont développé une pharmacopée riche basée sur les plantes
                médicinales de la forêt équatoriale. Cette sagesse ancestrale continue d'enrichir la médecine moderne.
              </p>
              <p className="text-gray-600 mb-6">
                Nos guérisseurs traditionnels, véritables gardiens de ce savoir, travaillent désormais en collaboration
                avec les médecins modernes pour offrir des soins complémentaires et holistiques.
              </p>
              <Button className="bg-green-600 hover:bg-green-700">Explorer nos traditions</Button>
            </div>
            <div className="relative h-64">
              <Image
                src="/images/iboga-traditional-harvest.png"
                alt="Récolte traditionnelle de l'iboga au Gabon"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </Card>

        {/* Categories */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Leaf className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <CardTitle>Plantes Médicinales</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Découvrez les propriétés thérapeutiques des plantes de la forêt gabonaise et leurs utilisations
                traditionnelles.
              </p>
              <Button variant="outline" size="sm">
                En savoir plus
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <BookOpen className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <CardTitle>Savoirs Ancestraux</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Explorez les techniques de diagnostic et de traitement transmises de génération en génération.
              </p>
              <Button variant="outline" size="sm">
                Explorer
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <CardTitle>Guérisseurs Modernes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Rencontrez les praticiens qui allient médecine traditionnelle et approches contemporaines.
              </p>
              <Button variant="outline" size="sm">
                Découvrir
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Articles Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-green-600 mb-8">Articles et Témoignages</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <div className="relative h-48">
                <Image
                  src="/images/iphametra-institute.png"
                  alt="Institut de Pharmacopée et Médecine Traditionnelle"
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <Badge className="w-fit">Recherche</Badge>
                <CardTitle className="text-lg">L'Iboga : Entre tradition et recherche moderne</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  Une étude approfondie sur les propriétés thérapeutiques de l'Iboga et son potentiel dans le traitement
                  de diverses pathologies...
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Dr. Marie Nzé</span>
                  <Button variant="ghost" size="sm">
                    Lire plus
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <div className="relative h-48">
                <Image
                  src="/images/traditional-medicine-preparation.png"
                  alt="Préparation de remèdes traditionnels"
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <Badge className="w-fit">Témoignage</Badge>
                <CardTitle className="text-lg">Ma guérison grâce à la médecine intégrative</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  Le témoignage émouvant d'une patiente qui a bénéficié d'un traitement combinant médecine moderne et
                  traditionnelle...
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Sylvie Obame</span>
                  <Button variant="ghost" size="sm">
                    Lire plus
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Integration Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-center text-3xl text-green-600">Médecine Intégrative au Gabon</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Notre Approche</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-600">
                      Collaboration entre médecins modernes et guérisseurs traditionnels
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-600">Recherche scientifique sur les plantes médicinales locales</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-600">Formation des professionnels aux approches complémentaires</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-600">Respect des protocoles de sécurité et d'efficacité</span>
                  </li>
                </ul>
              </div>
              <div className="relative h-64">
                <Image
                  src="/placeholder.svg?height=300&width=400&text=Médecine+intégrative"
                  alt="Médecine intégrative"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="text-center">
          <CardContent className="p-8">
            <Globe className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-green-600 mb-4">Rejoignez Notre Communauté</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Participez à la préservation et à l'évolution de notre patrimoine médical. Partagez vos connaissances,
              découvrez de nouvelles approches et contribuez à l'avenir de la santé au Gabon.
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="bg-green-600 hover:bg-green-700">
                <Heart className="w-4 h-4 mr-2" />
                Devenir membre
              </Button>
              <Button variant="outline">En savoir plus</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
