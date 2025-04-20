"use client"

import type React from "react"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useAuth } from "@/context/auth-context"
import { toast } from "sonner"
import { Star, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent,  CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

const AddProductReview = ({ productId }: { productId: string }) => {
  const { user } = useAuth()
  const [rating, setRating] = useState(5)
  const [review, setReview] = useState("")
  const [hoveredRating, setHoveredRating] = useState(0)

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${backendUrl}/api/v1/reviews/products/${productId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?._id, // or user.id depending on your user object
          rating,
          review,
        }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || "Something went wrong")
      }

      return res.json()
    },
    onSuccess: () => {
      toast.success("Review added!")
      setReview("")
      setRating(5)
    },
    onError: () => {
      toast.error( "Failed to add review")
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!review.trim()) {
      return toast.error("Please write a review.")
    }
    mutate()
  }

  const ratingLabels = {
    1: "Poor",
    2: "Fair",
    3: "Good",
    4: "Very Good",
    5: "Excellent",
  }

  return (
    <Card className="max-w-5xl mx-auto shadow-md border-0">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-t-xl">
        <CardTitle className="text-xl">Share Your Experience</CardTitle>
        {/* <CardDescription>Tell others what you think about this product</CardDescription> */}
      </CardHeader>

      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    key={value}
                    onClick={() => setRating(value)}
                    onMouseEnter={() => setHoveredRating(value)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="focus:outline-none p-1"
                  >
                    <Star
                      size={32}
                      className={`${
                        (hoveredRating ? hoveredRating >= value : rating >= value)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      } transition-colors`}
                    />
                  </motion.button>
                ))}
              </div>
              <p className="text-sm font-medium text-center text-slate-600 dark:text-slate-300 h-6">
                {rating > 0 && ratingLabels[rating as keyof typeof ratingLabels]}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={4}
              placeholder="What did you like or dislike? What did you use this product for?"
              className="resize-none focus:ring-2 focus:ring-slate-400 transition-all"
            />
            <p className="text-xs text-right text-slate-500">{review.length}/500 characters</p>
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex justify-end gap-2 bg-slate-50 dark:bg-slate-900 rounded-b-xl py-4">
        <Button
          variant="outline"
          type="button"
          disabled={isPending}
          onClick={() => {
            setReview("")
            setRating(5)
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPending || !review.trim()}
          onClick={handleSubmit}
          className="bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-700 dark:hover:bg-slate-600"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Review"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default AddProductReview
