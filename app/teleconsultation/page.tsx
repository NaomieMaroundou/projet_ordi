"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Video,
  Mic,
  Camera,
  FileText,
  Wifi,
  Clock,
  User,
  Calendar,
  Stethoscope,
  AlertCircle,
  CheckCircle,
  Monitor,
  Shield,
  ArrowLeft,
  MessageCircle,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const specialties = [
  "Médecine générale",
  "Cardiologie",
  "Dermatologie",
  "Gynécologie",
  "Neurologie",
  "Ophtalmologie",
  "Orthopédie",
  "Pédiatrie",
  "Psychiatrie",
  "Radiologie",
  "Urologie",
]

const availableDoctors = [
  {
    id: 1,
    name: "Dr. Jean Moussavou",
    specialty: "Cardiologie",
    image: "/images/doctor-male.png",
    rating: 4.9,
    price: 35000,
    nextAvailable: "Aujourd'hui 14h30",
    languages: ["Français", "Fang"],
    experience: 15,
  },
  {
    id: 2,
    name: "Dr. Marie Ndong",
    specialty: "Pédiatrie",
    image: "/images/doctor-female-1.png",
    rating: 4.8,
    price: 30000,
    nextAvailable: "Demain 09h00",
    languages: ["Français", "Téké"],
    experience: 12,
  },
  {
    id: 3,
    name: "Dr. Claire Mouele",
    specialty: "Gynécologie",
    image: "/images/doctor-female-2.png",
    rating: 4.7,
    price: 32000,
    nextAvailable: "Aujourd'hui 16h00",
    languages: ["Français", "Punu"],
    experience: 10,
  },
]

