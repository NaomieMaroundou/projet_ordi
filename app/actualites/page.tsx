"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  MessageCircle,
  Share2,
  Eye,
  Calendar,
  User,
  ChevronRight,
  ChevronLeft,
  MenuIcon,
  X,
  Play,
  Bookmark,
  MapPin,
  Video,
  Newspaper,
  Activity,
  Brain,
  MessageSquare,
  Pill,
  AlertCircle,
  Globe,
  Mic,
  Bell,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

// Images importées
const images = {
  cardioMedecin:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cardio%20medecin%20gab-C3jz1cyXUNJK76hE3dFlw2NmnYiLRp.png",
  egyptoGab: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/egypto%20gab-rM79cbz4IhuooyQoOZUms3oCpYC1Cl.png",
  egypto2: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/egypto2-l0c0KRxIUMTNtxexCjOz0qXMQ9O9FA.png",
  melenGab: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/melen%20gab-WMrmwtK1heThgSiK7ckk5dJKHAMvFK.png",
  melen2: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2%20melen%20gab-Antr6kTH0xqzHq7PHtRLQNlHVpgLJm.png",
  doctors1: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-q1zpRkAQKxylEeBUiFOvjbpVW4BvVA.png",
  doctors2: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hsGmShKJAS1WWI3RJSq7awiLl6J6J2.png",
  doctors3: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jByzB3uofCdiSVTptSsVCKtDZnBAVO.png",
  pediatric: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sfJvItM2HuSI2Yar4fQUeBeMWmLHr6.png",
}

// Catégories d'actualités
const newsCategories = [
  { id: "medical", name: "Actualités médicales", icon: <Activity className="w-5 h-5" />, emoji: "🏥" },
  { id: "public", name: "Santé publique", icon: <Globe className="w-5 h-5" />, emoji: "🌍" },
  { id: "wellness", name: "Bien-être et prévention", icon: <Heart className="w-5 h-5" />, emoji: "💆‍♀️" },
  { id: "diseases", name: "Maladies et traitements", icon: <Activity className="w-5 h-5" />, emoji: "🤒" },
  { id: "mental", name: "Santé mentale", icon: <Brain className="w-5 h-5" />, emoji: "🧠" },
  { id: "testimonials", name: "Témoignages et interviews", icon: <MessageSquare className="w-5 h-5" />, emoji: "🗣️" },
  { id: "pharmacy", name: "Pharmacie et médicaments", icon: <Pill className="w-5 h-5" />, emoji: "💊" },
  { id: "emergency", name: "Urgences et conseils rapides", icon: <AlertCircle className="w-5 h-5" />, emoji: "🚨" },
]

// Articles d'actualités
const newsArticles = [
  {
    id: 1,
    title: "Gabon : poursuite des visites médicales pour les candidats à la présidentielle",
    excerpt:
      "Le ministère de la Santé poursuit les visites médicales obligatoires pour tous les candidats à l'élection présidentielle...",
    category: "public",
    author: "Dr. Marie Obame",
    date: "2024-01-15",
    image: images.doctors1,
    likes: 45,
    comments: 12,
    views: 234,
    featured: true,
  },
  {
    id: 2,
    title: "Chirurgie pédiatrique : Le Gabon ambitionne de réduire les évacuations sanitaires",
    excerpt:
      "Le gouvernement gabonais met en place un programme pour renforcer les capacités en chirurgie pédiatrique afin de limiter les évacuations sanitaires...",
    category: "medical",
    author: "Prof. Jean Nzé",
    date: "2024-01-14",
    image: images.pediatric,
    likes: 67,
    comments: 23,
    views: 456,
  },
  {
    id: 3,
    title: "Santé : le Gabon compte 784 sages-femmes en fin 2020",
    excerpt:
      "Le Gabon renforce son personnel médical avec près de 800 sages-femmes qualifiées pour améliorer la santé maternelle...",
    category: "public",
    author: "Sylvie Mba",
    date: "2024-01-13",
    image: images.doctors2,
    likes: 89,
    comments: 34,
    views: 678,
  },
  {
    id: 4,
    title: "Implantation des piles cardiaques désormais possible au Gabon",
    excerpt:
      "Une avancée majeure dans le domaine de la cardiologie au Gabon avec la possibilité d'implanter des piles cardiaques localement...",
    category: "medical",
    author: "Dr. Pierre-André Kombila",
    date: "2024-01-12",
    image: images.cardioMedecin,
    likes: 120,
    comments: 45,
    views: 890,
  },
  {
    id: 5,
    title: "L'hôpital de Melen se dote d'un nouveau service de neurologie",
    excerpt:
      "L'Hôpital Régional de l'Estuaire Melen inaugure un nouveau service de neurologie équipé des dernières technologies...",
    category: "medical",
    author: "Dr. François Ndong",
    date: "2024-01-11",
    image: images.melenGab,
    likes: 56,
    comments: 18,
    views: 345,
  },
  {
    id: 6,
    title: "Campagne de sensibilisation sur la santé mentale dans les écoles de Libreville",
    excerpt:
      "Une initiative pour sensibiliser les jeunes aux enjeux de la santé mentale et briser les tabous dans les établissements scolaires...",
    category: "mental",
    author: "Dr. Claire Mouele",
    date: "2024-01-10",
    image: "/placeholder.svg?height=200&width=300&text=Santé+mentale",
    likes: 78,
    comments: 29,
    views: 567,
  },
]

