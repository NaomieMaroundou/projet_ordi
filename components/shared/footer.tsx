import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram, Youtube, Send } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">SantéGabon</h3>
            <p className="text-sm mb-4">
              Votre plateforme de santé complète pour accéder aux meilleurs services médicaux au Gabon.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-blue-200 transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-blue-200 transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-blue-200 transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-blue-200 transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-blue-200 transition-colors">
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Provinces</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/facilities?province=estuaire" className="hover:text-blue-200">
                  Estuaire
                </Link>
              </li>
              <li>
                <Link href="/facilities?province=haut-ogooue" className="hover:text-blue-200">
                  Haut-Ogooué
                </Link>
              </li>
              <li>
                <Link href="/facilities?province=moyen-ogooue" className="hover:text-blue-200">
                  Moyen-Ogooué
                </Link>
              </li>
              <li>
                <Link href="/facilities?province=ngounie" className="hover:text-blue-200">
                  Ngounié
                </Link>
              </li>
              <li>
                <Link href="/facilities?province=nyanga" className="hover:text-blue-200">
                  Nyanga
                </Link>
              </li>
              <li>
                <Link href="/facilities?province=ogooue-ivindo" className="hover:text-blue-200">
                  Ogooué-Ivindo
                </Link>
              </li>
              <li>
                <Link href="/facilities?province=ogooue-lolo" className="hover:text-blue-200">
                  Ogooué-Lolo
                </Link>
              </li>
              <li>
                <Link href="/facilities?province=ogooue-maritime" className="hover:text-blue-200">
                  Ogooué-Maritime
                </Link>
              </li>
              <li>
                <Link href="/facilities?province=woleu-ntem" className="hover:text-blue-200">
                  Woleu-Ntem
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services/appointments" className="hover:text-blue-200">
                  Rendez-vous médicaux
                </Link>
              </li>
              <li>
                <Link href="/services/teleconsultation" className="hover:text-blue-200">
                  Téléconsultation
                </Link>
              </li>
              <li>
                <Link href="/services/medical-record" className="hover:text-blue-200">
                  Dossier médical
                </Link>
              </li>
              <li>
                <Link href="/services/emergency" className="hover:text-blue-200">
                  Urgences
                </Link>
              </li>
              <li>
                <Link href="/services/pharmacy" className="hover:text-blue-200">
                  Pharmacies
                </Link>
              </li>
              <li>
                <Link href="/services/laboratory" className="hover:text-blue-200">
                  Laboratoires
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm mb-4">
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-0.5" />
                <span>Boulevard Omar Bongo, Libreville, Gabon</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>+241 77 12 34 56</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>contact@santegabon.ga</span>
              </li>
            </ul>

            {/* Newsletter Subscription */}
            <div className="bg-blue-700 p-4 rounded-lg">
              <h4 className="font-bold mb-2">Restez informé</h4>
              <p className="text-sm mb-3">
                Abonnez-vous à notre newsletter pour recevoir les dernières actualités de santé
              </p>
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Votre email"
                  className="bg-white text-gray-800 rounded-l-md rounded-r-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button className="bg-green-600 hover:bg-green-700 rounded-l-none">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-500 mt-8 pt-6 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} SantéGabon. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
