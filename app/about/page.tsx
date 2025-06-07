"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Heart, Globe, Target, Eye, Lightbulb, Shield } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">À propos de nous</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nous sommes dédiés à l'amélioration de l'accès aux soins de santé au Gabon grâce à la technologie et à
            l'innovation.
          </p>
        </div>

        {/* Notre Mission */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-center text-3xl text-blue-600 flex items-center justify-center gap-2">
              <Target className="w-8 h-8" />
              Notre Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Transformer la santé au Gabon</h3>
                <p className="text-gray-600 mb-4">
                  Notre plateforme révolutionne l'accès aux soins de santé en connectant les patients aux professionnels
                  de santé à travers tout le Gabon. Nous facilitons la prise de rendez-vous, les téléconsultations et
                  l'accès à l'information médicale.
                </p>
                <p className="text-gray-600 mb-6">
                  En intégrant la médecine traditionnelle gabonaise avec les pratiques modernes, nous offrons une
                  approche holistique des soins de santé qui respecte notre patrimoine culturel.
                </p>
                <div className="flex gap-4">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Heart className="w-4 h-4 mr-2" />
                    Rejoignez-nous
                  </Button>
                  <Button variant="outline">En savoir plus</Button>
                </div>
              </div>
              <div className="relative h-64">
                <Image
                  src="/images/health-ministers-gabon.png"
                  alt="Équipe dirigeante de la santé au Gabon"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Nos Valeurs */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Nos Valeurs</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Eye className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <CardTitle>Accessibilité</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Rendre les soins de santé accessibles à tous les Gabonais, peu importe leur localisation géographique.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Lightbulb className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <CardTitle>Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Utiliser la technologie pour créer des solutions innovantes adaptées aux besoins locaux.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <CardTitle>Qualité</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Garantir des soins de qualité en connectant les patients aux meilleurs professionnels de santé.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Notre Équipe */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-center text-3xl text-blue-600 flex items-center justify-center gap-2">
              <Users className="w-8 h-8" />
              Notre Équipe
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Image
                  src="/images/doctor-male.png"
                  alt="Dr. Jean Moussavou"
                  width={120}
                  height={120}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="font-bold text-lg">Dr. Jean Moussavou</h3>
                <p className="text-blue-600">Directeur Médical</p>
                <p className="text-sm text-gray-600 mt-2">
                  Cardiologue avec 15 ans d'expérience, pionnier de la télémédecine au Gabon.
                </p>
              </div>

              <div className="text-center">
                <Image
                  src="/images/doctor-female-1.png"
                  alt="Dr. Marie Ndong"
                  width={120}
                  height={120}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="font-bold text-lg">Dr. Marie Ndong</h3>
                <p className="text-blue-600">Responsable Pédiatrie</p>
                <p className="text-sm text-gray-600 mt-2">
                  Pédiatre spécialisée dans les soins aux enfants et la médecine préventive.
                </p>
              </div>

              <div className="text-center">
                <Image
                  src="/images/doctor-female-2.png"
                  alt="Dr. Claire Mouele"
                  width={120}
                  height={120}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="font-bold text-lg">Dr. Claire Mouele</h3>
                <p className="text-blue-600">Gynécologue</p>
                <p className="text-sm text-gray-600 mt-2">
                  Spécialiste en santé féminine et médecine intégrative traditionnelle.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Médecine Traditionnelle */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-center text-3xl text-green-600">Médecine Traditionnelle Gabonaise</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Préservation du Patrimoine</h3>
                <p className="text-gray-600 mb-4">
                  Nous travaillons en étroite collaboration avec l'Institut de Pharmacopée et de Médecine Traditionnelle
                  (IPHAMETRA) pour préserver et valoriser les savoirs ancestraux gabonais.
                </p>
                <p className="text-gray-600 mb-6">
                  Notre approche intégrative combine les meilleures pratiques de la médecine moderne avec la richesse
                  thérapeutique de nos plantes médicinales traditionnelles.
                </p>
                <Button className="bg-green-600 hover:bg-green-700" asChild>
                  <Link href="/culture-medecine">Découvrir notre approche</Link>
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-32">
                  <Image
                    src="/images/iboga-traditional-harvest.png"
                    alt="Récolte traditionnelle d'iboga"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="relative h-32">
                  <Image
                    src="/images/traditional-medicine-preparation.png"
                    alt="Préparation de médecine traditionnelle"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="relative h-32 col-span-2">
                  <Image
                    src="/images/iphametra-institute.png"
                    alt="Institut IPHAMETRA"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">150+</div>
              <p className="text-gray-600">Structures de santé</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
              <p className="text-gray-600">Professionnels de santé</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">9</div>
              <p className="text-gray-600">Provinces couvertes</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
              <p className="text-gray-600">Support disponible</p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="text-center">
          <CardContent className="p-8">
            <Globe className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-blue-600 mb-4">Rejoignez Notre Mission</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Ensemble, construisons un système de santé plus accessible, plus efficace et plus humain pour tous les
              Gabonais.
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Heart className="w-4 h-4 mr-2" />
                Nous contacter
              </Button>
              <Button variant="outline" asChild>
                <Link href="/register">Créer un compte</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
