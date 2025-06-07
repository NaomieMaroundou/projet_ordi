"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, ImageIcon, MessageSquare, Send, ThumbsUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"

type Review = {
  id: string
  user: {
    name: string
    avatar?: string
  }
  rating: number
  comment: string
  date: string
  likes: number
  isLiked: boolean
  replies?: Reply[]
}

type Reply = {
  id: string
  user: {
    name: string
    avatar?: string
  }
  comment: string
  date: string
}

export function ReviewSystem({ facilityId, isLoggedIn = false }: { facilityId: string; isLoggedIn?: boolean }) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      user: {
        name: "Marie K.",
        avatar: "/placeholder.svg?height=40&width=40&text=MK",
      },
      rating: 5,
      comment: "Personnel très attentionné et compétent. Les installations sont propres et modernes.",
      date: "Il y a 2 jours",
      likes: 12,
      isLiked: false,
    },
    {
      id: "2",
      user: {
        name: "Jean P.",
        avatar: "/placeholder.svg?height=40&width=40&text=JP",
      },
      rating: 4,
      comment: "Bon service mais temps d'attente un peu long aux urgences. Médecins très professionnels.",
      date: "Il y a 1 semaine",
      likes: 5,
      isLiked: false,
      replies: [
        {
          id: "r1",
          user: {
            name: "Dr. Moussavou",
            avatar: "/placeholder.svg?height=40&width=40&text=DM",
          },
          comment: "Merci pour votre retour. Nous travaillons à améliorer les temps d'attente aux urgences.",
          date: "Il y a 5 jours",
        },
      ],
    },
  ])

  const handleRatingChange = (newRating: number) => {
    setRating(newRating)
  }

  const handleSubmitReview = () => {
    if (!isLoggedIn) return

    if (rating === 0 || comment.trim() === "") return

    const newReview: Review = {
      id: Date.now().toString(),
      user: {
        name: "Vous",
        avatar: "/placeholder.svg?height=40&width=40&text=Vous",
      },
      rating,
      comment,
      date: "À l'instant",
      likes: 0,
      isLiked: false,
    }

    setReviews([newReview, ...reviews])
    setRating(0)
    setComment("")
  }

  const handleLike = (reviewId: string) => {
    if (!isLoggedIn) return

    setReviews(
      reviews.map((review) => {
        if (review.id === reviewId) {
          return {
            ...review,
            likes: review.isLiked ? review.likes - 1 : review.likes + 1,
            isLiked: !review.isLiked,
          }
        }
        return review
      }),
    )
  }

  return (
    <div className="w-full">
      <Tabs defaultValue="reviews">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="reviews">Avis ({reviews.length})</TabsTrigger>
          <TabsTrigger value="write">Écrire un avis</TabsTrigger>
        </TabsList>

        <TabsContent value="reviews">
          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarImage
                        src={review.user.avatar || `/placeholder.svg?text=${review.user.name.charAt(0)}`}
                        alt={review.user.name}
                      />
                      <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{review.user.name}</p>
                          <div className="flex items-center mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="text-xs text-gray-500 ml-2">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 mt-2">{review.comment}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <button
                          className={`flex items-center gap-1 text-xs ${
                            review.isLiked ? "text-blue-600" : "text-gray-500"
                          } hover:text-blue-600`}
                          onClick={() => handleLike(review.id)}
                          disabled={!isLoggedIn}
                        >
                          <ThumbsUp className="w-4 h-4" />
                          <span>{review.likes}</span>
                        </button>
                        {isLoggedIn && (
                          <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600">
                            <MessageSquare className="w-4 h-4" />
                            <span>Répondre</span>
                          </button>
                        )}
                      </div>

                      {/* Replies */}
                      {review.replies && review.replies.length > 0 && (
                        <div className="mt-3 pl-4 border-l-2 border-gray-200 space-y-3">
                          {review.replies.map((reply) => (
                            <div key={reply.id} className="flex items-start gap-2">
                              <Avatar className="w-6 h-6">
                                <AvatarImage
                                  src={reply.user.avatar || `/placeholder.svg?text=${reply.user.name.charAt(0)}`}
                                  alt={reply.user.name}
                                />
                                <AvatarFallback>{reply.user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="text-sm font-medium">{reply.user.name}</p>
                                  <span className="text-xs text-gray-500">{reply.date}</span>
                                </div>
                                <p className="text-sm text-gray-700">{reply.comment}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="write">
          {!isLoggedIn ? (
            <Alert className="bg-blue-50 border-blue-200 mb-4">
              <AlertDescription>
                Vous devez être connecté pour laisser un avis.
                <Button variant="link" className="text-blue-600 p-0 h-auto font-normal" asChild>
                  <a href="/login">Se connecter</a>
                </Button>{" "}
                ou
                <Button variant="link" className="text-blue-600 p-0 h-auto font-normal" asChild>
                  <a href="/register">créer un compte</a>
                </Button>
              </AlertDescription>
            </Alert>
          ) : (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">Votre évaluation</h3>
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingChange(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    </button>
                  ))}
                </div>

                <div className="mb-4">
                  <Textarea
                    placeholder="Partagez votre expérience..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Button variant="outline" size="sm" className="text-gray-600">
                    <ImageIcon className="w-4 h-4 mr-1" />
                    Ajouter une photo
                  </Button>
                </div>

                <Button
                  onClick={handleSubmitReview}
                  disabled={rating === 0 || comment.trim() === ""}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Publier l'avis
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
