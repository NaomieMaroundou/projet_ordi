import Link from "next/link"
import {
  Search,
  MapPin,
  Calendar,
  FileText,
  Video,
  Menu,
  Phone,
  ChevronDown,
  User,
  Info,
  Stethoscope,
  Activity,
  Thermometer,
  Ambulance,
  Gift,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fff5f8]">
      {/* Top Bar */}
      <div className="bg-blue-600 text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4 text-sm">
            <Link href="/contact" className="hover:underline flex items-center">
              <Phone className="w-3 h-3 mr-1" />
              +241 77 12 34 56
            </Link>
            <Link href="/locations" className="hover:underline flex items-center">
              <MapPin className="w-3 h-3 mr-1" />
              Nos emplacements
            </Link>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/login" className="hover:underline flex items-center">
              <User className="w-3 h-3 mr-1" />
              Se connecter
            </Link>
            <Link href="/about" className="hover:underline flex items-center">
              <Info className="w-3 h-3 mr-1" />À propos
            </Link>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <h1 className="text-xl font-bold text-blue-600">SantéGabon</h1>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="font-medium text-blue-600">
              Accueil
            </Link>
            <div className="relative group">
              <button className="flex items-center font-medium">
                Services
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md p-2 w-48">
                <Link href="/services/cardiology" className="block p-2 hover:bg-gray-100 rounded-md">
                  Cardiologie
                </Link>
                <Link href="/services/neurology" className="block p-2 hover:bg-gray-100 rounded-md">
                  Neurologie
                </Link>
                <Link href="/services/pediatrics" className="block p-2 hover:bg-gray-100 rounded-md">
                  Pédiatrie
                </Link>
              </div>
            </div>
            <div className="relative group">
              <button className="flex items-center font-medium">
                Structures
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md p-2 w-48">
                <Link href="/facilities?province=estuaire" className="block p-2 hover:bg-gray-100 rounded-md">
                  Estuaire
                </Link>
                <Link href="/facilities?province=haut-ogooue" className="block p-2 hover:bg-gray-100 rounded-md">
                  Haut-Ogooué
                </Link>
                <Link href="/facilities?province=moyen-ogooue" className="block p-2 hover:bg-gray-100 rounded-md">
                  Moyen-Ogooué
                </Link>
              </div>
            </div>
            <Link href="/doctors" className="font-medium">
              Médecins
            </Link>
            <Link href="/contact" className="font-medium">
              Contact
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="pl-9 pr-4 py-1.5 rounded-full border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm w-48"
              />
            </div>
            <Button variant="outline" size="sm" className="bg-red-600 hover:bg-red-700 text-white border-0">
              URGENCE
            </Button>
            <Button variant="outline" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white border-0">
              <Gift className="w-3 h-3 mr-1" />
              FAIRE UN DON
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section with Background Image */}
      <div className="relative w-full h-[300px]">
        <Image
          src="/placeholder.svg?height=600&width=1200"
          alt="Healthcare Hero"
          width={1200}
          height={600}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/70 to-pink-500/50 flex flex-col justify-center px-6">
          <h1 className="text-3xl font-bold text-white mb-2">Votre santé, notre priorité</h1>
          <p className="text-white mb-6 max-w-md">Accédez aux meilleurs services de santé au Gabon</p>
          <div className="flex gap-3">
            <Button className="bg-blue-600 hover:bg-blue-700">Trouver un médecin</Button>
            <Button className="bg-pink-500 hover:bg-pink-600 text-white">
              <Calendar className="w-4 h-4 mr-2" />
              Prendre rendez-vous
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container p-4 relative z-10">
        {/* Emergency Numbers */}
        <div className="mb-8 bg-white rounded-lg shadow-md p-4 border-l-4 border-red-600">
          <h2 className="text-xl font-bold mb-3 flex items-center text-red-600">
            <Ambulance className="w-5 h-5 mr-2" />
            Numéros d'urgence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center p-3 bg-red-50 rounded-lg">
              <div className="bg-red-600 text-white p-2 rounded-full mr-3">
                <Ambulance className="w-5 h-5" />
              </div>
              <div>
                <div className="font-medium">SAMU</div>
                <div className="text-lg font-bold">1300</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
              <div className="bg-blue-600 text-white p-2 rounded-full mr-3">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="font-medium">Police</div>
                <div className="text-lg font-bold">1730</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-orange-50 rounded-lg">
              <div className="bg-orange-600 text-white p-2 rounded-full mr-3">
                <Thermometer className="w-5 h-5" />
              </div>
              <div>
                <div className="font-medium">Pompiers</div>
                <div className="text-lg font-bold">1818</div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section - Improved */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Stethoscope className="w-5 h-5 mr-2 text-blue-600" />
            Nos services
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/appointments">
              <Card className="h-full hover:shadow-md transition-shadow border-t-4 border-blue-600 hover:translate-y-[-5px] duration-300">
                <CardContent className="flex flex-col items-center justify-center p-4">
                  <div className="bg-blue-100 p-3 rounded-full mb-3">
                    <Calendar className="w-8 h-8 text-blue-600" />
                  </div>
                  <span className="text-center font-medium">Rendez-vous</span>
                  <p className="text-xs text-gray-500 text-center mt-1">Planifiez vos consultations</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/facilities">
              <Card className="h-full hover:shadow-md transition-shadow border-t-4 border-pink-500 hover:translate-y-[-5px] duration-300">
                <CardContent className="flex flex-col items-center justify-center p-4">
                  <div className="bg-pink-100 p-3 rounded-full mb-3">
                    <MapPin className="w-8 h-8 text-pink-500" />
                  </div>
                  <span className="text-center font-medium">Structures</span>
                  <p className="text-xs text-gray-500 text-center mt-1">Trouvez un établissement</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/medical-record">
              <Card className="h-full hover:shadow-md transition-shadow border-t-4 border-blue-600 hover:translate-y-[-5px] duration-300">
                <CardContent className="flex flex-col items-center justify-center p-4">
                  <div className="bg-blue-100 p-3 rounded-full mb-3">
                    <FileText className="w-8 h-8 text-blue-600" />
                  </div>
                  <span className="text-center font-medium">Dossier Médical</span>
                  <p className="text-xs text-gray-500 text-center mt-1">Accédez à vos données</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/teleconsultation">
              <Card className="h-full hover:shadow-md transition-shadow border-t-4 border-pink-500 hover:translate-y-[-5px] duration-300">
                <CardContent className="flex flex-col items-center justify-center p-4">
                  <div className="bg-pink-100 p-3 rounded-full mb-3">
                    <Video className="w-8 h-8 text-pink-500" />
                  </div>
                  <span className="text-center font-medium">Téléconsultation</span>
                  <p className="text-xs text-gray-500 text-center mt-1">Consultez à distance</p>
                </CardContent>
              </Card>
            </Link>
          </div>
          <div className="flex justify-center mt-4">
            <Link href="/services">
              <Button variant="outline" className="border-blue-600 text-blue-600">
                Voir tous les services
              </Button>
            </Link>
          </div>
        </div>

        {/* Map Integration */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-blue-600" />
            Carte des établissements de santé
          </h2>
          <Card className="overflow-hidden">
            <div className="relative h-[300px] bg-gray-100">
              <Image
                src="/placeholder.svg?height=600&width=1200&text=Carte+interactive+des+établissements"
                alt="Carte des établissements"
                width={1200}
                height={600}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <MapPin className="w-4 h-4 mr-2" />
                  Voir la carte interactive
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <p className="text-sm text-gray-600 mb-3">
                Trouvez facilement les établissements de santé les plus proches de votre position actuelle.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-blue-600 border-blue-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  Utiliser ma position
                </Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Voir tous les établissements
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Doctors Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-600" />
            Nos médecins spécialistes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Dr. Marie Ndong",
                specialty: "Cardiologie",
                image: "/placeholder.svg?height=150&width=150&text=Dr.+Ndong",
                description: "Spécialiste des maladies cardiovasculaires avec plus de 15 ans d'expérience."
              },
              {
                name: "Dr. Jean Moussavou",
                specialty: "Pédiatrie",
                image: "/placeholder.svg?height=150&width=150&text=Dr.+Moussavou",
                description: "Pédiatre certifié, spécialisé dans les soins aux nouveau-nés et enfants."
              },
              {
                name: "Dr. Sophie Obame",
                specialty: "Neurologie",
                image: "/placeholder.svg?height=150&width=150&text=Dr.+Obame",
                description: "Neurologue expérimentée, spécialisée dans le traitement des troubles neurologiques."
              }
            ].map((doctor, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col items-center p-4">
                  <Image
                    src={doctor.image || "/placeholder.svg"}
                    alt={doctor.name}
                    width={120}
                    height={120}
                    className="rounded-full border-4 border-blue-100 mb-3"
                  />
                  <h3 className="font-bold text-lg">{doctor.name}</h3>
                  <div className="text-blue-600 font-medium mb-2">{doctor.specialty}</div>
                  <p className="text-sm text-gray-600 text-center mb-4">{doctor.description}</p>
                  <Button className="bg-blue-600 hover:bg-blue-700 w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Prendre rendez-vous
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <Link href="/doctors">
              <Button variant="outline" className="border-blue-600 text-blue-600">
                Voir tous les médecins
              </Button>
            </Link>
          </div>
        </div>

        {/* Structures de Santé */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-blue-600" />
            Structures de Santé
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                name: "Hôpital Central de Libreville",
                location: "Boulevard Omar Bongo, Libreville - Estuaire",
                isOpen: true,
                image: "/placeholder.svg?height=120&width=200",
              },
              {
                name: "Centre Hospitalier de Franceville",
                location: "Avenue du Président Bongo, Franceville - Haut-Ogooué",
                isOpen: true,
                image: "/placeholder.svg?height=120&width=\
