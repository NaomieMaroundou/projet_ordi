"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Phone,
  MapPin,
  AlertTriangle,
  Heart,
  Activity,
  Zap,
  Navigation,
  Car,
  Ambulance,
  Shield,
  Info,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function EmergencyPage() {
  const [selectedEmergency, setSelectedEmergency] = useState(null)

  const emergencyNumbers = [
    {
      service: "SAMU",
      number: "1515",
      description: "Service d'Aide Médicale Urgente",
      icon: <Ambulance className="w-8 h-8 text-red-500" />,
      available: "24h/24",
    },
    {
      service: "Pompiers",
      number: "18",
      description: "Secours et lutte contre l'incendie",
      icon: <Shield className="w-8 h-8 text-orange-500" />,
      available: "24h/24",
    },
    {
      service: "Police",
      number: "17",
      description: "Police Nationale",
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      available: "24h/24",
    },
    {
      service: "Centre Anti-Poison",
      number: "+241 76 12 34 56",
      description: "Intoxications et empoisonnements",
      icon: <Heart className="w-8 h-8 text-purple-500" />,
      available: "24h/24",
    },
  ]

  const emergencyFacilities = [
    {
      name: "CHU Libreville - Urgences",
      address: "Boulevard Omar Bongo, Libreville",
      phone: "+241 77 12 34 56",
      distance: "2.5 km",
      waitTime: "15 min",
      status: "Ouvert",
      services: ["Urgences générales", "Cardiologie", "Traumatologie", "Pédiatrie"],
      image: "/images/chu-libreville-entrance.png",
      coordinates: { lat: 0.3924, lng: 9.4536 },
    },
    {
      name: "Hôpital Egypto-Gabonais - Urgences",
      address: "Quartier Nzeng-Ayong, Libreville",
      phone: "+241 77 98 76 54",
      distance: "3.2 km",
      waitTime: "25 min",
      status: "Ouvert",
      services: ["Urgences générales", "Maternité", "Pédiatrie"],
      image: "/images/egypto-gab.png",
      coordinates: { lat: 0.3833, lng: 9.45 },
    },
    {
      name: "Hôpital Melen - Urgences",
      address: "Melen, Libreville",
      phone: "+241 74 56 78 90",
      distance: "5.1 km",
      waitTime: "30 min",
      status: "Ouvert",
      services: ["Urgences générales", "Maternité"],
      image: "/images/melen-gab.png",
      coordinates: { lat: 0.4167, lng: 9.4667 },
    },
  ]

  const emergencyTypes = [
    {
      type: "Urgence vitale",
      description: "Arrêt cardiaque, hémorragie grave, accident grave",
      color: "bg-red-500",
      priority: "Immédiate",
      action: "Appelez le 1515 immédiatement",
      icon: <Zap className="w-6 h-6" />,
    },
    {
      type: "Urgence grave",
      description: "Douleur thoracique, difficulté respiratoire, traumatisme",
      color: "bg-orange-500",
      priority: "Très urgente",
      action: "Rendez-vous aux urgences rapidement",
      icon: <AlertTriangle className="w-6 h-6" />,
    },
    {
      type: "Urgence modérée",
      description: "Fièvre élevée, douleur intense, vomissements",
      color: "bg-yellow-500",
      priority: "Urgente",
      action: "Consultez dans les 2-4 heures",
      icon: <Activity className="w-6 h-6" />,
    },
    {
      type: "Urgence mineure",
      description: "Petites blessures, symptômes légers",
      color: "bg-green-500",
      priority: "Peu urgente",
      action: "Consultez votre médecin ou pharmacien",
      icon: <Heart className="w-6 h-6" />,
    },
  ]

  const firstAidTips = [
    {
      situation: "Arrêt cardiaque",
      steps: [
        "Vérifiez la conscience et la respiration",
        "Appelez le 1515 immédiatement",
        "Commencez le massage cardiaque",
        "30 compressions thoraciques puis 2 insufflations",
        "Continuez jusqu'à l'arrivée des secours",
      ],
    },
    {
      situation: "Hémorragie",
      steps: [
        "Allongez la victime",
        "Comprimez la plaie avec un linge propre",
        "Surélevez le membre si possible",
        "Appelez le 1515",
        "Surveillez l'état de conscience",
      ],
    },
    {
      situation: "Brûlure",
      steps: [
        "Refroidissez avec de l'eau froide (15-20 min)",
        "Retirez bijoux et vêtements non collés",
        "Couvrez avec un linge propre",
        "Ne percez pas les cloques",
        "Consultez si la brûlure est étendue",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header d'urgence */}
      <div className="bg-red-600 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8" />
              <div>
                <h1 className="text-2xl font-bold">Services d'Urgence</h1>
                <p className="text-red-100">Assistance médicale d'urgence 24h/24</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-red-100">Numéro d'urgence</p>
              <p className="text-3xl font-bold">1515</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Alerte importante */}
        <Alert className="mb-8 border-red-200 bg-red-50">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>En cas d'urgence vitale :</strong> Appelez immédiatement le 1515 (SAMU) ou rendez-vous aux urgences
            les plus proches. Cette page est à titre informatif uniquement.
          </AlertDescription>
        </Alert>

        {/* Numéros d'urgence */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-6 h-6 text-red-600" />
              Numéros d'urgence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {emergencyNumbers.map((emergency, index) => (
                <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 text-center">
                    <div className="mb-3">{emergency.icon}</div>
                    <h3 className="font-bold text-lg">{emergency.service}</h3>
                    <p className="text-2xl font-bold text-red-600 my-2">{emergency.number}</p>
                    <p className="text-sm text-gray-600 mb-2">{emergency.description}</p>
                    <Badge className="bg-green-100 text-green-800">{emergency.available}</Badge>
                    <Button
                      className="w-full mt-3 bg-red-600 hover:bg-red-700"
                      onClick={() => window.open(`tel:${emergency.number}`)}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Appeler
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Types d'urgences */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-6 h-6 text-blue-600" />
              Évaluation de l'urgence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {emergencyTypes.map((emergency, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className={`p-3 rounded-full ${emergency.color} text-white`}>{emergency.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{emergency.type}</h3>
                    <p className="text-gray-600">{emergency.description}</p>
                    <p className="text-sm font-medium mt-1">Priorité: {emergency.priority}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-blue-600">{emergency.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Structures d'urgence */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-6 h-6 text-green-600" />
              Urgences les plus proches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {emergencyFacilities.map((facility, index) => (
                <Card key={index} className="border hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <Image
                        src={facility.image || "/placeholder.svg"}
                        alt={facility.name}
                        width={100}
                        height={80}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-lg">{facility.name}</h3>
                          <Badge className="bg-green-100 text-green-800">{facility.status}</Badge>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {facility.address}
                          </p>
                          <p className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {facility.phone}
                          </p>
                          <p className="flex items-center gap-1">
                            <Navigation className="w-3 h-3" />
                            {facility.distance} - Temps d'attente: {facility.waitTime}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {facility.services.map((service, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button
                          size="sm"
                          className="bg-red-600 hover:bg-red-700"
                          onClick={() => window.open(`tel:${facility.phone}`)}
                        >
                          <Phone className="w-3 h-3 mr-1" />
                          Appeler
                        </Button>
                        <Button size="sm" variant="outline">
                          <Navigation className="w-3 h-3 mr-1" />
                          Itinéraire
                        </Button>
                        <Button size="sm" variant="outline">
                          <Car className="w-3 h-3 mr-1" />
                          Taxi
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Premiers secours */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-purple-600" />
              Gestes de premiers secours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {firstAidTips.map((tip, index) => (
                <Card key={index} className="border">
                  <CardHeader>
                    <CardTitle className="text-lg text-purple-600">{tip.situation}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-2">
                      {tip.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-start gap-2 text-sm">
                          <span className="bg-purple-100 text-purple-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                            {stepIndex + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Alert className="border-blue-200 bg-blue-50">
                <Info className="w-4 h-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  Ces informations ne remplacent pas une formation aux premiers secours. Nous recommandons de suivre une
                  formation certifiée.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        {/* Actions rapides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="p-6">
              <Ambulance className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Appeler une ambulance</h3>
              <p className="text-gray-600 mb-4">Service d'urgence médicale</p>
              <Button className="w-full bg-red-600 hover:bg-red-700" onClick={() => window.open("tel:1515")}>
                Appeler le 1515
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <MapPin className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Localiser les urgences</h3>
              <p className="text-gray-600 mb-4">Trouvez l'hôpital le plus proche</p>
              <Button className="w-full" asChild>
                <Link href="/facilities?type=emergency">Voir la carte</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Heart className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Téléconsultation urgente</h3>
              <p className="text-gray-600 mb-4">Consultation médicale immédiate</p>
              <Button className="w-full" asChild>
                <Link href="/teleconsultation">Consulter maintenant</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
