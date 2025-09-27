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
  Clock,
  Users,
  Heart,
  Building,
  ChevronRight,
  Search,
  Check,
  Phone,
  Star,
  Video,
  Stethoscope,
  Activity,
  Shield,
  Award,
  Globe,
} from "lucide-react"
import { ChatBot } from "@/components/chat-bot"
import { HeroSlider } from "@/components/hero-slider"
import { TestimonialsSection } from "@/components/testimonials-section"
import { PartnersCarousel } from "@/components/partners-carousel"
import { GPSComponent } from "@/components/gps-component"

export default function HomePage() {
  const [selectedService, setSelectedService] = useState<any>(null)

  const mainServices = [
    {
      title: "Tableau de Bord",
      description: "Gérez vos rendez-vous et suivez votre santé",
      icon: <Activity className="w-8 h-8 text-blue-600" />,
      color: "bg-blue-500",
      href: "/dashboard",
      features: ["Suivi médical", "Historique", "Rappels"],
      illustration: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dashboard-preview-XYZ123.png",
      stats: "2,500+ utilisateurs actifs",
    },
    {
      title: "Rendez-vous",
      description: "Prenez rendez-vous avec un professionnel de santé",
      icon: <Calendar className="w-8 h-8 text-green-600" />,
      color: "bg-green-500",
      href: "/appointments/new",
      features: ["Réservation en ligne", "Confirmation SMS", "Rappels"],
      illustration: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/appointment-booking-ABC456.png",
      stats: "15,000+ RDV pris",
    },
    {
      title: "Téléconsultation",
      description: "Consultez un médecin à distance par vidéo",
      icon: <Video className="w-8 h-8 text-purple-600" />,
      color: "bg-purple-500",
      href: "/teleconsultation",
      features: ["Consultation vidéo", "Ordonnance numérique", "24h/24"],
      illustration: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/video-consultation-DEF789.png",
      stats: "500+ consultations/mois",
    },
    {
      title: "Urgences",
      description: "Services d'urgence et premiers secours",
      icon: <Phone className="w-8 h-8 text-red-600" />,
      color: "bg-red-500",
      href: "/emergency",
      features: ["SAMU 1515", "Géolocalisation", "Premiers secours"],
      illustration: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/emergency-services-GHI012.png",
      stats: "24/7 disponible",
    },
    {
      title: "Structures de Santé",
      description: "Trouvez les hôpitaux et cliniques près de vous",
      icon: <Building className="w-8 h-8 text-indigo-600" />,
      color: "bg-indigo-500",
      href: "/facilities",
      features: ["255 structures", "9 provinces", "Géolocalisation"],
      illustration: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hospital-network-JKL345.png",
      stats: "255+ structures",
    },
    {
      title: "Médecine Traditionnelle",
      description: "Découvrez la pharmacopée gabonaise",
      icon: <Stethoscope className="w-8 h-8 text-green-700" />,
      color: "bg-green-600",
      href: "/culture-medecine",
      features: ["Plantes médicinales", "Savoirs ancestraux", "Médecine intégrative"],
      illustration: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/traditional-herbs-MNO678.png",
      stats: "100+ plantes répertoriées",
    },
  ]

  const quickStats = [
    { label: "Structures de santé", value: "255+", icon: <Building className="w-6 h-6" />, color: "text-blue-600" },
    { label: "Professionnels", value: "500+", icon: <Users className="w-6 h-6" />, color: "text-green-600" },
    { label: "Provinces couvertes", value: "9", icon: <MapPin className="w-6 h-6" />, color: "text-purple-600" },
    { label: "Disponibilité", value: "24/7", icon: <Clock className="w-6 h-6" />, color: "text-red-600" },
  ]

  const recentNews = [
    {
      title: "L'Hôpital Régional de Melen se modernise",
      description: "Nouveaux équipements et services pour améliorer les soins aux patients de l'Estuaire",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/melen%20gab-WMrmwtK1heThgSiK7ckk5dJKHAMvFK.png",
      date: "15 janvier 2025",
      category: "Modernisation",
      author: "Dr. Marie Obame",
      readTime: "3 min",
    },
    {
      title: "Nouvelle collaboration avec l'IPHAMETRA",
      description: "Intégration de la médecine traditionnelle dans nos services de soins modernes",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/iphametra-institute-PQR901.png",
      date: "12 janvier 2025",
      category: "Partenariat",
      author: "Prof. Jean Nzé",
      readTime: "5 min",
    },
    {
      title: "Extension des services de téléconsultation",
      description: "Désormais disponible dans toutes les provinces du Gabon pour un accès universel",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/health-ministers-gabon-STU234.png",
      date: "10 janvier 2025",
      category: "Télémédecine",
      author: "Ministre de la Santé",
      readTime: "4 min",
    },
  ]

  const featuredDoctors = [
    {
      name: "Dr. Pierre-André Kombila",
      specialty: "Cardiologie",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cardio%20medecin%20gab-C3jz1cyXUNJK76hE3dFlw2NmnYiLRp.png",
      rating: 4.9,
      experience: "15 ans",
      location: "Hôpital Central de Libreville",
    },
    {
      name: "Dr. Marie Ndong",
      specialty: "Pédiatrie",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hsGmShKJAS1WWI3RJSq7awiLl6J6J2.png",
      rating: 4.8,
      experience: "12 ans",
      location: "Centre Hospitalier de Franceville",
    },
    {
      name: "Dr. François Obame",
      specialty: "Neurologie",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-q1zpRkAQKxylEeBUiFOvjbpVW4BvVA.png",
      rating: 4.7,
      experience: "10 ans",
      location: "Hôpital Régional de Port-Gentil",
    },
  ]

  const achievements = [
    {
      icon: <Award className="w-8 h-8 text-yellow-500" />,
      title: "Certification ISO 9001",
      description: "Qualité des services certifiée",
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      title: "Sécurité des données",
      description: "Protection RGPD garantie",
    },
    {
      icon: <Globe className="w-8 h-8 text-green-500" />,
      title: "Couverture nationale",
      description: "Présent dans les 9 provinces",
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
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold text-gray-900">SantéGabon</span>
                  <div className="text-xs text-gray-500">Votre santé, notre priorité</div>
                </div>
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Tableau de bord
              </Link>
              <Link href="/appointments" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Rendez-vous
              </Link>
              <Link href="/facilities" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Structures
              </Link>
              <Link
                href="/teleconsultation"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Téléconsultation
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                À propos
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="hidden md:flex bg-transparent" asChild>
                <Link href="/search">
                  <Search className="w-4 h-4 mr-2" />
                  Rechercher
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="hidden md:flex bg-transparent" asChild>
                <Link href="/login">Se connecter</Link>
              </Button>
              <Button className="bg-red-600 hover:bg-red-700 shadow-lg" asChild>
                <Link href="/emergency">
                  <Phone className="w-4 h-4 mr-2" />
                  URGENCE
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSlider />

      {/* Vidéo promotionnelle */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-800">Plateforme innovante</Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Découvrez notre plateforme en vidéo</h2>
              <p className="text-lg text-gray-600 mb-8">
                Apprenez comment prendre rendez-vous facilement avec nos médecins spécialisés et accéder aux meilleurs
                soins de santé au Gabon en quelques clics.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Prise de rendez-vous en ligne 24h/24</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Téléconsultation avec des spécialistes</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Suivi médical personnalisé et sécurisé</span>
                </div>
              </div>
              <div className="flex gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                  <Link href="/register">Commencer maintenant</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/demo">Voir la démo</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
                <video
                  className="w-full h-auto"
                  controls
                  poster="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/video-poster-consultation-VWX567.jpg"
                  preload="metadata"
                >
                  <source src="/videos/presentation-sante-gabon.mp4" type="video/mp4" />
                  <source src="/videos/presentation-sante-gabon.webm" type="video/webm" />
                  Votre navigateur ne supporte pas la lecture vidéo.
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
              </div>
              {/* Éléments décoratifs */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-100 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-green-100 rounded-full opacity-40 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services principaux */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-100 text-green-800">Services complets</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos Services de Santé</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Accédez à tous les services de santé du Gabon depuis une seule plateforme intégrée et sécurisée
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainServices.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg overflow-hidden bg-white"
                onClick={() => setSelectedService(service)}
              >
                {/* Image d'illustration en arrière-plan */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={
                      service.illustration ||
                      "/placeholder.svg?height=200&width=400&text=" + encodeURIComponent(service.title)
                    }
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/20 backdrop-blur-sm text-white border-0">{service.stats}</Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-2">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold">{service.title}</h3>
                  </div>
                </div>

                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-500">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Button className="w-full group-hover:bg-blue-700 bg-blue-600" asChild>
                    <Link href={service.href}>
                      Accéder au service
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
      <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">SantéGabon en chiffres</h2>
            <p className="text-blue-100 text-lg">Notre impact sur la santé au Gabon</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {quickStats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <div className={stat.color}>{stat.icon}</div>
                  </div>
                </div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Médecins en vedette */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-purple-100 text-purple-800">Équipe médicale</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos Médecins Spécialisés</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Rencontrez notre équipe de professionnels de santé qualifiés et expérimentés
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDoctors.map((doctor, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src={
                      doctor.image || "/placeholder.svg?height=300&width=300&text=" + encodeURIComponent(doctor.name)
                    }
                    alt={doctor.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-gray-800">{doctor.specialty}</Badge>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center bg-white/90 rounded-full px-2 py-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium ml-1">{doctor.rating}</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{doctor.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{doctor.specialty}</p>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {doctor.location}
                  </div>
                  <div className="text-sm text-gray-600 mb-4">{doctor.experience} d'expérience</div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                      <Link href={`/doctors/${index + 1}`}>Voir profil</Link>
                    </Button>
                    <Button size="sm" className="flex-1 bg-blue-600" asChild>
                      <Link href={`/appointments/new?doctor=${index + 1}`}>
                        <Calendar className="w-4 h-4 mr-1" />
                        RDV
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg" asChild>
              <Link href="/doctors">
                Voir tous nos médecins
                <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* GPS Component */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <GPSComponent />
        </div>
      </section>

      {/* Actualités */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <Badge className="mb-4 bg-orange-100 text-orange-800">Actualités</Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Actualités Santé</h2>
              <p className="text-gray-600 text-lg">
                Restez informé des dernières nouvelles du secteur de la santé au Gabon
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/actualites">
                Voir toutes les actualités
                <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentNews.map((news, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={news.image || "/placeholder.svg?height=200&width=400&text=" + encodeURIComponent(news.title)}
                    alt={news.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-blue-600 text-white">{news.category}</Badge>
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {news.readTime} de lecture
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span>{news.date}</span>
                    <span>Par {news.author}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{news.description}</p>
                  <Button variant="ghost" size="sm" className="p-0 h-auto text-blue-600 font-medium">
                    Lire l'article complet
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications et réalisations */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-yellow-100 text-yellow-800">Certifications</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos Certifications et Réalisations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              La qualité et la sécurité au cœur de nos préoccupations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    {achievement.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                <p className="text-gray-600">{achievement.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-100 text-green-800">Témoignages</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Ce que disent nos patients</h2>
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
            <Badge className="mb-4 bg-blue-100 text-blue-800">Partenaires</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos Partenaires de Confiance</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nous collaborons avec les meilleures institutions pour votre santé
            </p>
          </div>
          <PartnersCarousel />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Prêt à prendre soin de votre santé ?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Rejoignez des milliers de Gabonais qui font confiance à notre plateforme pour leurs besoins de santé.
              Commencez votre parcours santé dès aujourd'hui.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg" asChild>
                <Link href="/register">
                  <Users className="w-5 h-5 mr-2" />
                  Créer un compte gratuit
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent shadow-lg"
                asChild
              >
                <Link href="/appointments/new">
                  <Calendar className="w-5 h-5 mr-2" />
                  Prendre rendez-vous
                </Link>
              </Button>
            </div>
            <div className="mt-8 text-blue-100">
              <p className="text-sm">✓ Inscription gratuite ✓ Prise de RDV immédiate ✓ Support 24/7</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Navigation Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg">
        <div className="flex justify-around">
          <Link href="/" className="flex flex-col items-center py-3 flex-1">
            <Heart className="w-6 h-6 text-blue-600" />
            <span className="text-xs font-medium text-blue-600">Accueil</span>
          </Link>
          <Link href="/facilities" className="flex flex-col items-center py-3 flex-1">
            <MapPin className="w-6 h-6 text-gray-500" />
            <span className="text-xs text-gray-500">Structures</span>
          </Link>
          <Link href="/appointments" className="flex flex-col items-center py-3 flex-1">
            <Calendar className="w-6 h-6 text-gray-500" />
            <span className="text-xs text-gray-500">RDV</span>
          </Link>
          <Link href="/dashboard" className="flex flex-col items-center py-3 flex-1">
            <Users className="w-6 h-6 text-gray-500" />
            <span className="text-xs text-gray-500">Profil</span>
          </Link>
        </div>
      </nav>

      {/* Chatbot */}
      <ChatBot />
    </div>
  )
}
