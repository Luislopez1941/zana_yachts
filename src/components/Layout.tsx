'use client'

import { useState } from "react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import SearchFilters from "@/components/SearchFilters";
import YachtCard from "@/components/YachtCard";
import BookingModal from "@/components/BookingModal";
import PaymentModal from "../components/PaymentModal";
import "./styles/Home.css";

// Mock data for yachts
const yachts = [
  {
    id: 1,
    name: "Ocean Majesty",
    location: "Cancún, México",
    pricePerDay: 8500,
    capacity: 12,
    length: 25,
    type: "Motor",
    rating: 4.9,
    reviews: 127,
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=300&fit=crop",
    features: [
      "WiFi",
      "Cocina Completa",
      "Jacuzzi",
      "Bar",
      "Aire Acondicionado",
    ],
  },
  {
    id: 2,
    name: "Luxury Breeze",
    location: "Puerto Vallarta, México",
    pricePerDay: 12000,
    capacity: 16,
    length: 35,
    type: "Mega Yate",
    rating: 5.0,
    reviews: 89,
    image:
      "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=500&h=300&fit=crop",
    features: ["WiFi", "Chef Privado", "Spa", "Cinema", "Helipuerto"],
  },
  {
    id: 3,
    name: "Caribbean Dream",
    location: "Cozumel, México",
    pricePerDay: 6500,
    capacity: 8,
    length: 22,
    type: "Catamarán",
    rating: 4.8,
    reviews: 203,
    image:
      "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=500&h=300&fit=crop",
    features: ["WiFi", "Snorkel", "Kayaks", "Bar", "Parrilla"],
  },
  {
    id: 4,
    name: "Wind Seeker",
    location: "Cabo San Lucas, México",
    pricePerDay: 4500,
    capacity: 10,
    length: 18,
    type: "Velero",
    rating: 4.7,
    reviews: 156,
    image:
      "https://images.unsplash.com/photo-1551918120-9739cb430c6b?w=500&h=300&fit=crop",
    features: ["WiFi", "Velas Nuevas", "GPS", "Radio", "Cocina"],
  },
  {
    id: 5,
    name: "Sunset Paradise",
    location: "Playa del Carmen, México",
    pricePerDay: 9500,
    capacity: 14,
    length: 28,
    type: "Motor",
    rating: 4.9,
    reviews: 94,
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop",
    features: ["WiFi", "Jacuzzi", "BBQ", "Sound System", "Agua Slides"],
  },
  {
    id: 6,
    name: "Royal Explorer",
    location: "Acapulco, México",
    pricePerDay: 15000,
    capacity: 20,
    length: 40,
    type: "Mega Yate",
    rating: 5.0,
    reviews: 67,
    image:
      "https://images.unsplash.com/photo-1566024287286-457247b70310?w=500&h=300&fit=crop",
    features: ["WiFi", "Chef", "Spa", "Gym", "Cinema", "Piano"],
  },
];

interface BookingData {
  yachtId: number;
  startDate: string;
  endDate: string;
  guests: number;
  specialRequests: string;
  totalPrice: number;
  days: number;
}

const Layout = () => {

  const [hasSearched, setHasSearched] = useState(false);
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(false);
  const [currentFilters, setCurrentFilters] = useState({
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
        (yacht) => yacht.type.toLowerCase() === filters.yachtType.toLowerCase(),
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
    setIsFilterCollapsed(true);
  };



  return (
    <div className="index">
      <Header />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero__background"></div>
        <div className="hero__overlay"></div>

        <div className="hero__content">
          <h1 className="hero__title">
            Renta el Yate de tus
            <span className="hero__title-accent"> Sueños</span>
          </h1>
          <p className="hero__subtitle">
            Experimenta el lujo y la elegancia navegando en las aguas más
            hermosas del mundo
          </p>
          <SearchFilters
            onSearch={handleSearch}
            isCollapsed={isFilterCollapsed}
            initialFilters={currentFilters}
          />
        </div>

        {/* Scroll Indicator */}
        <div className="hero__scroll-indicator">
          <div className="animate-bounce">
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </section>

   

     

      
    </div>
  );
};

export default Layout;
