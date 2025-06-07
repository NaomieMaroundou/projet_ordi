"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, MapPin, ArrowLeft, Phone, MessageCircle, FileText, Check, X, Star } from "lucide-react"
import Image from "next/image"
import { ChatBot } from "@/components/chat-bot"

export default function AppointmentDetailPage({ params }: { params: { id: string } }) {
  // Dans une application réelle, nous récupérerions les données du rendez-vous à partir d'une API ou d'une base de données
  // Pour cette démonstration, nous utilisons des données statiques
  const appointmentData = {
    id: params.id,
    doctor: {
      name: "Dr. Jean Moussavou",
      specialty: "Cardiologie",
      image: "/images/doctor1.png",
      phone: "+241 77 12 34 56",
    },
    facility: "Hôpital Central de Libreville",
    address: "Boulevard Omar Bongo, Libreville - Estuaire",
    date: "15 avril 2025",
    time: "10:30",
    status: params.id === "1" ? "confirmed" : params.id === "2" ? "pending" : "completed",
    notes: "Consultation de routine pour suivi cardiaque. Apporter les résultats des derniers examens.",
    documents: ["Électrocardiogramme", "Analyse de sang", "Radiographie thoracique"],
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container flex items-center p-4">
          <Link href="/appointments" className="mr-3">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-bold">Détails du rendez-vous</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container p-4">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div
                  className={`w-3 h-3 rounded-full mr-2 ${
                    appointmentData.status === "confirmed"
                      ? "bg-green-500"
                      : appointmentData.status === "pending"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                  }`}
                ></div>
                <span
                  className={`text-sm font-medium ${
                    appointmentData.status === "confirmed"
                      ? "text-green-600"
                      : appointmentData.status === "pending"
                        ? "text-yellow-600"
                        : "text-blue-600"
                  }`}
                >
                  {appointmentData.status === "confirmed"
                    ? "Confirmé"
                    : appointmentData.status === "pending"
                      ? "En attente"
                      : "Terminé"}
                </span>
              </div>
              <div className="text-sm text-gray-500">Rendez-vous #{appointmentData.id}</div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="flex items-center mb-4">
                  <Image
                    src={appointmentData.doctor.image || "/placeholder.svg?height=80&width=80&text=Dr"}
                    alt={appointmentData.doctor.name}
                    width={80}
                    height={80}
                    className="rounded-full object-cover mr-4"
                  />
                  <div>
                    <h2 className="font-bold text-lg">{appointmentData.doctor.name}</h2>
                    <p className="text-blue-600">{appointmentData.doctor.specialty}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-blue-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">{appointmentData.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-blue-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Heure</p>
                      <p className="font-medium">{appointmentData.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-blue-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Lieu</p>
                      <p className="font-medium">{appointmentData.facility}</p>
                      <p className="text-sm text-gray-500">{appointmentData.address}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <Button variant="outline" className="flex items-center justify-center" asChild>
                    <Link href={`tel:${appointmentData.doctor.phone}`}>
                      <Phone className="w-4 h-4 mr-2" />
                      Appeler
                    </Link>
                  </Button>
                  <Button variant="outline" className="flex items-center justify-center" asChild>
                    <Link href={`/messages?doctor=${encodeURIComponent(appointmentData.doctor.name)}`}>
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Envoyer un message
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="md:w-2/3">
                <Card className="mb-4">
                  <CardContent className="p-4">
                    <h3 className="font-bold mb-2 flex items-center">
                      <FileText className="w-4 h-4 mr-2 text-blue-600" />
                      Notes
                    </h3>
                    <p className="text-gray-700">{appointmentData.notes}</p>
                  </CardContent>
                </Card>

                <Card className="mb-4">
                  <CardContent className="p-4">
                    <h3 className="font-bold mb-2">Documents à apporter</h3>
                    <ul className="space-y-2">
                      {appointmentData.documents.map((doc, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="w-4 h-4 text-green-600 mr-2" />
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <div className="flex flex-col space-y-3">
                  {appointmentData.status === "confirmed" && (
                    <>
                      <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                        <Link href={`/appointments/${appointmentData.id}/reschedule`}>
                          <Calendar className="w-4 h-4 mr-2" />
                          Reprogrammer
                        </Link>
                      </Button>
                      <Button variant="destructive" asChild>
                        <Link href={`/appointments/${appointmentData.id}/cancel`}>
                          <X className="w-4 h-4 mr-2" />
                          Annuler le rendez-vous
                        </Link>
                      </Button>
                    </>
                  )}
                  {appointmentData.status === "completed" && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-3">Évaluez votre consultation</h4>
                      <div className="flex items-center gap-2 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => {
                              console.log(`Note donnée: ${star} étoiles`)
                              // Logique de sauvegarde de la note
                            }}
                            className="focus:outline-none hover:scale-110 transition-transform"
                          >
                            <Star className="w-6 h-6 text-yellow-400 hover:text-yellow-500 fill-current" />
                          </button>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600">Cliquez sur les étoiles pour noter</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/appointments">Retour à la liste</Link>
          </Button>
          {appointmentData.status === "confirmed" && (
            <Button className="bg-blue-600 hover:bg-blue-700" asChild>
              <Link href={`/appointments/${appointmentData.id}/prepare`}>
                <Check className="w-4 h-4 mr-2" />
                Préparer ma visite
              </Link>
            </Button>
          )}
        </div>
      </main>

      {/* Chatbot */}
      <ChatBot />
    </div>
  )
}
