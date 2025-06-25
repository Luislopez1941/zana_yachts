export interface Yacht {
  id: number;
  name: string;
  location: string;
  pricePerDay: number;
  capacity: number;
  length: number;
  type: string;
  rating: number;
  reviews: number;
  image: string;
  features: string[];
}

export interface SearchFilters {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  priceRange: string;
  yachtType: string;
}

export interface BookingData {
  yachtId: number;
  startDate: string;
  endDate: string;
  guests: number;
  specialRequests: string;
  totalPrice: number;
  days: number;
}

export interface PaymentData {
  method: string;
  amount: number;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  paypalEmail?: string;
}