// Provinces du Gabon
const provinces = [
  { id: "estuaire", name: "Estuaire", capital: "Libreville" },
  { id: "haut-ogooue", name: "Haut-Ogooué", capital: "Franceville" },
  { id: "moyen-ogooue", name: "Moyen-Ogooué", capital: "Lambaréné" },
  { id: "ngounie", name: "Ngounié", capital: "Mouila" },
  { id: "nyanga", name: "Nyanga", capital: "Tchibanga" },
  { id: "ogooue-ivindo", name: "Ogooué-Ivindo", capital: "Makokou" },
  { id: "ogooue-lolo", name: "Ogooué-Lolo", capital: "Koulamoutou" },
  { id: "ogooue-maritime", name: "Ogooué-Maritime", capital: "Port-Gentil" },
  { id: "woleu-ntem", name: "Woleu-Ntem", capital: "Oyem" },
]

// Actualités par province
const provinceNews = [
  {
    provinceId: "estuaire",
    title: "Nouvelle unité de dialyse à l'hôpital de Melen",
    image: images.melen2,
  },
  {
    provinceId: "haut-ogooue",
    title: "Campagne de vaccination contre la méningite à Franceville",
    image: "/placeholder.svg?height=200&width=300&text=Vaccination+Franceville",
  },
  {
    provinceId: "ogooue-maritime",
    title: "Rénovation du service pédiatrique de l'hôpital de Port-Gentil",
    image: "/placeholder.svg?height=200&width=300&text=Hôpital+Port-Gentil",
  },
]

// Vidéos
const videos = [
  {
    id: 1,
    title: "Les avancées de la cardiologie au Gabon",
    thumbnail: images.cardioMedecin,
    duration: "12:34",
    views: 1245,
  },
  {
    id: 2,
    title: "Interview avec le ministre de la Santé",
    thumbnail: images.doctors3,
    duration: "08:21",
    views: 987,
  },
  {
    id: 3,
    title: "Reportage: La médecine traditionnelle gabonaise",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Médecine+Traditionnelle",
    duration: "15:47",
    views: 2345,
  },
]

// Interviews d'experts
const expertInterviews = [
  {
    id: 1,
    expert: "Dr. Pierre-André Kombila",
    title: "Premier cardiologue gabonais",
    topic: "L'évolution de la cardiologie au Gabon",
    image: images.cardioMedecin,
  },
  {
    id: 2,
    expert: "Dr. Marie Ndong",
    title: "Spécialiste en santé publique",
    topic: "Les défis sanitaires dans les zones rurales",
    image: images.doctors2,
  },
]

// Événements en direct
const liveEvents = [
  {
    id: 1,
    title: "Conférence sur la prévention du paludisme",
    date: "Aujourd'hui, 15h00",
    status: "En direct",
  },
  {
    id: 2,
    title: "Webinaire: Nutrition et santé",
    date: "Demain, 10h00",
    status: "À venir",
  },
]

