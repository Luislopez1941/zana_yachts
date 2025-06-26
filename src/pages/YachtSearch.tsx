"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { YachtGrid } from "@/components/YachtGrid";
import BookingModal from "@/components/BookingModal";
import { PaymentModal } from "@/components/PaymentModal";
import { yachts } from "@/data/yachts";
import {
  Yacht,
  SearchFilters as SearchFiltersType,
  BookingData,
} from "@/types/yacht";

// import "@/components/styles/YachtSearch.css";

const YachtSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filteredYachts, setFilteredYachts] = useState<Yacht[]>([]);
  const [selectedYacht, setSelectedYacht] = useState<Yacht | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [currentFilters, setCurrentFilters] = useState<SearchFiltersType>({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    priceRange: "",
    yachtType: "",
  });

  useEffect(() => {
    if (!searchParams) return;

    const filters: SearchFiltersType = {
      location: searchParams.get("location") || "",
      checkIn: searchParams.get("checkIn") || "",
      checkOut: searchParams.get("checkOut") || "",
      guests: parseInt(searchParams.get("guests") || "1"),
      priceRange: searchParams.get("priceRange") || "",
      yachtType: searchParams.get("yachtType") || "",
    };

    setCurrentFilters(filters);
    applyFilters(filters);
  }, [searchParams]);

  const applyFilters = (filters: SearchFiltersType) => {
    let filtered = yachts;

    if (filters.location) {
      filtered = filtered.filter((yacht) =>
        yacht.location.toLowerCase().includes(filters.location.toLowerCase()),
      );
    }

    if (filters.guests > 1) {
      filtered = filtered.filter((yacht) => yacht.capacity >= filters.guests);
    }

    if (filters.yachtType) {
      filtered = filtered.filter(
        (yacht) =>
          yacht.type.toLowerCase() === filters.yachtType.toLowerCase(),
      );
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange
        .split("-")
        .map((p) => parseInt(p.replace("+", "")));

      filtered = filtered.filter((yacht) => {
        if (max) {
          return yacht.pricePerDay >= min && yacht.pricePerDay <= max;
        }
        return yacht.pricePerDay >= min;
      });
    }

    setFilteredYachts(filtered);
  };

  const handleBookNow = (yacht: Yacht) => {
    setSelectedYacht(yacht);
    setIsBookingModalOpen(true);
  };

  const handleBookingConfirm = (data: BookingData) => {
    setBookingData(data);
    setIsBookingModalOpen(false);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentComplete = (paymentData: any) => {
    setIsPaymentModalOpen(false);
    setSelectedYacht(null);
    setBookingData(null);

    alert(
      `¡Reserva confirmada! 🎉\n\nYate: ${selectedYacht?.name}\nMétodo de pago: ${paymentData.method}\nTotal: $${paymentData.amount.toLocaleString()}\n\nRecibirás un email de confirmación pronto.`,
    );
  };

  const handleClearSearch = () => {
    router.push("/");
  };

  const handleShowAllYachts = () => {
    router.push("/");
  };

  return (
    <div className="yacht-search-page">
      

      <div className="yacht-search-results">
        <YachtGrid
          yachts={filteredYachts}
          hasSearched={true}
          onBookNow={handleBookNow}
          onClearSearch={handleClearSearch}
          onShowAllYachts={handleShowAllYachts}
        />
      </div>

      {selectedYacht && (
        <BookingModal
          yacht={selectedYacht}
          isOpen={isBookingModalOpen}
          onClose={() => {
            setIsBookingModalOpen(false);
            setSelectedYacht(null);
          }}
          onConfirm={handleBookingConfirm}
        />
      )}

      {bookingData && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => {
            setIsPaymentModalOpen(false);
            setBookingData(null);
          }}
          bookingData={bookingData}
          yachtName={selectedYacht?.name || ""}
          onPaymentComplete={handlePaymentComplete}
        />
      )}
    </div>
  );
};

export default YachtSearch;