export default function TeleconsultationPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Informations personnelles
    firstName: "",
    lastName: "",
    birthDate: "",
    address: "",
    phone: "",
    email: "",

    // Motif de consultation
    specialty: "",
    symptoms: "",
    symptomsDuration: "",

    // Antécédents médicaux
    chronicDiseases: "",
    allergies: "",
    currentTreatments: "",
    surgeries: "",

    // Informations administratives
    socialSecurityNumber: "",
    paymentMethod: "",

    // Préférences
    preferredDate: "",
    preferredTime: "",
    consultationType: "teleconsultation",
  })

  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [equipmentChecked, setEquipmentChecked] = useState({
    camera: false,
    documents: false,
    internet: false,
    exchange: false,
    prescription: false,
  })

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  const isEquipmentReady = Object.values(equipmentChecked).every(Boolean)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container flex items-center p-4">
          <Link href="/" className="mr-3 hover:bg-gray-100 p-2 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center">
            <Video className="w-6 h-6 text-blue-600 mr-2" />
            <h1 className="text-xl font-bold">Téléconsultation</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    step >= i
                      ? "bg-blue-600 text-white shadow-lg"
                      : step === i
                        ? "bg-blue-100 text-blue-600 border-2 border-blue-600"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step > i ? <CheckCircle className="w-5 h-5" /> : i}
                </div>
                {i < 5 && (
                  <div className={`h-1 w-full mx-2 transition-all ${step > i ? "bg-blue-600" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3 text-xs text-gray-500">
            <span>Préparation</span>
            <span>Informations</span>
            <span>Médecin</span>
            <span>Planification</span>
            <span>Confirmation</span>
          </div>
        </div>

        {/* Step 1: Préparation et vérification équipement */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="w-6 h-6 text-blue-600" />
                  Préparation de votre téléconsultation
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Alert className="mb-6 bg-blue-50 border-blue-200">
                  <AlertCircle className="w-4 h-4" />
                  <AlertDescription>
                    Avant de commencer, assurez-vous d'avoir tout le nécessaire pour une consultation de qualité.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Équipement requis */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Camera className="w-5 h-5 mr-2 text-blue-600" />
                      Équipement requis
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 border rounded-lg">
                        <Checkbox
                          id="camera"
                          checked={equipmentChecked.camera}
                          onCheckedChange={(checked) => setEquipmentChecked((prev) => ({ ...prev, camera: checked }))}
                        />
                        <div className="flex items-center flex-1">
                          <Camera className="w-5 h-5 mr-2 text-gray-600" />
                          <div>
                            <Label htmlFor="camera" className="font-medium">
                              Appareil équipé d'une caméra et d'un micro
                            </Label>
                            <p className="text-sm text-gray-500">
                              Webcam HD ou caméra de smartphone/tablette avec micro intégré
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-3 border rounded-lg">
                        <Checkbox
                          id="documents"
                          checked={equipmentChecked.documents}
                          onCheckedChange={(checked) =>
                            setEquipmentChecked((prev) => ({ ...prev, documents: checked }))
                          }
                        />
                        <div className="flex items-center flex-1">
                          <FileText className="w-5 h-5 mr-2 text-gray-600" />
                          <div>
                            <Label htmlFor="documents" className="font-medium">
                              Préparer ses documents médicaux
                            </Label>
                            <p className="text-sm text-gray-500">Ordonnances, résultats d'examens, carnet de santé</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-3 border rounded-lg">
                        <Checkbox
                          id="internet"
                          checked={equipmentChecked.internet}
                          onCheckedChange={(checked) => setEquipmentChecked((prev) => ({ ...prev, internet: checked }))}
                        />
                        <div className="flex items-center flex-1">
                          <Wifi className="w-5 h-5 mr-2 text-gray-600" />
                          <div>
                            <Label htmlFor="internet" className="font-medium">
                              Vérifier la connexion Internet
                            </Label>
                            <p className="text-sm text-gray-500">
                              Débit minimum recommandé : 2 Mbps pour une consultation fluide
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-3 border rounded-lg">
                        <Checkbox
                          id="exchange"
                          checked={equipmentChecked.exchange}
                          onCheckedChange={(checked) => setEquipmentChecked((prev) => ({ ...prev, exchange: checked }))}
                        />
                        <div className="flex items-center flex-1">
                          <MessageCircle className="w-5 h-5 mr-2 text-gray-600" />
                          <div>
                            <Label htmlFor="exchange" className="font-medium">
                              Prêt pour l'échange avec le médecin
                            </Label>
                            <p className="text-sm text-gray-500">Environnement calme et privé pour la consultation</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-3 border rounded-lg">
                        <Checkbox
                          id="prescription"
                          checked={equipmentChecked.prescription}
                          onCheckedChange={(checked) =>
                            setEquipmentChecked((prev) => ({ ...prev, prescription: checked }))
                          }
                        />
                        <div className="flex items-center flex-1">
                          <FileText className="w-5 h-5 mr-2 text-gray-600" />
                          <div>
                            <Label htmlFor="prescription" className="font-medium">
                              Ordonnance numérique
                            </Label>
                            <p className="text-sm text-gray-500">
                              Vous recevrez votre ordonnance par email après la consultation
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recommandations */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-green-600" />
                      Recommandations
                    </h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h4 className="font-medium text-green-800 mb-2">Environnement</h4>
                        <ul className="text-sm text-green-700 space-y-1">
                          <li>• Choisissez un endroit calme et bien éclairé</li>
                          <li>• Évitez les contre-jours</li>
                          <li>• Fermez les autres applications</li>
                        </ul>
                      </div>

                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-2">Pendant la consultation</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Regardez la caméra quand vous parlez</li>
                          <li>• Parlez clairement et distinctement</li>
                          <li>• Ayez vos documents à portée de main</li>
                        </ul>
                      </div>

                      <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                        <h4 className="font-medium text-orange-800 mb-2">Confidentialité</h4>
                        <ul className="text-sm text-orange-700 space-y-1">
                          <li>• Assurez-vous d'être seul(e)</li>
                          <li>• Vérifiez que personne ne peut vous entendre</li>
                          <li>• La consultation est sécurisée et confidentielle</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Test de connexion */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-3">Test de votre équipement</h4>
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Camera className="w-4 h-4" />
                      Tester la caméra
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Mic className="w-4 h-4" />
                      Tester le micro
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Wifi className="w-4 h-4" />
                      Tester la connexion
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={nextStep}
                    disabled={!isEquipmentReady}
                    className="bg-blue-600 hover:bg-blue-700 px-8"
                  >
                    Continuer
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 2: Informations personnelles et médicales */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
                <CardTitle className="flex items-center gap-2">
                  <User className="w-6 h-6 text-green-600" />
                  Vos informations
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-8">
                  {/* Informations personnelles */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">1. Informations personnelles</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Prénom *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Nom *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="birthDate">Date de naissance *</Label>
                        <Input
                          id="birthDate"
                          type="date"
                          value={formData.birthDate}
                          onChange={(e) => handleInputChange("birthDate", e.target.value)}
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Téléphone *</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="mt-1"
                          placeholder="+241 XX XX XX XX"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="address">Adresse complète *</Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                          className="mt-1"
                          placeholder="Quartier, ville, province"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="mt-1"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Motif de consultation */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">2. Motif de la consultation</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="specialty">Spécialité médicale souhaitée *</Label>
                        <Select
                          value={formData.specialty}
                          onValueChange={(value) => handleInputChange("specialty", value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Sélectionnez une spécialité" />
                          </SelectTrigger>
                          <SelectContent>
                            {specialties.map((specialty) => (
                              <SelectItem key={specialty} value={specialty}>
                                {specialty}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="symptoms">Symptômes ressentis *</Label>
                        <Textarea
                          id="symptoms"
                          value={formData.symptoms}
                          onChange={(e) => handleInputChange("symptoms", e.target.value)}
                          className="mt-1"
                          rows={4}
                          placeholder="Décrivez vos symptômes en détail..."
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="symptomsDuration">
                          Depuis combien de temps ces symptômes sont-ils présents ? *
                        </Label>
                        <Select
                          value={formData.symptomsDuration}
                          onValueChange={(value) => handleInputChange("symptomsDuration", value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Sélectionnez la durée" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="moins-24h">Moins de 24 heures</SelectItem>
                            <SelectItem value="1-3-jours">1 à 3 jours</SelectItem>
                            <SelectItem value="1-semaine">Environ 1 semaine</SelectItem>
                            <SelectItem value="2-4-semaines">2 à 4 semaines</SelectItem>
                            <SelectItem value="1-3-mois">1 à 3 mois</SelectItem>
                            <SelectItem value="plus-3-mois">Plus de 3 mois</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Antécédents médicaux */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">3. Antécédents médicaux</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="chronicDiseases">Maladies chroniques</Label>
                        <Textarea
                          id="chronicDiseases"
                          value={formData.chronicDiseases}
                          onChange={(e) => handleInputChange("chronicDiseases", e.target.value)}
                          className="mt-1"
                          rows={3}
                          placeholder="Diabète, hypertension, asthme..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="allergies">Allergies connues</Label>
                        <Textarea
                          id="allergies"
                          value={formData.allergies}
                          onChange={(e) => handleInputChange("allergies", e.target.value)}
                          className="mt-1"
                          rows={3}
                          placeholder="Médicaments, aliments, autres..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="currentTreatments">Traitements en cours</Label>
                        <Textarea
                          id="currentTreatments"
                          value={formData.currentTreatments}
                          onChange={(e) => handleInputChange("currentTreatments", e.target.value)}
                          className="mt-1"
                          rows={3}
                          placeholder="Médicaments actuels, posologie..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="surgeries">Interventions chirurgicales passées</Label>
                        <Textarea
                          id="surgeries"
                          value={formData.surgeries}
                          onChange={(e) => handleInputChange("surgeries", e.target.value)}
                          className="mt-1"
                          rows={3}
                          placeholder="Type d'intervention, date..."
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={prevStep} className="px-8">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour
                  </Button>
                  <Button
                    onClick={nextStep}
                    disabled={!formData.firstName || !formData.lastName || !formData.specialty || !formData.symptoms}
                    className="bg-blue-600 hover:bg-blue-700 px-8"
                  >
                    Continuer
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 3: Choix du médecin */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="w-6 h-6 text-purple-600" />
                  Choisissez votre médecin
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {availableDoctors
                    .filter(
                      (doctor) => doctor.specialty === formData.specialty || formData.specialty === "Médecine générale",
                    )
                    .map((doctor) => (
                      <Card
                        key={doctor.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedDoctor?.id === doctor.id ? "border-2 border-purple-600 bg-purple-50" : ""
                        }`}
                        onClick={() => setSelectedDoctor(doctor)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <Image
                                src={doctor.image || "/placeholder.svg"}
                                alt={doctor.name}
                                width={80}
                                height={80}
                                className="rounded-full object-cover border-2 border-gray-200"
                              />
                              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                <Video className="w-3 h-3 text-white" />
                              </div>
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-lg">{doctor.name}</h3>
                                <Badge className="bg-purple-600">Disponible</Badge>
                              </div>
                              <p className="text-purple-600 font-medium">{doctor.specialty}</p>
                              <div className="flex items-center gap-4 mt-2">
                                <div className="flex items-center">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                      key={star}
                                      className={`text-lg ${
                                        star <= Math.floor(doctor.rating) ? "text-yellow-400" : "text-gray-300"
                                      }`}
                                    >
                                      ★
                                    </span>
                                  ))}
                                  <span className="ml-1 text-sm font-medium">{doctor.rating}</span>
                                </div>
                                <Badge variant="outline">{doctor.experience} ans d'expérience</Badge>
                              </div>
                              <div className="flex items-center gap-2 mt-2">
                                {doctor.languages.map((lang) => (
                                  <Badge key={lang} variant="secondary" className="text-xs">
                                    {lang}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="text-2xl font-bold text-green-600">
                                {doctor.price.toLocaleString()} FCFA
                              </div>
                              <div className="text-sm text-green-600">Téléconsultation</div>
                              <div className="text-xs text-gray-500 mt-1 flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {doctor.nextAvailable}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>

                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={prevStep} className="px-8">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour
                  </Button>
                  <Button onClick={nextStep} disabled={!selectedDoctor} className="bg-blue-600 hover:bg-blue-700 px-8">
                    Continuer
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 4: Planification et informations administratives */}
        {step === 4 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-orange-600" />
                  Planification et paiement
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Informations administratives */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">4. Informations administratives</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="socialSecurityNumber">Numéro de sécurité sociale ou assurance santé</Label>
                        <Input
                          id="socialSecurityNumber"
                          value={formData.socialSecurityNumber}
                          onChange={(e) => handleInputChange("socialSecurityNumber", e.target.value)}
                          className="mt-1"
                          placeholder="Optionnel"
                        />
                      </div>
                      <div>
                        <Label htmlFor="paymentMethod">Mode de paiement *</Label>
                        <Select
                          value={formData.paymentMethod}
                          onValueChange={(value) => handleInputChange("paymentMethod", value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Sélectionnez un mode de paiement" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mobile-money">Mobile Money (Airtel/Moov)</SelectItem>
                            <SelectItem value="card">Carte bancaire</SelectItem>
                            <SelectItem value="bank-transfer">Virement bancaire</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Préférences de rendez-vous */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">5. Préférences de rendez-vous</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="preferredDate">Date souhaitée *</Label>
                        <Input
                          id="preferredDate"
                          type="date"
                          value={formData.preferredDate}
                          onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                          className="mt-1"
                          min={new Date().toISOString().split("T")[0]}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="preferredTime">Heure souhaitée *</Label>
                        <Select
                          value={formData.preferredTime}
                          onValueChange={(value) => handleInputChange("preferredTime", value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Sélectionnez une heure" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="08:00">08:00</SelectItem>
                            <SelectItem value="09:00">09:00</SelectItem>
                            <SelectItem value="10:00">10:00</SelectItem>
                            <SelectItem value="11:00">11:00</SelectItem>
                            <SelectItem value="14:00">14:00</SelectItem>
                            <SelectItem value="15:00">15:00</SelectItem>
                            <SelectItem value="16:00">16:00</SelectItem>
                            <SelectItem value="17:00">17:00</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Récapitulatif */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-lg mb-4">Récapitulatif de votre téléconsultation</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p>
                          <span className="font-medium">Patient:</span> {formData.firstName} {formData.lastName}
                        </p>
                        <p>
                          <span className="font-medium">Médecin:</span> {selectedDoctor?.name}
                        </p>
                        <p>
                          <span className="font-medium">Spécialité:</span> {selectedDoctor?.specialty}
                        </p>
                      </div>
                      <div>
                        <p>
                          <span className="font-medium">Date:</span> {formData.preferredDate}
                        </p>
                        <p>
                          <span className="font-medium">Heure:</span> {formData.preferredTime}
                        </p>
                        <p>
                          <span className="font-medium">Prix:</span>{" "}
                          <span className="text-green-600 font-bold">
                            {selectedDoctor?.price.toLocaleString()} FCFA
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={prevStep} className="px-8">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour
                  </Button>
                  <Button
                    onClick={nextStep}
                    disabled={!formData.paymentMethod || !formData.preferredDate || !formData.preferredTime}
                    className="bg-blue-600 hover:bg-blue-700 px-8"
                  >
                    Continuer
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 5: Confirmation */}
        {step === 5 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-green-800">Téléconsultation confirmée !</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Votre téléconsultation avec {selectedDoctor?.name} est programmée pour le {formData.preferredDate} à{" "}
                {formData.preferredTime}.
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-md mx-auto mb-8">
                <h3 className="font-semibold text-green-800 mb-3">Prochaines étapes</h3>
                <ul className="text-sm text-green-700 space-y-2 text-left">
                  <li>✅ Email de confirmation envoyé</li>
                  <li>✅ Lien de connexion sécurisé généré</li>
                  <li>✅ Rappel SMS programmé 30 min avant</li>
                  <li>✅ Instructions techniques envoyées</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                  <Link href="/profile">
                    <Calendar className="w-4 h-4 mr-2" />
                    Mes consultations
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/">Retour à l'accueil</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
