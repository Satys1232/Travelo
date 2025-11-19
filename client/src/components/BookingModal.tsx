import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import type { Tour } from "@shared/schema";

interface BookingModalProps {
  tour: Tour;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BookingModal({ tour, open, onOpenChange }: BookingModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    numberOfPeople: "1",
    startDate: "",
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const numberOfPeople = parseInt(data.numberOfPeople);
      const startDate = new Date(data.startDate);
      const endDate = new Date(startDate.getTime() + (tour.duration * 24 * 60 * 60 * 1000));
      
      if (isNaN(numberOfPeople) || numberOfPeople < 1) {
        throw new Error("Please enter a valid number of people");
      }
      
      if (!data.startDate || isNaN(startDate.getTime())) {
        throw new Error("Please select a valid start date");
      }
      
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tourId: tour.id,
          customerName: data.customerName,
          customerEmail: data.customerEmail,
          customerPhone: data.customerPhone || null,
          numberOfPeople: numberOfPeople,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          totalPrice: (parseFloat(tour.price) * numberOfPeople).toFixed(2),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create booking");
      }

      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Booking Confirmed!",
        description: "Thank you for your booking. We'll send a confirmation email shortly.",
      });
      setFormData({
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        numberOfPeople: "1",
        startDate: "",
      });
      onOpenChange(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Booking Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customerName.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your name",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.customerEmail.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your email",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.startDate) {
      toast({
        title: "Validation Error",
        description: "Please select a start date",
        variant: "destructive",
      });
      return;
    }
    
    const numberOfPeople = parseInt(formData.numberOfPeople);
    if (isNaN(numberOfPeople) || numberOfPeople < 1) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid number of people (minimum 1)",
        variant: "destructive",
      });
      return;
    }
    
    bookingMutation.mutate(formData);
  };

  const totalPrice = (parseFloat(tour.price) * parseInt(formData.numberOfPeople || "1")).toFixed(2);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Book Your Tour</DialogTitle>
          <DialogDescription>
            {tour.title} - ${tour.price} per person
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="customerName">Full Name *</Label>
            <Input
              id="customerName"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              required
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customerEmail">Email *</Label>
            <Input
              id="customerEmail"
              type="email"
              value={formData.customerEmail}
              onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
              required
              placeholder="john@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customerPhone">Phone Number</Label>
            <Input
              id="customerPhone"
              type="tel"
              value={formData.customerPhone}
              onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
              placeholder="+1 234 567 8900"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="numberOfPeople">Number of People *</Label>
              <Input
                id="numberOfPeople"
                type="number"
                min="1"
                max={tour.maxGroupSize || 50}
                value={formData.numberOfPeople}
                onChange={(e) => setFormData({ ...formData, numberOfPeople: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Duration:</span>
              <span className="font-medium">{tour.duration} days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold">Total Price:</span>
              <span className="text-lg font-bold text-primary">${totalPrice}</span>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
              disabled={bookingMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 gap-2"
              disabled={bookingMutation.isPending}
            >
              <Calendar className="h-4 w-4" />
              {bookingMutation.isPending ? "Booking..." : "Confirm Booking"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
