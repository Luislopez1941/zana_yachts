'use client'

import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
// import { SearchFilters } from "@/components/SearchFilters";
import { YachtGrid } from "@/components/YachtGrid";
import BookingModal from "@/components/BookingModal";
import { PaymentModal } from "@/components/PaymentModal";
import { FeaturesSection } from "@/components/FeaturesSection";
import { AboutSection } from "@/components/AboutSection";
// import { CTASection } from "@/components/CTASection";
import { yachts } from "@/data/yachts";



const Index = () => {
  const [filteredYachts, setFilteredYachts] = useState<any>(yachts);
  const [selectedYacht, setSelectedYacht] = useState<any | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState<any | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<any>({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    priceRange: "",
    yachtType: "",
  });

  const handleSearch = (filters: any) => {
    let filtered = yachts;
    setCurrentFilters(filters);
    setHasSearched(true);



    setFilteredYachts(filtered);
    setIsFilterCollapsed(true);
  };

  const handleBookNow = (yacht: any) => {
    setSelectedYacht(yacht);
    setIsBookingModalOpen(true);
  };

  const handleBookingConfirm = (data: any) => {
    setBookingData(data);
    setIsBookingModalOpen(false);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentComplete = (paymentData: any) => {
    setIsPaymentModalOpen(false);
    setSelectedYacht(null);
    setBookingData(null);

    // Show success message
    alert(
      `¡Reserva confirmada! 🎉\n\nYate: ${selectedYacht?.name}\nMétodo de pago: ${paymentData.method}\nTotal: $${paymentData.amount.toLocaleString()}\n\nRecibirás un email de confirmación pronto.`,
    );
  };



  const clearSearch = () => {
    setFilteredYachts(yachts);
    setHasSearched(false);
    setIsFilterCollapsed(false);
    setCurrentFilters({
      location: "",
      checkIn: "",
      checkOut: "",
      guests: 1,
      priceRange: "",
      yachtType: "",
    });
  };

  const handleShowAllYachts = () => {
    clearSearch();
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--gray-50)" }}>
      {/* Hero Section with integrated search */}
      <Header />
      <HeroSection onSearch={handleSearch} />

 

      {/* Featured Yachts */}
      <YachtGrid
        yachts={filteredYachts}
        hasSearched={hasSearched}
        onBookNow={handleBookNow}
        onClearSearch={clearSearch}
        onShowAllYachts={handleShowAllYachts}
      />

      {/* Features Section */}
      <FeaturesSection />

      {/* About Section */}
      <AboutSection />

      {/* CTA Section */}
      {/* <CTASection /> */}

 
      {/* Payment Modal */}
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
      <Footer />
    </div>
  );
};

export default Index;
