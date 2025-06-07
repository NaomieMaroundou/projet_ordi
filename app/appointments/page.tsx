import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, MapPin, ArrowLeft, Plus, CalendarIcon } from "lucide-react"
import { ChatBot } from "@/components/chat-bot"

export default function AppointmentsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container flex items-center justify-between p-4">
          <div className="flex items-center">
            <Link href="/" className="mr-3">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-lg font-bold">Mes Rendez-vous</h1>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700" asChild>
            <Link href="/appointments/new">
              <Plus className="w-4 h-4 mr-1" />
              Nouveau rendez-vous
            </Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container p-4">
        {/* Upcoming Appointments */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Rendez-vous à venir</h2>
          <div className="space-y-4">
            {[
              {
                id: 1,
                doctor: "Dr. Jean Moussavou",
                specialty: "Cardiologie",
                facility: "Hôpital Central de Libreville",
                date: "15 avril 2025",
                time: "10:30",
                status: "confirmed",
              },
              {
                id: 2,
                doctor: "Dr. Marie Ndong",
                specialty: "Pédiatrie",
                facility: "Centre Hospitalier de Franceville",
                date: "22 avril 2025",
                time: "14:00",
                status: "pending",
              },
            ].map((appointment) => (
              <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-3 md:mb-0">
                      <h3 className="font-bold text-lg">{appointment.doctor}</h3>
                      <p className="text-blue-600 text-sm">{appointment.specialty}</p>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{appointment.facility}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-start md:items-end">
                      <div className="flex items-center text-sm font-medium">
                        <Calendar className="w-4 h-4 mr-1 text-blue-600" />
                        <span>{appointment.date}</span>
                      </div>
                      <div className="flex items-center text-sm mt-1">
                        <Clock className="w-4 h-4 mr-1 text-blue-600" />
                        <span>{appointment.time}</span>
                      </div>
                      <div className="mt-2">
                        {appointment.status === "confirmed" ? (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Confirmé</span>
                        ) : (
                          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                            En attente
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1 text-blue-600 border-blue-600" asChild>
                      <Link href={`/appointments/${appointment.id}`}>Détails</Link>
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 text-red-600 border-red-600" asChild>
                      <Link href={`/appointments/${appointment.id}/cancel`}>Annuler</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Past Appointments */}
        <div>
          <h2 className="text-xl font-bold mb-4">Historique des rendez-vous</h2>
          <div className="space-y-4">
            {[
              {
                id: 3,
                doctor: "Dr. Pierre Obame",
                specialty: "Neurologie",
                facility: "Hôpital Régional de Port-Gentil",
                date: "10 mars 2025",
                time: "09:15",
                status: "completed",
              },
              {
                id: 4,
                doctor: "Dr. Sophie Mba",
                specialty: "Ophtalmologie",
                facility: "Clinique El Rapha, Libreville",
                date: "25 février 2025",
                time: "16:30",
                status: "cancelled",
              },
            ].map((appointment) => (
              <Card key={appointment.id} className="hover:shadow-md transition-shadow opacity-75">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-3 md:mb-0">
                      <h3 className="font-bold text-lg">{appointment.doctor}</h3>
                      <p className="text-blue-600 text-sm">{appointment.specialty}</p>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{appointment.facility}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-start md:items-end">
                      <div className="flex items-center text-sm font-medium">
                        <Calendar className="w-4 h-4 mr-1 text-blue-600" />
                        <span>{appointment.date}</span>
                      </div>
                      <div className="flex items-center text-sm mt-1">
                        <Clock className="w-4 h-4 mr-1 text-blue-600" />
                        <span>{appointment.time}</span>
                      </div>
                      <div className="mt-2">
                        {appointment.status === "completed" ? (
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Terminé</span>
                        ) : (
                          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Annulé</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1 text-blue-600 border-blue-600" asChild>
                      <Link href={`/appointments/${appointment.id}`}>Détails</Link>
                    </Button>
                    {appointment.status === "completed" && (
                      <Button variant="outline" size="sm" className="flex-1 text-green-600 border-green-600" asChild>
                        <Link href={`/appointments/${appointment.id}/feedback`}>Donner un avis</Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* No Appointments State */}
        {false && (
          <div className="flex flex-col items-center justify-center py-12">
            <CalendarIcon className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun rendez-vous</h3>
            <p className="text-gray-500 text-center mb-6 max-w-md">
              Vous n&apos;avez pas encore pris de rendez-vous. Prenez rendez-vous avec un médecin pour commencer.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/appointments/new">
                <Plus className="w-4 h-4 mr-1" />
                Prendre rendez-vous
              </Link>
            </Button>
          </div>
        )}
      </main>

      {/* Chatbot */}
      <ChatBot />
    </div>
  )
}
