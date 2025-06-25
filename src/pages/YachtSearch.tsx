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
import "@/components/yacht/CollapsedFilters.css";
import "@/components/yacht/YachtSearch.css";

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
      <header className="yacht-search-header sticky">
        <div className="yacht-search-header-container">
          <button onClick={() => router.push("/")} className="yacht-search-back-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
            Volver al inicio
          </button>
          <h1 className="yacht-search-title">Resultados de Búsqueda</h1>
          <div className="yacht-search-actions">
            <button onClick={handleClearSearch} className="yacht-search-clear-button">
              Nueva búsqueda
            </button>
          </div>
        </div>
      </header>

      <div className="yacht-search-summary">
        <div className="yacht-search-summary-container">
          <div className="yacht-search-summary-content">
            <div>
              <h2 className="yacht-search-summary-title">Yates disponibles</h2>
              <p className="yacht-search-summary-count">
                {filteredYachts.length} resultados encontrados
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="collapsed-filters">
        <div className="collapsed-filters-container">
          <div className="collapsed-filters-list">
            <div className="collapsed-filter-item">
              <svg className="collapsed-filter-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{currentFilters.location || "Cualquier ubicación"}</span>
            </div>
            {currentFilters.checkIn && (
              <div className="collapsed-filter-item">
                <svg className="collapsed-filter-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 2v4" />
                  <path d="M16 2v4" />
                  <rect width="18" height="18" x="3" y="4" rx="2" />
                  <path d="M3 10h18" />
                </svg>
                <span>
                  {currentFilters.checkIn} - {currentFilters.checkOut}
                </span>
              </div>
            )}
            <div className="collapsed-filter-item">
              <svg className="collapsed-filter-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span>{currentFilters.guests} huéspedes</span>
            </div>
            {currentFilters.priceRange && (
              <div className="collapsed-filter-item">
                <svg className="collapsed-filter-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" x2="12" y1="2" y2="22" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                <span>${currentFilters.priceRange}</span>
              </div>
            )}
            {currentFilters.yachtType && (
              <div className="collapsed-filter-item">
                <svg className="collapsed-filter-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 16v6" />
                  <circle cx="12" cy="10" r="8" />
                  <path d="M8 12h8" />
                </svg>
                <span>{currentFilters.yachtType}</span>
              </div>
            )}
          </div>
        </div>
      </div>

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
