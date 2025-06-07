"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Mail, Lock, Eye, EyeOff, User, Phone, Calendar, Upload, FileText } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "@/components/ui/use-toast"

const userRoles = [
  { value: "patient", label: "Patient (Utilisateur classique)" },
  { value: "medecin", label: "Médecin" },
  { value: "psychologue", label: "Psychologue" },
  { value: "pharmacien", label: "Pharmacien" },
  { value: "infirmier", label: "Personnel soignant" },
  { value: "dieteticien", label: "Autres professionnels de santé (diététicien, infirmier, etc.)" },
  { value: "coach", label: "Coach en bien-être et nutrition" },
  { value: "ambassadeur", label: "Ambassadeur de santé" },
  { value: "admin", label: "Administrateur de contenu" },
  { value: "urgentiste", label: "Urgentiste ou Intervenant en situations critiques" },
  { value: "psychologue_benevole", label: "Psychologue bénévole" },
  { value: "entreprise", label: "Entreprise" },
  { value: "autre", label: "Autre (préciser)" },
]

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

const gabonCities = [
  "Libreville",
  "Port-Gentil",
  "Franceville",
  "Oyem",
  "Moanda",
  "Mouila",
  "Lambaréné",
  "Tchibanga",
  "Koulamoutou",
  "Makokou",
  "Bitam",
  "Gamba",
  "Mayumba",
  "Mitzic",
  "Ndjolé",
]

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Étape 1: Informations de base
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",

    // Étape 2: Informations personnelles
    birthDate: "",
    gender: "",
    city: "",
    address: "",
    role: "",
    otherRole: "",

    // Étape 3: Informations médicales (pour patients)
    bloodType: "",
    medicalHistory: "",
    allergies: "",
    currentMedications: "",
    emergencyContact: "",
    emergencyPhone: "",

    // Étape 4: Documents professionnels (pour professionnels de santé)
    diploma: null as File | null,
    medicalRegistration: "",
    practiceAttestation: null as File | null,
    specialization: "",

    // Étape 5: Préférences et consentement
    acceptTerms: false,
    shareDataConsent: false,
    newsletterConsent: false,
    healthPreferences: [] as string[],
  })

  const { register, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setFormData({
        ...formData,
        [name]: checked,
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleFileChange = (name: string, file: File | null) => {
    setFormData({
      ...formData,
      [name]: file,
    })
  }

  const validateStep = (stepNumber: number): boolean => {
    switch (stepNumber) {
      case 1:
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
          toast({
            title: "Erreur",
            description: "Veuillez remplir tous les champs obligatoires",
            variant: "destructive",
          })
          return false
        }
        if (formData.password !== formData.confirmPassword) {
          toast({
            title: "Erreur",
            description: "Les mots de passe ne correspondent pas",
            variant: "destructive",
          })
          return false
        }
        if (formData.password.length < 8) {
          toast({
            title: "Erreur",
            description: "Le mot de passe doit contenir au moins 8 caractères",
            variant: "destructive",
          })
          return false
        }
        return true

      case 2:
        if (!formData.birthDate || !formData.gender || !formData.city || !formData.role) {
          toast({
            title: "Erreur",
            description: "Veuillez remplir tous les champs obligatoires",
            variant: "destructive",
          })
          return false
        }
        if (formData.role === "autre" && !formData.otherRole) {
          toast({
            title: "Erreur",
            description: "Veuillez préciser votre rôle",
            variant: "destructive",
          })
          return false
        }
        return true

      case 3:
        // Validation optionnelle pour les informations médicales
        return true

      case 4:
        // Validation pour les professionnels de santé
        if (
          ["medecin", "psychologue", "pharmacien", "urgentiste"].includes(formData.role) &&
          (!formData.medicalRegistration || !formData.diploma)
        ) {
          toast({
            title: "Erreur",
            description: "Veuillez fournir vos documents professionnels",
            variant: "destructive",
          })
          return false
        }
        return true

      case 5:
        if (!formData.acceptTerms) {
          toast({
            title: "Erreur",
            description: "Vous devez accepter les conditions générales d'utilisation",
            variant: "destructive",
          })
          return false
        }
        return true

      default:
        return true
    }
  }

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateStep(step)) {
      setStep(step + 1)
    }
  }

  const handlePrevStep = () => {
    setStep(step - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep(5)) return

    setIsLoading(true)

    try {
      await register(formData)
      toast({
        title: "Inscription réussie",
        description: "Un email de confirmation a été envoyé à votre adresse",
      })
      router.push("/")
    } catch (error) {
      toast({
        title: "Erreur d'inscription",
        description: "Une erreur est survenue lors de l'inscription",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const isProfessional = ["medecin", "psychologue", "pharmacien", "urgentiste"].includes(formData.role)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container flex items-center p-4">
          <Link href="/" className="mr-3">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-bold">Créer un compte</h1>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="container px-4 py-2">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4, 5].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    stepNumber <= step
                      ? "bg-blue-600 text-white"
                      : stepNumber === step + 1
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 5 && (
                  <div className={`w-12 h-1 mx-2 ${stepNumber < step ? "bg-blue-600" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Étape {step} sur 5: {step === 1 && "Informations de base"}
            {step === 2 && "Informations personnelles"}
            {step === 3 && "Informations médicales"}
            {step === 4 && "Documents professionnels"}
            {step === 5 && "Préférences et consentement"}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <Image
                src="/placeholder.svg?height=60&width=60&text=SG"
                alt="Logo"
                width={60}
                height={60}
                className="rounded-full"
              />
            </div>
            <h1 className="text-2xl font-bold text-blue-600">SantéGabon</h1>
            <p className="text-gray-600 mt-1">Créez votre compte pour accéder à tous nos services</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Inscription - Étape {step}</CardTitle>
              <CardDescription>
                {step === 1 && "Entrez vos informations de base"}
                {step === 2 && "Complétez vos informations personnelles"}
                {step === 3 && "Informations médicales (optionnel pour les patients)"}
                {step === 4 && "Documents professionnels (obligatoire pour les professionnels de santé)"}
                {step === 5 && "Préférences et consentement"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Étape 1: Informations de base */}
              {step === 1 && (
                <form onSubmit={handleNextStep}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom *</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input
                            id="firstName"
                            name="firstName"
                            placeholder="Prénom"
                            className="pl-10"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom *</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          placeholder="Nom"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="votre@email.com"
                          className="pl-10"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+241 XX XX XX XX"
                          className="pl-10"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Mot de passe *</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      <p className="text-xs text-gray-500">
                        Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                      Continuer
                    </Button>
                  </div>
                </form>
              )}

              {/* Étape 2: Informations personnelles */}
              {step === 2 && (
                <form onSubmit={handleNextStep}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="birthDate">Date de naissance *</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                          id="birthDate"
                          name="birthDate"
                          type="date"
                          className="pl-10"
                          value={formData.birthDate}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Genre *</Label>
                      <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez votre genre" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Homme</SelectItem>
                          <SelectItem value="female">Femme</SelectItem>
                          <SelectItem value="other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Ville *</Label>
                      <Select value={formData.city} onValueChange={(value) => handleSelectChange("city", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez votre ville" />
                        </SelectTrigger>
                        <SelectContent>
                          {gabonCities.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Adresse</Label>
                      <Input
                        id="address"
                        name="address"
                        placeholder="Votre adresse complète"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Choisissez votre rôle *</Label>
                      <Select value={formData.role} onValueChange={(value) => handleSelectChange("role", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez votre rôle" />
                        </SelectTrigger>
                        <SelectContent>
                          {userRoles.map((role) => (
                            <SelectItem key={role.value} value={role.value}>
                              {role.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {formData.role === "autre" && (
                      <div className="space-y-2">
                        <Label htmlFor="otherRole">Précisez votre rôle *</Label>
                        <Input
                          id="otherRole"
                          name="otherRole"
                          placeholder="Décrivez votre rôle"
                          value={formData.otherRole}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                    <div className="flex flex-col space-y-2">
                      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                        Continuer
                      </Button>
                      <Button type="button" variant="outline" className="w-full" onClick={handlePrevStep}>
                        Retour
                      </Button>
                    </div>
                  </div>
                </form>
              )}

              {/* Étape 3: Informations médicales */}
              {step === 3 && (
                <form onSubmit={handleNextStep}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="bloodType">Groupe sanguin</Label>
                      <Select
                        value={formData.bloodType}
                        onValueChange={(value) => handleSelectChange("bloodType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez votre groupe sanguin" />
                        </SelectTrigger>
                        <SelectContent>
                          {bloodTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="medicalHistory">Antécédents médicaux</Label>
                      <Textarea
                        id="medicalHistory"
                        name="medicalHistory"
                        placeholder="Décrivez vos antécédents médicaux importants"
                        value={formData.medicalHistory}
                        onChange={handleChange}
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="allergies">Allergies</Label>
                      <Textarea
                        id="allergies"
                        name="allergies"
                        placeholder="Listez vos allergies connues"
                        value={formData.allergies}
                        onChange={handleChange}
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currentMedications">Médicaments actuels</Label>
                      <Textarea
                        id="currentMedications"
                        name="currentMedications"
                        placeholder="Listez les médicaments que vous prenez actuellement"
                        value={formData.currentMedications}
                        onChange={handleChange}
                        rows={2}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="emergencyContact">Contact d'urgence</Label>
                        <Input
                          id="emergencyContact"
                          name="emergencyContact"
                          placeholder="Nom du contact d'urgence"
                          value={formData.emergencyContact}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emergencyPhone">Téléphone d'urgence</Label>
                        <Input
                          id="emergencyPhone"
                          name="emergencyPhone"
                          type="tel"
                          placeholder="+241 XX XX XX XX"
                          value={formData.emergencyPhone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                        Continuer
                      </Button>
                      <Button type="button" variant="outline" className="w-full" onClick={handlePrevStep}>
                        Retour
                      </Button>
                    </div>
                  </div>
                </form>
              )}

              {/* Étape 4: Documents professionnels */}
              {step === 4 && (
                <form onSubmit={handleNextStep}>
                  <div className="space-y-4">
                    {isProfessional ? (
                      <>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h3 className="font-medium text-blue-800 mb-2">
                            Documents requis pour les professionnels de santé
                          </h3>
                          <p className="text-sm text-blue-600">
                            En tant que professionnel de santé, vous devez fournir les documents suivants pour valider
                            votre compte.
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="medicalRegistration">Numéro d'enregistrement médical *</Label>
                          <Input
                            id="medicalRegistration"
                            name="medicalRegistration"
                            placeholder="Votre numéro d'enregistrement professionnel"
                            value={formData.medicalRegistration}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="specialization">Spécialisation</Label>
                          <Input
                            id="specialization"
                            name="specialization"
                            placeholder="Votre spécialisation médicale"
                            value={formData.specialization}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="diploma">Diplôme / Certification professionnelle *</Label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                            <input
                              type="file"
                              id="diploma"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={(e) => handleFileChange("diploma", e.target.files?.[0] || null)}
                              className="hidden"
                            />
                            <label htmlFor="diploma" className="cursor-pointer flex flex-col items-center">
                              <Upload className="w-8 h-8 text-gray-400 mb-2" />
                              <span className="text-sm text-gray-600">
                                {formData.diploma ? formData.diploma.name : "Cliquez pour télécharger votre diplôme"}
                              </span>
                              <span className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (max 5MB)</span>
                            </label>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="practiceAttestation">Attestation d'exercice</Label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                            <input
                              type="file"
                              id="practiceAttestation"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={(e) => handleFileChange("practiceAttestation", e.target.files?.[0] || null)}
                              className="hidden"
                            />
                            <label htmlFor="practiceAttestation" className="cursor-pointer flex flex-col items-center">
                              <FileText className="w-8 h-8 text-gray-400 mb-2" />
                              <span className="text-sm text-gray-600">
                                {formData.practiceAttestation
                                  ? formData.practiceAttestation.name
                                  : "Cliquez pour télécharger votre attestation"}
                              </span>
                              <span className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (max 5MB)</span>
                            </label>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <h3 className="font-medium text-green-800 mb-2">Aucun document requis</h3>
                        <p className="text-sm text-green-600">
                          En tant que {userRoles.find((r) => r.value === formData.role)?.label.toLowerCase()}, aucun
                          document professionnel n'est requis.
                        </p>
                      </div>
                    )}
                    <div className="flex flex-col space-y-2">
                      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                        Continuer
                      </Button>
                      <Button type="button" variant="outline" className="w-full" onClick={handlePrevStep}>
                        Retour
                      </Button>
                    </div>
                  </div>
                </form>
              )}

              {/* Étape 5: Préférences et consentement */}
              {step === 5 && (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="acceptTerms"
                          name="acceptTerms"
                          checked={formData.acceptTerms}
                          onCheckedChange={(checked) => setFormData({ ...formData, acceptTerms: checked as boolean })}
                          required
                        />
                        <Label htmlFor="acceptTerms" className="text-sm leading-5">
                          ✅ J'accepte les{" "}
                          <Link href="/terms" className="text-blue-600 hover:underline">
                            conditions générales d'utilisation
                          </Link>{" "}
                          et la{" "}
                          <Link href="/privacy" className="text-blue-600 hover:underline">
                            politique de confidentialité
                          </Link>{" "}
                          *
                        </Label>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="shareDataConsent"
                          name="shareDataConsent"
                          checked={formData.shareDataConsent}
                          onCheckedChange={(checked) =>
                            setFormData({ ...formData, shareDataConsent: checked as boolean })
                          }
                        />
                        <Label htmlFor="shareDataConsent" className="text-sm leading-5">
                          🔒 J'autorise le partage de mes données avec les professionnels de santé pour améliorer ma
                          prise en charge
                        </Label>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="newsletterConsent"
                          name="newsletterConsent"
                          checked={formData.newsletterConsent}
                          onCheckedChange={(checked) =>
                            setFormData({ ...formData, newsletterConsent: checked as boolean })
                          }
                        />
                        <Label htmlFor="newsletterConsent" className="text-sm leading-5">
                          📧 Je souhaite recevoir la newsletter et les actualités santé de SantéGabon
                        </Label>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium mb-3">Préférences de santé (optionnel)</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          "Cardiologie",
                          "Pédiatrie",
                          "Gynécologie",
                          "Neurologie",
                          "Dermatologie",
                          "Ophtalmologie",
                          "Psychiatrie",
                          "Médecine générale",
                        ].map((pref) => (
                          <div key={pref} className="flex items-center space-x-2">
                            <Checkbox
                              id={pref}
                              checked={formData.healthPreferences.includes(pref)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setFormData({
                                    ...formData,
                                    healthPreferences: [...formData.healthPreferences, pref],
                                  })
                                } else {
                                  setFormData({
                                    ...formData,
                                    healthPreferences: formData.healthPreferences.filter((p) => p !== pref),
                                  })
                                }
                              }}
                            />
                            <Label htmlFor={pref} className="text-sm">
                              {pref}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                        {isLoading ? "Inscription en cours..." : "Finaliser l'inscription"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={handlePrevStep}
                        disabled={isLoading}
                      >
                        Retour
                      </Button>
                    </div>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Vous avez déjà un compte?{" "}
              <Link href="/login" className="text-blue-600 hover:underline font-medium">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
