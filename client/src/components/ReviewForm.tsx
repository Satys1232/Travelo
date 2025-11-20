import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, User, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Tour } from "@shared/schema";

interface ReviewFormProps {
  tour: Tour;
}

export function ReviewForm({ tour }: ReviewFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [formData, setFormData] = useState({
    customerName: "",
    customerLocation: "",
    comment: "",
  });

  const reviewMutation = useMutation({
    mutationFn: async (data: typeof formData & { rating: number }) => {
      const initials = data.customerName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

      const reviewData = {
        tourId: tour.id,
        customerName: data.customerName,
        customerInitials: initials,
        customerLocation: data.customerLocation,
        rating: data.rating,
        comment: data.comment,
      };

      return await apiRequest("POST", "/api/reviews", reviewData);
    },
    onSuccess: () => {
      toast({
        title: "Review Submitted!",
        description: "Thank you for your feedback!",
      });
      queryClient.invalidateQueries({ queryKey: [`/api/tours/${tour.slug}/reviews`] });
      queryClient.invalidateQueries({ queryKey: [`/api/tours/${tour.slug}`] });
      setFormData({
        customerName: "",
        customerLocation: "",
        comment: "",
      });
      setRating(5);
    },
    onError: (error: any) => {
      toast({
        title: "Submission Failed",
        description: error.message || "There was an error submitting your review. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.customerName || !formData.customerLocation || !formData.comment) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    if (formData.comment.length < 20) {
      toast({
        title: "Comment Too Short",
        description: "Please write at least 20 characters for your review.",
        variant: "destructive",
      });
      return;
    }

    reviewMutation.mutate({ ...formData, rating });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Write a Review</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating */}
          <div>
            <Label>Rating</Label>
            <div className="flex gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoveredRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-muted-foreground self-center">
                {rating} {rating === 1 ? "star" : "stars"}
              </span>
            </div>
          </div>

          {/* Name */}
          <div>
            <Label htmlFor="review-name">
              Your Name <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="review-name"
                placeholder="John Doe"
                className="pl-10"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <Label htmlFor="review-location">
              Location <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="review-location"
                placeholder="New York, USA"
                className="pl-10"
                value={formData.customerLocation}
                onChange={(e) => setFormData({ ...formData, customerLocation: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Comment */}
          <div>
            <Label htmlFor="review-comment">
              Your Review <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="review-comment"
              placeholder="Share your experience with this tour..."
              rows={5}
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              required
              minLength={20}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Minimum 20 characters ({formData.comment.length}/20)
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={reviewMutation.isPending}
          >
            {reviewMutation.isPending ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
