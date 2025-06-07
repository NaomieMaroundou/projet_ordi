"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  MapPin,
  Video,
  Clock,
  Users,
  Heart,
  Stethoscope,
  Building,
  AlertTriangle,
  ChevronRight,
  Search,
} from "lucide-react"
import { ChatBot } from "@/components/chat-bot"
import { HeroSlider } from "@/components/hero-slider"
import { TestimonialsSection } from "@/components/testimonials-section"
import { PartnersCarousel } from "@/components/partners-carousel"
import { GPSComponent } from "@/components/gps-component"

export default function HomePage() {
  const [selectedService, setSelectedService] = useState(null)

  const mainServices = [
    {
      title: "Tableau de Bord",
      description: "Gérez vos rendez-vous et suivez votre santé",
      icon: <Stethoscope className="w-8 h-8" />,
      color: "bg-blue-500",
      href: "/dashboard",
      features: ["Suivi médical", "Historique", "Rappels"],
    },
    {
      title: "Rendez-vous",
      description: "Prenez rendez-vous avec un professionnel de santé",
      icon: <Calendar className="w-8 h-8" />,
      color: "bg-green-500",
      href: "/appointments/new",
      features: ["Réservation en ligne", "Confirmation SMS", "Rappels"],
    },
    {
      title: "Téléconsultation",
      description: "Consultez un médecin à distance par vidéo",
      icon: <Video className="w-8 h-8" />,
      color: "bg-purple-500",
      href: "/teleconsultation",
      features: ["Consultation vidéo", "Ordonnance numérique", "24h/24"],
    },
    {
      title: "Urgences",
      description: "Services d'urgence et premiers secours",
      icon: <AlertTriangle className="w-8 h-8" />,
      color: "bg-red-500",
      href: "/emergency",
      features: ["SAMU 1515", "Géolocalisation", "Premiers secours"],
    },
    {
      title: "Structures de Santé",
      description: "Trouvez les hôpitaux et cliniques près de vous",
      icon: <Building className="w-8 h-8" />,
      color: "bg-indigo-500",
      href: "/facilities",
      features: ["255 structures", "9 provinces", "Géolocalisation"],
    },
    {
      title: "Médecine Traditionnelle",
      description: "Découvrez la pharmacopée gabonaise",
      icon: <Heart className="w-8 h-8" />,
      color: "bg-green-600",
      href: "/culture-medecine",
      features: ["Plantes médicinales", "Savoirs ancestraux", "Médecine intégrative"],
    },
  ]

  const quickStats = [
    { label: "Structures de santé", value: "255+", icon: <Building className="w-6 h-6" /> },
    { label: "Professionnels", value: "500+", icon: <Users className="w-6 h-6" /> },
    { label: "Provinces couvertes", value: "9", icon: <MapPin className="w-6 h-6" /> },
    { label: "Disponibilité", value: "24/7", icon: <Clock className="w-6 h-6" /> },
  ]

  const recentNews = [
    {
      title: "L'Hôpital Régional de Melen se modernise",
      description: "Nouveaux équipements et services pour améliorer les soins",
      image: "/images/melen-gab.png",
      date: "15 janvier 2025",
      category: "Modernisation",
    },
    {
      title: "Nouvelle collaboration avec l'IPHAMETRA",
      description: "Intégration de la médecine traditionnelle dans nos services",
      image: "/images/iphametra-institute.png",
      date: "12 janvier 2025",
      category: "Partenariat",
    },
    {
      title: "Extension des services de téléconsultation",
      description: "Désormais disponible dans toutes les provinces",
      image: "/images/health-ministers-gabon.png",
      date: "10 janvier 2025",
      category: "Télémédecine",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">SantéGabon</span>
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">
                Tableau de bord
              </Link>
              <Link href="/appointments" className="text-gray-600 hover:text-blue-600 transition-colors">
                Rendez-vous
              </Link>
              <Link href="/facilities" className="text-gray-600 hover:text-blue-600 transition-colors">
                Structures
              </Link>
              <Link href="/teleconsultation" className="text-gray-600 hover:text-blue-600 transition-colors">
                Téléconsultation
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                À propos
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="hidden md:flex" asChild>
                <Link href="/search">
                  <Search className="w-4 h-4 mr-2" />
                  Rechercher
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="hidden md:flex" asChild>
                <Link href="/login">Se connecter</Link>
              </Button>
              <Button className="bg-red-600 hover:bg-red-700" asChild>
                <Link href="/emergency">URGENCE</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSlider />

      {/* Services principaux */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Accédez à tous les services de santé du Gabon depuis une seule plateforme
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainServices.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg"
                onClick={() => setSelectedService(service)}
              >
                <CardContent className="p-6">
                  <div
                    className={`w-16 h-16 ${service.color} rounded-xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform`}
                  >
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="space-y-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-500">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Button className="w-full group-hover:bg-blue-700" asChild>
                    <Link href={service.href}>
                      Accéder
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistiques rapides */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {quickStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GPS Component */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <GPSComponent />
        </div>
      </section>

      {/* Actualités */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Actualités Santé</h2>
              <p className="text-gray-600">Restez informé des dernières nouvelles du secteur de la santé au Gabon</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/actualites">Voir toutes les actualités</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentNews.map((news, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={news.image || "/placeholder.svg"}
                    alt={news.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-4 left-4 bg-blue-600">{news.category}</Badge>
                </div>
                <CardContent className="p-6">
                  <div className="text-sm text-gray-500 mb-2">{news.date}</div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">{news.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{news.description}</p>
                  <Button variant="ghost" size="sm" className="p-0 h-auto text-blue-600">
                    Lire la suite
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Témoignages de nos patients</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez les expériences de nos patients et professionnels de santé
            </p>
          </div>
          <TestimonialsSection />
        </div>
      </section>

      {/* Partenaires */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos partenaires</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nous collaborons avec les meilleures institutions pour votre santé
            </p>
          </div>
          <PartnersCarousel />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à prendre soin de votre santé ?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de Gabonais qui font confiance à notre plateforme pour leurs besoins de santé
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
              <Link href="/register">
                <Users className="w-5 h-5 mr-2" />
                Créer un compte
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
              asChild
            >
              <Link href="/appointments/new">
                <Calendar className="w-5 h-5 mr-2" />
                Prendre rendez-vous
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Bottom Navigation Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around">
          <Link href="/" className="flex flex-col items-center py-2 flex-1">
            <Heart className="w-6 h-6 text-blue-600" />
            <span className="text-xs">Accueil</span>
          </Link>
          <Link href="/facilities" className="flex flex-col items-center py-2 flex-1">
            <MapPin className="w-6 h-6 text-gray-500" />
            <span className="text-xs">Structures</span>
          </Link>
          <Link href="/appointments" className="flex flex-col items-center py-2 flex-1">
            <Calendar className="w-6 h-6 text-gray-500" />
            <span className="text-xs">Rendez-vous</span>
          </Link>
          <Link href="/dashboard" className="flex flex-col items-center py-2 flex-1">
            <Users className="w-6 h-6 text-gray-500" />
            <span className="text-xs">Profil</span>
          </Link>
        </div>
      </nav>

      {/* Chatbot */}
      <ChatBot />
    </div>
  )
}
