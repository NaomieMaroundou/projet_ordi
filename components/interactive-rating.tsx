"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/contexts/auth-context"

interface InteractiveRatingProps {
  initialRating?: number
  onRatingChange?: (rating: number) => void
  onSubmitReview?: (rating: number, comment: string) => void
  showReviewForm?: boolean
  size?: "sm" | "md" | "lg"
}

export function InteractiveRating({
  initialRating = 0,
  onRatingChange,
  onSubmitReview,
  showReviewForm = false,
  size = "md",
}: InteractiveRatingProps) {
  const [rating, setRating] = useState(initialRating)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState("")
  const [showForm, setShowForm] = useState(showReviewForm)
  const { isAuthenticated } = useAuth()

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  }

  const handleStarClick = (starRating: number) => {
    if (!isAuthenticated) return

    setRating(starRating)
    onRatingChange?.(starRating)
    if (showReviewForm) {
      setShowForm(true)
    }
  }

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmitReview?.(rating, comment)
      setComment("")
      setShowForm(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`transition-all duration-200 hover:scale-110 ${
              !isAuthenticated ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            }`}
            onMouseEnter={() => isAuthenticated && setHoverRating(star)}
            onMouseLeave={() => isAuthenticated && setHoverRating(0)}
            onClick={() => handleStarClick(star)}
            disabled={!isAuthenticated}
          >
            <Star
              className={`${sizeClasses[size]} transition-colors duration-200 ${
                star <= (hoverRating || rating)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300 hover:text-yellow-200"
              }`}
            />
          </button>
        ))}
        {rating > 0 && <span className="ml-2 text-sm font-medium text-gray-600">{rating}/5</span>}
      </div>

      {!isAuthenticated && <p className="text-xs text-gray-500">Connectez-vous pour donner une note</p>}

      {showForm && isAuthenticated && (
        <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
          <Textarea
            placeholder="Partagez votre expérience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
          />
          <div className="flex gap-2">
            <Button onClick={handleSubmit} disabled={rating === 0} className="bg-blue-600 hover:bg-blue-700">
              Publier l'avis
            </Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>
              Annuler
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
