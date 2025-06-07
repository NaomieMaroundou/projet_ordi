"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Play, Quote, Star } from "lucide-react"
import { motion } from "framer-motion"

type Testimonial = {
  id: number
  name: string
  age?: number
  location: string
  image: string
  text: string
  type: "patient" | "doctor"
  specialty?: string
  experience?: number
  condition?: string
  videoUrl?: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Marie Ndong",
    age: 45,
    location: "Libreville",
    image: "/placeholder.svg?height=300&width=300&text=Marie",
    text: "Après mon diagnostic de cancer du sein, j'ai reçu un traitement exceptionnel à l'Hôpital Central de Libreville. Grâce à l'équipe médicale dévouée, j'ai pu vaincre la maladie et retrouver une vie normale. Je suis reconnaissante pour les soins de qualité que j'ai reçus.",
    type: "patient",
    condition: "Cancer du sein",
    videoUrl: "#video-temoignage-1",
    rating: 5,
  },
  {
    id: 2,
    name: "Dr. Jean Moussavou",
    location: "Port-Gentil",
    image: "/placeholder.svg?height=300&width=300&text=Dr.+Jean",
    text: "En tant que chirurgien cardiaque avec plus de 20 ans d'expérience, j'ai vu l'évolution remarquable des soins de santé au Gabon. Notre équipe réalise maintenant des interventions complexes qui nécessitaient auparavant des évacuations à l'étranger. Nous sommes fiers de pouvoir offrir ces services à nos compatriotes.",
    type: "doctor",
    specialty: "Chirurgie cardiaque",
    experience: 20,
    videoUrl: "#video-temoignage-2",
    rating: 5,
  },
  {
    id: 3,
    name: "Pierre Obame",
    age: 32,
    location: "Franceville",
    image: "/placeholder.svg?height=300&width=300&text=Pierre",
    text: "Suite à un grave accident de la route, j'ai été pris en charge rapidement par le SAMU puis transféré au Centre Hospitalier de Franceville. La rapidité d'intervention et la qualité des soins m'ont sauvé la vie. Aujourd'hui, après plusieurs mois de rééducation, j'ai retrouvé ma mobilité.",
    type: "patient",
    condition: "Traumatisme suite à un accident",
    videoUrl: "#video-temoignage-3",
    rating: 5,
  },
  {
    id: 4,
    name: "Dr. Sophie Mba",
    location: "Libreville",
    image: "/placeholder.svg?height=300&width=300&text=Dr.+Sophie",
    text: "En tant que pédiatre, je suis témoin chaque jour des progrès réalisés dans la santé infantile au Gabon. Nos programmes de vaccination et de nutrition ont considérablement réduit la mortalité infantile. C'est gratifiant de voir les enfants que nous avons soignés grandir en bonne santé.",
    type: "doctor",
    specialty: "Pédiatrie",
    experience: 15,
    videoUrl: "#video-temoignage-4",
    rating: 5,
  },
  {
    id: 5,
    name: "Jeanne Koumba",
    age: 28,
    location: "Oyem",
    image: "/placeholder.svg?height=300&width=300&text=Jeanne",
    text: "Grâce au programme de dépistage précoce du paludisme dans ma région, ma fille a pu être diagnostiquée et traitée rapidement. Les agents de santé communautaire font un travail remarquable pour sensibiliser et soigner les populations rurales. Ma fille est maintenant en parfaite santé.",
    type: "patient",
    condition: "Paludisme sévère",
    videoUrl: "#video-temoignage-5",
    rating: 4,
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showVideo, setShowVideo] = useState(false)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    setShowVideo(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
    setShowVideo(false)
  }

  const toggleVideo = () => {
    setShowVideo(!showVideo)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div className="w-full py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Témoignages de nos patients</h2>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={prevTestimonial} className="rounded-full">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Précédent
          </Button>
          <Button variant="outline" size="sm" onClick={nextTestimonial} className="rounded-full">
            Suivant
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="overflow-hidden shadow-md rounded-lg">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 relative">
                {showVideo ? (
                  <div className="w-full h-full min-h-[300px] bg-black flex items-center justify-center">
                    <video src={currentTestimonial.videoUrl} controls className="w-full h-full object-contain">
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ) : (
                  <div className="relative">
                    <Image
                      src={currentTestimonial.image || "/placeholder.svg"}
                      alt={currentTestimonial.name}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover min-h-[300px]"
                    />
                    {currentTestimonial.videoUrl && (
                      <Button
                        className="absolute bottom-4 right-4 bg-blue-600/90 hover:bg-blue-700 rounded-full"
                        size="sm"
                        onClick={toggleVideo}
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Voir la vidéo
                      </Button>
                    )}
                  </div>
                )}
              </div>
              <div className="md:w-2/3 p-6">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-bold">{currentTestimonial.name}</h3>
                    <p className="text-sm text-gray-500">
                      {currentTestimonial.age && `${currentTestimonial.age} ans, `}
                      {currentTestimonial.location}
                    </p>
                  </div>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < currentTestimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  {currentTestimonial.type === "patient" ? (
                    <div className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mb-2">
                      Patient{currentTestimonial.condition ? ` • ${currentTestimonial.condition}` : ""}
                    </div>
                  ) : (
                    <div className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-2">
                      Médecin • {currentTestimonial.specialty} • {currentTestimonial.experience} ans d&apos;expérience
                    </div>
                  )}
                </div>

                <div className="relative">
                  <Quote className="absolute top-0 left-0 w-8 h-8 text-blue-100 -translate-x-2 -translate-y-2" />
                  <p className="text-gray-700 italic relative z-10 pl-4">{currentTestimonial.text}</p>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <div className="text-xs text-gray-500">
                    Témoignage {currentIndex + 1} sur {testimonials.length}
                  </div>
                  {currentTestimonial.videoUrl && !showVideo && (
                    <Button variant="ghost" size="sm" onClick={toggleVideo} className="text-blue-600">
                      <Play className="w-4 h-4 mr-1" />
                      Voir son témoignage vidéo
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="flex justify-center mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 mx-1 rounded-full ${
              index === currentIndex ? "bg-blue-600" : "bg-gray-300"
            } transition-colors`}
            onClick={() => {
              setCurrentIndex(index)
              setShowVideo(false)
            }}
            aria-label={`Voir témoignage ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
