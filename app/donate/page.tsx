import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, Heart, CreditCard, Calendar, Check, Info } from "lucide-react"
import { ChatBot } from "@/components/chat-bot"

export default function DonatePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container flex items-center p-4">
          <Link href="/" className="mr-3">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-bold">Faire un don</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container p-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Soutenez la santé au Gabon</h2>
            <p className="text-gray-600">
              Votre don contribue à améliorer les soins de santé et l&apos;accès aux services médicaux pour tous les
              Gabonais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">Comment votre don aide</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span>Équipement médical pour les hôpitaux ruraux</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span>Formation du personnel médical</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span>Programmes de prévention des maladies</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span>Soins médicaux pour les personnes défavorisées</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span>Recherche médicale sur les maladies tropicales</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">Nos réalisations</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Équipement médical</span>
                      <span className="text-sm font-medium">75%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "75%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Formation du personnel</span>
                      <span className="text-sm font-medium">60%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "60%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Accès aux soins</span>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  <p>
                    En 2024, nous avons aidé plus de 5000 personnes à accéder à des soins de qualité dans les régions
                    rurales du Gabon.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-4">Faire un don</h3>

              <div className="mb-6">
                <Label className="mb-2 block">Montant du don</Label>
                <RadioGroup defaultValue="10000" className="grid grid-cols-3 gap-2">
                  <div>
                    <RadioGroupItem value="5000" id="amount-5000" className="sr-only" />
                    <Label
                      htmlFor="amount-5000"
                      className="flex items-center justify-center p-3 border rounded-md cursor-pointer hover:bg-blue-50 [&:has([data-state=checked])]:bg-blue-100 [&:has([data-state=checked])]:border-blue-600"
                    >
                      5 000 FCFA
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="10000" id="amount-10000" className="sr-only" />
                    <Label
                      htmlFor="amount-10000"
                      className="flex items-center justify-center p-3 border rounded-md cursor-pointer hover:bg-blue-50 [&:has([data-state=checked])]:bg-blue-100 [&:has([data-state=checked])]:border-blue-600"
                    >
                      10 000 FCFA
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="25000" id="amount-25000" className="sr-only" />
                    <Label
                      htmlFor="amount-25000"
                      className="flex items-center justify-center p-3 border rounded-md cursor-pointer hover:bg-blue-50 [&:has([data-state=checked])]:bg-blue-100 [&:has([data-state=checked])]:border-blue-600"
                    >
                      25 000 FCFA
                    </Label>
                  </div>
                </RadioGroup>
                <div className="mt-2">
                  <Label htmlFor="custom-amount" className="text-sm">
                    Autre montant
                  </Label>
                  <div className="relative">
                    <Input id="custom-amount" type="number" placeholder="Montant personnalisé" className="pl-20" />
                    <div className="absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none text-gray-500 border-r">
                      FCFA
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <Label className="mb-2 block">Informations personnelles</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first-name" className="text-sm">
                      Prénom
                    </Label>
                    <Input id="first-name" placeholder="Votre prénom" />
                  </div>
                  <div>
                    <Label htmlFor="last-name" className="text-sm">
                      Nom
                    </Label>
                    <Input id="last-name" placeholder="Votre nom" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm">
                      Email
                    </Label>
                    <Input id="email" type="email" placeholder="votre@email.com" />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm">
                      Téléphone
                    </Label>
                    <Input id="phone" placeholder="+241 XX XX XX XX" />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <Label className="mb-2 block">Informations de paiement</Label>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="card-number" className="text-sm">
                      Numéro de carte
                    </Label>
                    <div className="relative">
                      <Input id="card-number" placeholder="1234 5678 9012 3456" />
                      <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry" className="text-sm">
                        Date d'expiration
                      </Label>
                      <div className="relative">
                        <Input id="expiry" placeholder="MM/AA" />
                        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cvc" className="text-sm">
                        CVC
                      </Label>
                      <div className="relative">
                        <Input id="cvc" placeholder="123" />
                        <Info className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start mb-6">
                <input type="checkbox" id="receipt" className="mt-1 mr-2" />
                <Label htmlFor="receipt" className="text-sm">
                  Je souhaite recevoir un reçu fiscal pour mon don
                </Label>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Heart className="w-4 h-4 mr-2" />
                Faire un don
              </Button>

              <div className="mt-4 text-xs text-gray-500 text-center">
                Vos données de paiement sont sécurisées. Nous ne stockons pas vos informations de carte.
              </div>
            </CardContent>
          </Card>

          <div className="text-center mb-8">
            <h3 className="font-bold text-lg mb-2">Autres façons de donner</h3>
            <p className="text-gray-600 mb-4">
              Vous pouvez également faire un don par virement bancaire ou par mobile money.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button variant="outline" className="border-blue-600 text-blue-600">
                Virement bancaire
              </Button>
              <Button variant="outline" className="border-blue-600 text-blue-600">
                Mobile Money
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Chatbot */}
      <ChatBot />
    </div>
  )
}
