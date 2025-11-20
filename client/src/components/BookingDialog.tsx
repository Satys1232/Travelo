import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarIcon, User, Mail, Phone, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Tour } from "@shared/schema";

interface BookingDialogProps {
  tour: Tour;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BookingDialog({ tour, open, onOpenChange }: BookingDialogProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    numberOfPeople: 1,
    startDate: "",
    specialRequests: "",
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const startDate = new Date(data.startDate);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + tour.duration);

      const bookingData = {
        tourId: tour.id,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        numberOfPeople: data.numberOfPeople,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        totalPrice: (parseFloat(tour.price) * data.numberOfPeople).toString(),
        specialRequests: data.specialRequests || null,
      };

      return await apiRequest("POST", "/api/bookings", bookingData);
    },
    onSuccess: () => {
      toast({
        title: "Booking Successful!",
        description: "Your tour has been booked. Check your email for confirmation.",
      });
      onOpenChange(false);
      setFormData({
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        numberOfPeople: 1,
        startDate: "",
        specialRequests: "",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Booking Failed",
        description: error.message || "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customerName || !formData.customerEmail || !formData.startDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (formData.numberOfPeople < 1) {
      toast({
        title: "Invalid Number",
        description: "Number of people must be at least 1.",
        variant: "destructive",
      });
      return;
    }

    if (tour.maxGroupSize && formData.numberOfPeople > tour.maxGroupSize) {
      toast({
        title: "Group Too Large",
        description: `This tour has a maximum group size of ${tour.maxGroupSize} people.`,
        variant: "destructive",
      });
      return;
    }

    bookingMutation.mutate(formData);
  };

  const price = parseFloat(tour.price);
  const totalPrice = price * formData.numberOfPeople;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book Your Tour</DialogTitle>
          <DialogDescription>
            Complete the form below to book {tour.title}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Customer Name */}
          <div>
            <Label htmlFor="customer-name">
              Full Name <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="customer-name"
                placeholder="John Doe"
                className="pl-10"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="customer-email">
              Email Address <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="customer-email"
                type="email"
                placeholder="john@example.com"
                className="pl-10"
                value={formData.customerEmail}
                onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="customer-phone">Phone Number (Optional)</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="customer-phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                className="pl-10"
                value={formData.customerPhone}
                onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
              />
            </div>
          </div>

          {/* Number of People and Start Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="number-of-people">
                Number of People <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="number-of-people"
                  type="number"
                  min="1"
                  max={tour.maxGroupSize || 50}
                  placeholder="1"
                  className="pl-10"
                  value={formData.numberOfPeople}
                  onChange={(e) => setFormData({ ...formData, numberOfPeople: parseInt(e.target.value) || 1 })}
                  required
                />
              </div>
              {tour.maxGroupSize && (
                <p className="text-xs text-muted-foreground mt-1">
                  Max group size: {tour.maxGroupSize}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="start-date">
                Start Date <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="start-date"
                  type="date"
                  className="pl-10"
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <Label htmlFor="special-requests">Special Requests (Optional)</Label>
            <Textarea
              id="special-requests"
              placeholder="Any dietary requirements, accessibility needs, or special requests..."
              rows={3}
              value={formData.specialRequests}
              onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
            />
          </div>

          {/* Price Summary */}
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Price per person:</span>
              <span className="font-medium">${price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Number of people:</span>
              <span className="font-medium">{formData.numberOfPeople}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Duration:</span>
              <span className="font-medium">{tour.duration} {tour.duration === 1 ? 'day' : 'days'}</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between items-center">
                <span className="font-bold">Total Price:</span>
                <span className="text-2xl font-bold text-primary">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
              disabled={bookingMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={bookingMutation.isPending}
            >
              {bookingMutation.isPending ? "Processing..." : "Confirm Booking"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