export default function ActualitesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const scrollContainerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  // Fonction pour faire défiler horizontalement
  const scroll = (containerId: string, direction: "left" | "right") => {
    const container = scrollContainerRefs.current[containerId]
    if (container) {
      const scrollAmount = 300
      if (direction === "left") {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" })
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" })
      }
    }
  }

  // Filtrer les articles par catégorie
  const filteredArticles =
    selectedCategory === "all" ? newsArticles : newsArticles.filter((article) => article.category === selectedCategory)

  // Article à la une
  const featuredArticle = newsArticles.find((article) => article.featured) || newsArticles[0]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Bannière principale avec image et titre */}
      <div className="relative h-[400px] overflow-hidden">
        <Image
          src={featuredArticle.image || "/placeholder.svg"}
          alt={featuredArticle.title}
          fill
          className="object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-12 relative z-10">
          <Badge className="mb-4 bg-blue-600">
            {newsCategories.find((c) => c.id === featuredArticle.category)?.name}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl">{featuredArticle.title}</h1>
          <p className="text-white/90 text-lg max-w-2xl mb-6">{featuredArticle.excerpt}</p>
          <div className="flex items-center gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700">Lire l'article</Button>
            <Button variant="outline" className="text-white border-white hover:bg-white/20">
              <Share2 className="w-4 h-4 mr-2" />
              Partager
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Bouton menu mobile */}
        <div className="lg:hidden mb-6">
          <Button variant="outline" className="flex items-center gap-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            {isMenuOpen ? "Fermer le menu" : "Menu des rubriques"}
          </Button>
        </div>

        {/* Layout principal */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Menu latéral */}
          <AnimatePresence>
            {(isMenuOpen || window.innerWidth >= 1024) && (
              <motion.aside
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className={`lg:w-64 bg-white rounded-lg shadow-lg p-4 ${
                  isMenuOpen ? "fixed inset-0 z-50 w-full lg:relative lg:inset-auto" : "hidden lg:block"
                }`}
              >
                <div className="lg:sticky lg:top-24">
                  <h2 className="text-xl font-bold mb-4 flex items-center">
                    <Newspaper className="w-5 h-5 mr-2 text-blue-600" />
                    Rubriques
                  </h2>
                  <div className="space-y-1">
                    <Button
                      variant={selectedCategory === "all" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory("all")}
                    >
                      Toutes les actualités
                    </Button>
                    {newsCategories.map((category) => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        <span className="mr-2">{category.emoji}</span>
                        {category.name}
                      </Button>
                    ))}
                  </div>

                  <div className="mt-8">
                    <h3 className="font-semibold mb-3 text-gray-500 uppercase text-sm">Formats</h3>
                    <div className="space-y-1">
                      <Button variant="ghost" className="w-full justify-start">
                        <Video className="w-4 h-4 mr-2" />
                        Vidéos
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <Mic className="w-4 h-4 mr-2" />
                        Podcasts
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <Globe className="w-4 h-4 mr-2" />
                        Événements
                      </Button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="font-semibold mb-3 text-gray-500 uppercase text-sm">Suivre</h3>
                    <div className="space-y-1">
                      <Button variant="ghost" className="w-full justify-start">
                        <Bookmark className="w-4 h-4 mr-2" />
                        Articles sauvegardés
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <Bell className="w-4 h-4 mr-2" />
                        Notifications
                      </Button>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold mb-2">Newsletter santé</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Recevez les dernières actualités médicales du Gabon directement dans votre boîte mail.
                    </p>
                    <Button className="w-full bg-blue-600">S'abonner</Button>
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Contenu principal */}
          <main className="flex-1">
            {/* Tabs pour mobile */}
            <div className="lg:hidden mb-6 overflow-x-auto">
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="inline-flex w-max">
                  <TabsTrigger value="all">Tous</TabsTrigger>
                  {newsCategories.map((category) => (
                    <TabsTrigger key={category.id} value={category.id}>
                      {category.emoji} {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {/* Section 1: Actualités médicales */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center">
                  <Activity className="w-6 h-6 mr-2 text-blue-600" />
                  Actualités médicales 🏥
                </h2>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => scroll("medical-news", "left")}
                    className="rounded-full"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => scroll("medical-news", "right")}
                    className="rounded-full"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div
                className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar"
                ref={(el) => (scrollContainerRefs.current["medical-news"] = el)}
              >
                {newsArticles
                  .filter((article) => article.category === "medical")
                  .map((article) => (
                    <Card key={article.id} className="min-w-[300px] max-w-[300px] hover:shadow-lg transition-shadow">
                      <div className="relative h-40">
                        <Image
                          src={article.image || "/placeholder.svg"}
                          alt={article.title}
                          fill
                          className="object-cover rounded-t-lg"
                        />
                        <Badge className="absolute top-2 left-2">
                          {newsCategories.find((c) => c.id === article.category)?.name}
                        </Badge>
                      </div>
                      <CardHeader className="p-4 pb-0">
                        <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4">
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{article.author}</span>
                          <span>{new Date(article.date).toLocaleDateString("fr-FR")}</span>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3">
                            <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                              <Heart className="w-4 h-4" />
                              <span className="text-xs">{article.likes}</span>
                            </button>
                            <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                              <MessageCircle className="w-4 h-4" />
                              <span className="text-xs">{article.comments}</span>
                            </button>
                          </div>
                          <span className="text-xs flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            {article.views}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </section>

            {/* Section 2: Santé publique */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center">
                  <Globe className="w-6 h-6 mr-2 text-green-600" />
                  Santé publique 🌍
                </h2>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => scroll("public-health", "left")}
                    className="rounded-full"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => scroll("public-health", "right")}
                    className="rounded-full"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div
                className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar"
                ref={(el) => (scrollContainerRefs.current["public-health"] = el)}
              >
                {newsArticles
                  .filter((article) => article.category === "public")
                  .map((article) => (
                    <Card key={article.id} className="min-w-[300px] max-w-[300px] hover:shadow-lg transition-shadow">
                      <div className="relative h-40">
                        <Image
                          src={article.image || "/placeholder.svg"}
                          alt={article.title}
                          fill
                          className="object-cover rounded-t-lg"
                        />
                        <Badge className="absolute top-2 left-2 bg-green-600">
                          {newsCategories.find((c) => c.id === article.category)?.name}
                        </Badge>
                      </div>
                      <CardHeader className="p-4 pb-0">
                        <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4">
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{article.author}</span>
                          <span>{new Date(article.date).toLocaleDateString("fr-FR")}</span>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3">
                            <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                              <Heart className="w-4 h-4" />
                              <span className="text-xs">{article.likes}</span>
                            </button>
                            <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                              <MessageCircle className="w-4 h-4" />
                              <span className="text-xs">{article.comments}</span>
                            </button>
                          </div>
                          <span className="text-xs flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            {article.views}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </section>

            {/* Section 3: Nos vidéos */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center">
                  <Video className="w-6 h-6 mr-2 text-red-600" />
                  Nos vidéos
                </h2>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => scroll("videos", "left")}
                    className="rounded-full"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => scroll("videos", "right")}
                    className="rounded-full"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div
                className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar"
                ref={(el) => (scrollContainerRefs.current["videos"] = el)}
              >
                {videos.map((video) => (
                  <div key={video.id} className="min-w-[350px] max-w-[350px] group">
                    <div className="relative h-48 rounded-lg overflow-hidden">
                      <Image
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-14 h-14 rounded-full bg-white/80 flex items-center justify-center">
                          <Play className="w-6 h-6 text-red-600 ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <h3 className="font-medium mt-2">{video.title}</h3>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                      <Eye className="w-3 h-3 mr-1" />
                      {video.views} vues
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 4: Provinces */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center">
                  <MapPin className="w-6 h-6 mr-2 text-purple-600" />
                  Provinces
                </h2>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => scroll("provinces", "left")}
                    className="rounded-full"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => scroll("provinces", "right")}
                    className="rounded-full"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div
                className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar"
                ref={(el) => (scrollContainerRefs.current["provinces"] = el)}
              >
                {provinces.map((province) => {
                  const news = provinceNews.find((n) => n.provinceId === province.id)
                  return (
                    <Card key={province.id} className="min-w-[250px] max-w-[250px] hover:shadow-lg transition-shadow">
                      <div className="relative h-32">
                        <Image
                          src={news?.image || "/placeholder.svg?height=150&width=250&text=" + province.name}
                          alt={province.name}
                          fill
                          className="object-cover rounded-t-lg"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-2 left-2 text-white">
                          <h3 className="font-bold">{province.name}</h3>
                          <p className="text-xs">{province.capital}</p>
                        </div>
                      </div>
                      <CardContent className="p-3">
                        <p className="text-sm font-medium line-clamp-2">
                          {news?.title || `Actualités de la province du ${province.name}`}
                        </p>
                        <Button variant="link" className="p-0 h-auto text-blue-600 text-xs mt-1">
                          Voir les actualités
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </section>

            {/* Section 5: Reportages */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center">
                  <Newspaper className="w-6 h-6 mr-2 text-orange-600" />
                  Reportages
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-64">
                    <Image
                      src={images.egypto2 || "/placeholder.svg"}
                      alt="Hôpital Egypto-Gabonais"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <Badge className="bg-orange-600 mb-2">Reportage</Badge>
                      <h3 className="text-xl font-bold">Visite de l'Hôpital de la Coopération Egypto-Gabonaise</h3>
                      <p className="text-sm mt-1">Un établissement moderne au service des Gabonais</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        Jean-Pierre Mboumba
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        12 janvier 2024
                      </span>
                    </div>
                    <p className="text-gray-600 line-clamp-3">
                      Découvrez les coulisses de l'Hôpital de la Coopération Egypto-Gabonaise, un établissement qui
                      offre des soins de qualité et dispose d'équipements modernes pour répondre aux besoins de la
                      population gabonaise.
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <Button>Lire le reportage</Button>
                      <div className="flex items-center gap-3">
                        <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                          <Heart className="w-4 h-4" />
                          <span className="text-xs">45</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-64">
                    <Image
                      src={images.melen2 || "/placeholder.svg"}
                      alt="Hôpital de Melen"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <Badge className="bg-orange-600 mb-2">Reportage</Badge>
                      <h3 className="text-xl font-bold">L'Hôpital Régional de Melen se modernise</h3>
                      <p className="text-sm mt-1">Nouveaux équipements et services pour les patients</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        Marie Ndong
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        10 janvier 2024
                      </span>
                    </div>
                    <p className="text-gray-600 line-clamp-3">
                      L'Hôpital Régional de l'Estuaire Melen continue sa modernisation avec l'acquisition de nouveaux
                      équipements médicaux et l'amélioration de ses services pour mieux servir la population de
                      l'Estuaire.
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <Button>Lire le reportage</Button>
                      <div className="flex items-center gap-3">
                        <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                          <Heart className="w-4 h-4" />
                          <span className="text-xs">32</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Section 6: Interviews d'experts */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center">
                  <Mic className="w-6 h-6 mr-2 text-indigo-600" />
                  Interviews d'experts
                </h2>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => scroll("interviews", "left")}
                    className="rounded-full"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => scroll("interviews", "right")}
                    className="rounded-full"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div
                className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar"
                ref={(el) => (scrollContainerRefs.current["interviews"] = el)}
              >
                {expertInterviews.map((interview) => (
                  <Card key={interview.id} className="min-w-[350px] max-w-[350px] hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <Image
                        src={interview.image || "/placeholder.svg"}
                        alt={interview.expert}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-indigo-600">Interview</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-1">{interview.expert}</h3>
                      <p className="text-sm text-gray-600 mb-2">{interview.title}</p>
                      <p className="text-gray-700 font-medium mb-4">{interview.topic}</p>
                      <div className="flex justify-between items-center">
                        <Button>Écouter l'interview</Button>
                        <div className="flex items-center gap-2">
                          <button className="hover:text-red-500 transition-colors">
                            <Heart className="w-4 h-4" />
                          </button>
                          <button className="hover:text-blue-500 transition-colors">
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Section 7: En direct et archives */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Activity className="w-6 h-6 mr-2 text-red-600" />
                En direct et archives
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Événements en direct */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                      En direct
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {liveEvents.map((event) => (
                        <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-medium">{event.title}</h4>
                            <p className="text-sm text-gray-600">{event.date}</p>
                          </div>
                          <Badge variant={event.status === "En direct" ? "destructive" : "secondary"}>
                            {event.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Archives */}
                <Card>
                  <CardHeader>
                    <CardTitle>Archives</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Link href="#" className="block p-3 hover:bg-gray-50 rounded-lg transition-colors">
                        <h4 className="font-medium">Conférence sur la vaccination COVID-19</h4>
                        <p className="text-sm text-gray-600">15 décembre 2023</p>
                      </Link>
                      <Link href="#" className="block p-3 hover:bg-gray-50 rounded-lg transition-colors">
                        <h4 className="font-medium">Table ronde: Santé maternelle au Gabon</h4>
                        <p className="text-sm text-gray-600">8 décembre 2023</p>
                      </Link>
                      <Link href="#" className="block p-3 hover:bg-gray-50 rounded-lg transition-colors">
                        <h4 className="font-medium">Webinaire: Prévention du paludisme</h4>
                        <p className="text-sm text-gray-600">1er décembre 2023</p>
                      </Link>
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      Voir toutes les archives
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* CSS pour masquer la scrollbar */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
