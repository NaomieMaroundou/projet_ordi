"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

const images = [
  {
    src: "/images/medecin1e.jpg",
    alt: "Dr. Koumba, Cardiologue",
  },
  {
    src: "/images/doctors-team.png",
    alt: "Équipe médicale",
  },
  {
    src: "/images/hospital1.png",
    alt: "Hôpital de Libreville",
  },
  {
    src: "/images/hospital2.png",
    alt: "Centre hospitalier",
  },
]

export function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-[500px]">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image.src || `/placeholder.svg?height=800&width=1200&text=${encodeURIComponent(image.alt)}`}
            alt={image.alt}
            width={1200}
            height={800}
            className="w-full h-full object-cover object-center"
            priority={index === 0}
            onError={(e) => {
              // Si l'image ne peut pas être chargée, utiliser un placeholder
              e.currentTarget.src = `/placeholder.svg?height=800&width=1200&text=${encodeURIComponent(image.alt)}`
            }}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/60 to-blue-400/40 flex flex-col justify-center items-center text-center px-6">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-md">Votre santé, notre priorité</h1>
          <p className="text-white text-lg mb-8 drop-shadow-md">Accédez aux meilleurs services de santé au Gabon</p>
          <div className="flex gap-4 justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700 text-lg py-6 px-8" asChild>
              <a href="/doctors">Trouver un médecin</a>
            </Button>
            <Button
              variant="outline"
              className="bg-transparent text-white border-2 border-white hover:bg-white/20 text-lg py-6 px-8"
              asChild
            >
              <a href="/appointments">
                <Calendar className="w-5 h-5 mr-2" />
                Prendre rendez-vous
              </a>
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
            aria-label={`Voir image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
