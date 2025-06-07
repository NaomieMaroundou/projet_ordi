"use client"

import { useState, useRef } from "react"
import { CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

type Partner = {
  name: string
  logo: string
  description: string
  website?: string
}

type PartnerCategory = {
  id: string
  name: string
  partners: Partner[]
}

const partnerCategories: PartnerCategory[] = [
  {
    id: "international",
    name: "Organisations internationales",
    partners: [
      {
        name: "Organisation Mondiale de la Santé (OMS)",
        logo: "/placeholder.svg?height=120&width=120&text=OMS",
        description: "Partenaire principal pour les politiques de santé publique au Gabon",
        website: "https://www.who.int",
      },
      {
        name: "UNICEF",
        logo: "/placeholder.svg?height=120&width=120&text=UNICEF",
        description: "Collaboration sur la santé maternelle et infantile dans tout le pays",
        website: "https://www.unicef.org",
      },
      {
        name: "Médecins Sans Frontières",
        logo: "/placeholder.svg?height=120&width=120&text=MSF",
        description: "Interventions d'urgence et formation médicale dans les zones rurales",
        website: "https://www.msf.org",
      },
      {
        name: "Croix-Rouge Internationale",
        logo: "/placeholder.svg?height=120&width=120&text=Croix-Rouge",
        description: "Assistance humanitaire et médicale dans les situations d'urgence",
        website: "https://www.icrc.org",
      },
      {
        name: "Fondation Bill & Melinda Gates",
        logo: "/placeholder.svg?height=120&width=120&text=Gates",
        description: "Financement de programmes de lutte contre les maladies infectieuses",
        website: "https://www.gatesfoundation.org",
      },
    ],
  },
  {
    id: "government",
    name: "Institutions gouvernementales",
    partners: [
      {
        name: "Ministère de la Santé",
        logo: "/placeholder.svg?height=120&width=120&text=MS",
        description: "Coordination des politiques de santé nationales et régulation du secteur",
        website: "https://www.sante.gouv.ga",
      },
      {
        name: "CNSS - Caisse Nationale de Sécurité Sociale",
        logo: "/placeholder.svg?height=120&width=120&text=CNSS",
        description: "Couverture sociale et assurance maladie pour les travailleurs gabonais",
        website: "https://www.cnss.ga",
      },
      {
        name: "Institut d'Hygiène Publique",
        logo: "/placeholder.svg?height=120&width=120&text=IHP",
        description: "Surveillance épidémiologique et prévention des maladies infectieuses",
      },
      {
        name: "Centre National de Transfusion Sanguine",
        logo: "/placeholder.svg?height=120&width=120&text=CNTS",
        description: "Gestion des dons de sang et approvisionnement des hôpitaux",
      },
    ],
  },
  {
    id: "private",
    name: "Partenaires privés",
    partners: [
      {
        name: "Groupe CECA-GADIS",
        logo: "/placeholder.svg?height=120&width=120&text=CECA",
        description: "Fourniture de médicaments et équipements médicaux de qualité",
        website: "https://www.ceca-gadis.com",
      },
      {
        name: "Assurances NSIA",
        logo: "/placeholder.svg?height=120&width=120&text=NSIA",
        description: "Assurance santé et couverture médicale pour les particuliers et entreprises",
        website: "https://www.groupensia.com",
      },
      {
        name: "Fondation BGFIBank",
        logo: "/placeholder.svg?height=120&width=120&text=BGFI",
        description: "Financement de projets de santé communautaire dans les zones défavorisées",
        website: "https://www.fondationbgfibank.com",
      },
      {
        name: "Total Energies Gabon",
        logo: "/placeholder.svg?height=120&width=120&text=Total",
        description: "Soutien aux infrastructures médicales et programmes de santé",
        website: "https://www.totalenergies.ga",
      },
      {
        name: "Olam Gabon",
        logo: "/placeholder.svg?height=120&width=120&text=Olam",
        description: "Programmes de santé pour les communautés rurales et agricoles",
        website: "https://www.olamgroup.com",
      },
    ],
  },
  {
    id: "academic",
    name: "Institutions académiques",
    partners: [
      {
        name: "Université des Sciences de la Santé",
        logo: "/placeholder.svg?height=120&width=120&text=USS",
        description: "Formation médicale et recherche scientifique de pointe",
        website: "https://www.uss.ga",
      },
      {
        name: "École Nationale de Santé et d'Action Sociale",
        logo: "/placeholder.svg?height=120&width=120&text=ENSAS",
        description: "Formation des infirmiers, sages-femmes et travailleurs sociaux",
      },
      {
        name: "Centre de Recherche Médicale de Lambaréné",
        logo: "/placeholder.svg?height=120&width=120&text=CERMEL",
        description: "Recherche sur les maladies tropicales et essais cliniques",
        website: "https://www.cermel.org",
      },
      {
        name: "Fondation Albert Schweitzer",
        logo: "/placeholder.svg?height=120&width=120&text=Schweitzer",
        description: "Hôpital historique et centre de formation médicale à Lambaréné",
        website: "https://www.schweitzer.org",
      },
    ],
  },
]

export function PartnersCarousel() {
  const [activeCategory, setActiveCategory] = useState("international")
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="w-full py-12">
      <h2 className="text-3xl font-semibold text-center mb-8">Nos partenaires</h2>
      <Tabs defaultValue="international" onValueChange={setActiveCategory}>
        <div className="flex justify-between items-center mb-4 px-4 md:px-0">
          <TabsList className="grid grid-cols-2 md:grid-cols-4">
            {partnerCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-xs md:text-sm">
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={scrollLeft} className="rounded-full">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={scrollRight} className="rounded-full">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {partnerCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-0">
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide snap-x px-4 md:px-0"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {category.partners.map((partner, index) => (
                <motion.Card
                  key={index}
                  className="min-w-[250px] max-w-[250px] hover:shadow-md transition-all duration-300 snap-start"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                >
                  <CardContent className="p-4 flex flex-col items-center">
                    <div className="w-[120px] h-[120px] relative mb-3 bg-gray-50 rounded-lg overflow-hidden">
                      <Image
                        src={partner.logo || "/placeholder.svg"}
                        alt={partner.name}
                        width={120}
                        height={120}
                        className="object-contain"
                      />
                    </div>
                    <h3 className="font-bold text-center mb-2">{partner.name}</h3>
                    <p className="text-sm text-gray-600 text-center mb-3">{partner.description}</p>
                    {partner.website && (
                      <Link
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 text-sm flex items-center hover:underline"
                      >
                        Visiter le site
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </Link>
                    )}
                  </CardContent>
                </motion.Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
