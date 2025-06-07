"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Users, Shield, Globe, Target, Award } from "lucide-react"
import Image from "next/image"

export default function NotreMissionPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">Notre Mission</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Améliorer l'accès aux soins de santé pour tous les Gabonais en connectant patients, professionnels de santé
            et structures médicales sur une plateforme innovante.
          </p>
        </div>

        {/* Mission Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <CardTitle>Accessibilité</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Rendre les soins de santé accessibles à tous, partout au Gabon, grâce à la technologie et la
                télémédecine.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <CardTitle>Communauté</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Créer une communauté solidaire où patients et professionnels partagent expériences et conseils de santé.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Shield className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <CardTitle>Qualité</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Garantir des soins de qualité en connectant les patients avec les meilleurs professionnels de santé du
                pays.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Vision Section */}
        <Card className="mb-12">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div>
              <h2 className="text-3xl font-bold text-blue-600 mb-4">Notre Vision</h2>
              <p className="text-gray-600 mb-4">
                Devenir la plateforme de référence pour la santé au Gabon, en révolutionnant l'accès aux soins grâce au
                numérique tout en préservant la dimension humaine de la médecine.
              </p>
              <p className="text-gray-600">
                Nous aspirons à un Gabon où chaque citoyen peut accéder facilement à des soins de qualité, recevoir des
                conseils médicaux fiables et participer activement à sa santé et celle de sa communauté.
              </p>
            </div>
            <div className="relative h-64">
              <Image
                src="/placeholder.svg?height=300&width=400&text=Vision+SantéGabon"
                alt="Notre vision"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </Card>

        {/* Values */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Nos Valeurs</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <Globe className="w-8 h-8 text-blue-500 mb-2" />
                <CardTitle>Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Nous utilisons les dernières technologies pour améliorer l'expérience de soins et faciliter l'accès à
                  la santé.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Target className="w-8 h-8 text-green-500 mb-2" />
                <CardTitle>Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Nous nous engageons à fournir des services de la plus haute qualité pour répondre aux besoins de santé
                  de nos utilisateurs.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Heart className="w-8 h-8 text-red-500 mb-2" />
                <CardTitle>Bienveillance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Nous plaçons l'humain au centre de nos préoccupations avec empathie, respect et attention à chaque
                  utilisateur.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Award className="w-8 h-8 text-purple-500 mb-2" />
                <CardTitle>Intégrité</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Nous agissons avec transparence, honnêteté et respect des règles déontologiques et de confidentialité
                  médicale.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-3xl text-blue-600">Notre Équipe</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-600 mb-8">
              Une équipe passionnée de professionnels de santé, d'ingénieurs et d'experts en technologie, unis pour
              révolutionner la santé au Gabon.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <Image
                      src={`/placeholder.svg?height=96&width=96&text=Équipe+${i}`}
                      alt={`Membre équipe ${i}`}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <h3 className="font-semibold">Dr. Nom Prénom</h3>
                  <p className="text-sm text-gray-600">Fonction</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
