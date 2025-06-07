"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

export function DoctorAnimation() {
  const [isVisible, setIsVisible] = useState(false)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 100 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative"
    >
      <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-100 rounded-full z-0" />
      <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-green-100 rounded-full z-0" />
      <div className="relative z-10 rounded-xl overflow-hidden shadow-xl">
        {!imageError ? (
          <Image
            src="/images/medecin1e.jpg"
            alt="Médecin souriant"
            width={400}
            height={500}
            className="object-cover"
            priority
            onError={() => {
              setImageError(true)
            }}
          />
        ) : (
          <Image
            src="/placeholder.svg?height=500&width=400&text=Médecin"
            alt="Médecin souriant"
            width={400}
            height={500}
            className="object-cover"
          />
        )}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute -bottom-4 -right-4 bg-white p-3 rounded-lg shadow-lg z-20"
      >
        <p className="text-blue-600 font-bold">Dr. Koumba</p>
        <p className="text-sm text-gray-600">Cardiologue</p>
      </motion.div>
    </motion.div>
  )
}
