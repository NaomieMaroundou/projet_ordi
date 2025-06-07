"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MessageCircle, Share2, ImageIcon, Video, Send, ThumbsUp, Users, Globe, Lock, ArrowLeft } from "lucide-react"
import Image from "next/image"

type Post = {
  id: string
  user: {
    name: string
    avatar?: string
  }
  content: string
  images?: string[]
  video?: string
  date: string
  likes: number
  comments: number
  shares: number
  isLiked: boolean
  privacy: "public" | "friends" | "private"
}

export default function CommunautePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Simuler l'état de connexion
  const [newPost, setNewPost] = useState("")
  const [activeTab, setActiveTab] = useState("actualites")
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      user: {
        name: "Marie Ndong",
        avatar: "/placeholder.svg?height=50&width=50&text=MN",
      },
      content:
        "Je viens de consulter le Dr. Moussavou à l'Hôpital Central de Libreville. Service impeccable et personnel très attentionné. Je recommande vivement !",
      date: "Il y a 2 heures",
      likes: 24,
      comments: 5,
      shares: 2,
      isLiked: false,
      privacy: "public",
    },
    {
      id: "2",
      user: {
        name: "Jean Obame",
        avatar: "/placeholder.svg?height=50&width=50&text=JO",
      },
      content:
        "Quelqu'un connaît-il un bon pédiatre à Port-Gentil ? Mon fils a besoin d'une consultation et notre médecin habituel est en congé.",
      date: "Il y a 5 heures",
      likes: 3,
      comments: 12,
      shares: 0,
      isLiked: false,
      privacy: "friends",
    },
    {
      id: "3",
      user: {
        name: "Dr. Sophie Mba",
        avatar: "/images/doctor2.png",
      },
      content:
        "Rappel important : la campagne de vaccination contre le paludisme continue dans tous les centres de santé de Libreville cette semaine. N'oubliez pas d'amener vos enfants !",
      images: ["/placeholder.svg?height=300&width=600&text=Campagne+de+vaccination"],
      date: "Il y a 1 jour",
      likes: 56,
      comments: 8,
      shares: 34,
      isLiked: true,
      privacy: "public",
    },
  ])

  const handlePostSubmit = () => {
    if (!isLoggedIn || newPost.trim() === "") return

    const post: Post = {
      id: Date.now().toString(),
      user: {
        name: "Vous",
        avatar: "/placeholder.svg?height=50&width=50&text=Vous",
      },
      content: newPost,
      date: "À l'instant",
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      privacy: "public",
    }

    setPosts([post, ...posts])
    setNewPost("")
  }

  const handleLike = (postId: string) => {
    if (!isLoggedIn) return

    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked,
          }
        }
        return post
      }),
    )
  }

  // Simuler la connexion/déconnexion pour la démo
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container flex items-center p-4">
          <Link href="/" className="mr-3">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-bold">Communauté SantéGabon</h1>
          <Button
            variant="outline"
            size="sm"
            className={isLoggedIn ? "ml-auto bg-red-100 text-red-600" : "ml-auto bg-green-100 text-green-600"}
            onClick={toggleLogin}
          >
            {isLoggedIn ? "Simuler déconnexion" : "Simuler connexion"}
          </Button>
        </div>
      </div>

      <main className="flex-1 container py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card className="sticky top-24">
              <CardHeader className="pb-2">
                <h2 className="text-lg font-bold">Navigation</h2>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("actualites")}>
                  <Globe className="w-5 h-5 mr-2" />
                  Fil d'actualités
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("experiences")}>
                  <Users className="w-5 h-5 mr-2" />
                  Expériences partagées
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("messages")}>
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Messages
                </Button>
                <Link href="/communaute/groupes" className="block">
                  <Button variant="ghost" className="w-full justify-start">
                    <Users className="w-5 h-5 mr-2" />
                    Groupes de soutien
                  </Button>
                </Link>
                <Link href="/communaute/evenements" className="block">
                  <Button variant="ghost" className="w-full justify-start">
                    <Calendar className="w-5 h-5 mr-2" />
                    Événements santé
                  </Button>
                </Link>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                  <Link href="/communaute/messages">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Messagerie
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            <Tabs defaultValue="actualites" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="actualites">Actualités</TabsTrigger>
                <TabsTrigger value="experiences">Expériences</TabsTrigger>
                <TabsTrigger value="messages">Messages</TabsTrigger>
              </TabsList>

              <TabsContent value="actualites">
                {/* Create Post */}
                {isLoggedIn ? (
                  <Card className="mb-6">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=40&width=40&text=Vous" alt="Votre avatar" />
                          <AvatarFallback>Vous</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <Textarea
                            placeholder="Partagez quelque chose avec la communauté..."
                            value={newPost}
                            onChange={(e) => setNewPost(e.target.value)}
                            className="min-h-[100px] mb-3"
                          />
                          <div className="flex justify-between items-center">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <ImageIcon className="w-4 h-4 mr-1" />
                                Photo
                              </Button>
                              <Button variant="outline" size="sm">
                                <Video className="w-4 h-4 mr-1" />
                                Vidéo
                              </Button>
                            </div>
                            <div className="flex items-center gap-2">
                              <select className="text-sm border rounded p-1">
                                <option value="public">Public</option>
                                <option value="friends">Amis</option>
                                <option value="private">Privé</option>
                              </select>
                              <Button
                                onClick={handlePostSubmit}
                                disabled={newPost.trim() === ""}
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                <Send className="w-4 h-4 mr-1" />
                                Publier
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Alert className="bg-blue-50 border-blue-200 mb-6">
                    <AlertDescription>
                      Connectez-vous pour partager du contenu avec la communauté.
                      <Button variant="link" className="text-blue-600 p-0 h-auto font-normal" asChild>
                        <Link href="/login">Se connecter</Link>
                      </Button>{" "}
                      ou
                      <Button variant="link" className="text-blue-600 p-0 h-auto font-normal" asChild>
                        <Link href="/register">créer un compte</Link>
                      </Button>
                    </AlertDescription>
                  </Alert>
                )}

                {/* Posts */}
                <div className="space-y-6">
                  {posts.map((post) => (
                    <Card key={post.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage
                                src={post.user.avatar || `/placeholder.svg?text=${post.user.name.charAt(0)}`}
                                alt={post.user.name}
                              />
                              <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">{post.user.name}</h3>
                              <div className="flex items-center text-xs text-gray-500">
                                <span>{post.date}</span>
                                <span className="mx-1">•</span>
                                <span className="flex items-center">
                                  {post.privacy === "public" ? (
                                    <Globe className="w-3 h-3 mr-1" />
                                  ) : post.privacy === "friends" ? (
                                    <Users className="w-3 h-3 mr-1" />
                                  ) : (
                                    <Lock className="w-3 h-3 mr-1" />
                                  )}
                                  {post.privacy === "public" ? "Public" : post.privacy === "friends" ? "Amis" : "Privé"}
                                </span>
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-gray-800 mb-3">{post.content}</p>
                        {post.images && post.images.length > 0 && (
                          <div className="mb-3">
                            {post.images.map((img, index) => (
                              <Image
                                key={index}
                                src={img || "/placeholder.svg"}
                                alt="Post image"
                                width={600}
                                height={300}
                                className="rounded-lg w-full object-cover"
                              />
                            ))}
                          </div>
                        )}
                        {post.video && (
                          <div className="mb-3 relative pt-[56.25%]">
                            <iframe
                              src={post.video}
                              className="absolute top-0 left-0 w-full h-full rounded-lg"
                              allowFullScreen
                            ></iframe>
                          </div>
                        )}
                        <div className="flex justify-between text-xs text-gray-500 py-2 border-t border-b">
                          <span>{post.likes} j'aime</span>
                          <div>
                            <span>{post.comments} commentaires</span>
                            <span className="mx-1">•</span>
                            <span>{post.shares} partages</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-2">
                        <div className="flex justify-between w-full">
                          <Button
                            variant="ghost"
                            size="sm"
                            className={post.isLiked ? "text-blue-600" : ""}
                            onClick={() => handleLike(post.id)}
                            disabled={!isLoggedIn}
                          >
                            <ThumbsUp className="w-4 h-4 mr-1" />
                            J'aime
                          </Button>
                          <Button variant="ghost" size="sm" disabled={!isLoggedIn}>
                            <MessageCircle className="w-4 h-4 mr-1" />
                            Commenter
                          </Button>
                          <Button variant="ghost" size="sm" disabled={!isLoggedIn}>
                            <Share2 className="w-4 h-4 mr-1" />
                            Partager
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="experiences">
                <Card>
                  <CardHeader>
                    <h2 className="text-lg font-bold">Expériences partagées</h2>
                    <p className="text-gray-600">
                      Découvrez les expériences des autres patients et partagez les vôtres.
                    </p>
                  </CardHeader>
                  <CardContent>
                    {isLoggedIn ? (
                      <div className="space-y-6">
                        <div className="border-b pb-4">
                          <h3 className="font-medium mb-2">Partagez votre expérience</h3>
                          <Textarea
                            placeholder="Décrivez votre expérience avec un établissement de santé ou un médecin..."
                            className="min-h-[100px] mb-3"
                          />
                          <div className="flex justify-between">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <ImageIcon className="w-4 h-4 mr-1" />
                                Ajouter des photos
                              </Button>
                              <select className="text-sm border rounded p-1">
                                <option value="">Sélectionner un établissement</option>
                                <option value="1">Hôpital Central de Libreville</option>
                                <option value="2">Centre Hospitalier de Franceville</option>
                                <option value="3">Clinique El Rapha</option>
                              </select>
                            </div>
                            <Button className="bg-blue-600 hover:bg-blue-700">
                              <Send className="w-4 h-4 mr-1" />
                              Publier
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {[
                            {
                              user: "Pierre Obame",
                              avatar: "/placeholder.svg?height=40&width=40&text=PO",
                              facility: "Hôpital Central de Libreville",
                              rating: 4,
                              date: "Il y a 3 jours",
                              content:
                                "J'ai été hospitalisé pendant une semaine suite à un accident. Le personnel médical a été très professionnel et attentionné. Les chambres sont propres et bien équipées. Seul bémol : le temps d'attente aux urgences était assez long.",
                              images: ["/placeholder.svg?height=200&width=400&text=Hôpital+Central"],
                            },
                            {
                              user: "Jeanne Koumba",
                              avatar: "/placeholder.svg?height=40&width=40&text=JK",
                              facility: "Centre Hospitalier de Franceville",
                              rating: 5,
                              date: "Il y a 1 semaine",
                              content:
                                "Excellente prise en charge pour mon accouchement. L'équipe de la maternité est formidable, très à l'écoute et rassurante. Les installations sont modernes et tout est fait pour le confort des mamans et des nouveau-nés.",
                            },
                          ].map((exp, index) => (
                            <Card key={index}>
                              <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                  <Avatar>
                                    <AvatarImage src={exp.avatar || "/placeholder.svg"} alt={exp.user} />
                                    <AvatarFallback>{exp.user.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <h3 className="font-medium">{exp.user}</h3>
                                        <p className="text-sm text-blue-600">{exp.facility}</p>
                                        <div className="flex items-center mt-1">
                                          {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                              key={star}
                                              className={`w-4 h-4 ${
                                                star <= exp.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                              }`}
                                            />
                                          ))}
                                          <span className="text-xs text-gray-500 ml-2">{exp.date}</span>
                                        </div>
                                      </div>
                                    </div>
                                    <p className="text-gray-700 mt-2">{exp.content}</p>
                                    {exp.images && (
                                      <div className="mt-3 grid grid-cols-2 gap-2">
                                        {exp.images.map((img, idx) => (
                                          <Image
                                            key={idx}
                                            src={img || "/placeholder.svg"}
                                            alt="Experience"
                                            width={200}
                                            height={150}
                                            className="rounded-lg object-cover"
                                          />
                                        ))}
                                      </div>
                                    )}
                                    <div className="flex items-center gap-4 mt-3">
                                      <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600">
                                        <ThumbsUp className="w-4 h-4" />
                                        <span>Utile (12)</span>
                                      </button>
                                      <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600">
                                        <MessageCircle className="w-4 h-4" />
                                        <span>Commenter (3)</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Alert className="bg-blue-50 border-blue-200">
                        <AlertDescription>
                          Connectez-vous pour partager vos expériences et voir celles des autres.
                          <Button variant="link" className="text-blue-600 p-0 h-auto font-normal" asChild>
                            <Link href="/login">Se connecter</Link>
                          </Button>{" "}
                          ou
                          <Button variant="link" className="text-blue-600 p-0 h-auto font-normal" asChild>
                            <Link href="/register">créer un compte</Link>
                          </Button>
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="messages">
                <Card>
                  <CardHeader>
                    <h2 className="text-lg font-bold">Messages</h2>
                    <p className="text-gray-600">Communiquez avec d'autres patients et professionnels de santé.</p>
                  </CardHeader>
                  <CardContent>
                    {isLoggedIn ? (
                      <div className="text-center py-8">
                        <MessageCircle className="w-16 h-16 text-blue-200 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">Votre messagerie</h3>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                          Accédez à votre messagerie pour communiquer avec d'autres membres de la communauté SantéGabon.
                        </p>
                        <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                          <Link href="/communaute/messages">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Accéder à la messagerie
                          </Link>
                        </Button>
                      </div>
                    ) : (
                      <Alert className="bg-blue-50 border-blue-200">
                        <AlertDescription>
                          Connectez-vous pour accéder à la messagerie.
                          <Button variant="link" className="text-blue-600 p-0 h-auto font-normal" asChild>
                            <Link href="/login">Se connecter</Link>
                          </Button>{" "}
                          ou
                          <Button variant="link" className="text-blue-600 p-0 h-auto font-normal" asChild>
                            <Link href="/register">créer un compte</Link>
                          </Button>
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}

function Calendar(props) {
  return <div {...props} />
}

function MoreHorizontal(props) {
  return <div {...props} />
}

function Star(props) {
  return <div {...props} />
}
