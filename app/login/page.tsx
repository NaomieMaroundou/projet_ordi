"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Mail, Lock, Eye, EyeOff, Phone } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "@/components/ui/use-toast"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [codeSent, setCodeSent] = useState(false)

  const { login, loginWithPhone, isAuthenticated } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnUrl = searchParams.get("returnUrl") || "/"

  // Rediriger si déjà connecté
  useEffect(() => {
    if (isAuthenticated) {
      router.push(returnUrl)
    }
  }, [isAuthenticated, router, returnUrl])

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await login(email, password)
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur SantéGabon",
      })
      router.push(returnUrl)
    } catch (error) {
      toast({
        title: "Erreur de connexion",
        description: "Email ou mot de passe incorrect",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendVerificationCode = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simuler l'envoi d'un code de vérification
    setTimeout(() => {
      setIsLoading(false)
      setCodeSent(true)
      toast({
        title: "Code envoyé",
        description: `Un code de vérification a été envoyé au ${phoneNumber}`,
      })
    }, 1500)
  }

  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await loginWithPhone(phoneNumber, verificationCode)
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur SantéGabon",
      })
      router.push(returnUrl)
    } catch (error) {
      toast({
        title: "Erreur de connexion",
        description: "Code de vérification incorrect",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container flex items-center p-4">
          <Link href="/" className="mr-3">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-bold">Connexion</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container flex items-center justify-center p-4">
        <div className="w-full max-w-md">
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
            <p className="text-gray-600 mt-1">Connectez-vous pour accéder à votre compte</p>
          </div>

          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="phone">Téléphone</TabsTrigger>
            </TabsList>

            <TabsContent value="email">
              <Card>
                <CardHeader>
                  <CardTitle>Connexion par email</CardTitle>
                  <CardDescription>Entrez votre email et votre mot de passe pour vous connecter</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleEmailLogin}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="votre@email.com"
                            className="pl-10"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password">Mot de passe</Label>
                          <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                            Mot de passe oublié?
                          </Link>
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pl-10"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                      </div>
                      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                        {isLoading ? "Connexion en cours..." : "Se connecter"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <div className="relative w-full">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500">ou</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Continuer avec Google
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="phone">
              <Card>
                <CardHeader>
                  <CardTitle>Connexion par téléphone</CardTitle>
                  <CardDescription>
                    Entrez votre numéro de téléphone pour recevoir un code de vérification
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!codeSent ? (
                    <form onSubmit={handleSendVerificationCode}>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Numéro de téléphone</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="+241 XX XX XX XX"
                              className="pl-10"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                          {isLoading ? "Envoi en cours..." : "Recevoir un code"}
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <form onSubmit={handlePhoneLogin}>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="verification-code">Code de vérification</Label>
                          <Input
                            id="verification-code"
                            type="text"
                            placeholder="Entrez le code à 6 chiffres"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            required
                            className="text-center text-lg tracking-widest"
                            maxLength={6}
                          />
                          <p className="text-sm text-gray-500 text-center">Un code a été envoyé au {phoneNumber}</p>
                        </div>
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                          {isLoading ? "Vérification..." : "Vérifier"}
                        </Button>
                        <Button
                          type="button"
                          variant="link"
                          className="w-full"
                          onClick={() => setCodeSent(false)}
                          disabled={isLoading}
                        >
                          Modifier le numéro de téléphone
                        </Button>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Vous n'avez pas de compte?{" "}
              <Link href="/register" className="text-blue-600 hover:underline font-medium">
                Créer un compte
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
