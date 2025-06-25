'use client'

import { useState } from "react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import "./styles/Reservations.css";

interface Reservation {
  id: number;
  yachtName: string;
  yachtImage: string;
  location: string;
  dates: {
    start: string;
    end: string;
  };
  guests: number;
  totalPrice: number;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  bookingDate: string;
}

const mockReservations: Reservation[] = [
  {
    id: 1,
    yachtName: "Ocean Majesty",
    yachtImage:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop",
    location: "Cancún, México",
    dates: {
      start: "2024-02-15",
      end: "2024-02-18",
    },
    guests: 8,
    totalPrice: 25500,
    status: "confirmed",
    bookingDate: "2024-01-20",
  },
  {
    id: 2,
    yachtName: "Luxury Breeze",
    yachtImage:
      "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=300&h=200&fit=crop",
    location: "Puerto Vallarta, México",
    dates: {
      start: "2024-03-10",
      end: "2024-03-12",
    },
    guests: 12,
    totalPrice: 24000,
    status: "pending",
    bookingDate: "2024-02-01",
  },
  {
    id: 3,
    yachtName: "Caribbean Dream",
    yachtImage:
      "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=300&h=200&fit=crop",
    location: "Cozumel, México",
    dates: {
      start: "2023-12-20",
      end: "2023-12-23",
    },
    guests: 6,
    totalPrice: 19500,
    status: "completed",
    bookingDate: "2023-11-15",
  },
];

const Reservations = () => {
  const [reservations] = useState<Reservation[]>(mockReservations);
  const [filter, setFilter] = useState<string>("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "status-confirmed";
      case "pending":
        return "status-pending";
      case "cancelled":
        return "status-cancelled";
      case "completed":
        return "status-completed";
      default:
        return "status-default";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmada";
      case "pending":
        return "Pendiente";
      case "cancelled":
        return "Cancelada";
      case "completed":
        return "Completada";
      default:
        return status;
    }
  };

  const filteredReservations = reservations.filter((reservation) => {
    if (filter === "all") return true;
    return reservation.status === filter;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="reservations-page">
      <Header />

      <div className="reservations-container">
        {/* Page Header */}
        <div className="reservations-header">
          <h1 className="reservations-title">Mis Reservas</h1>
          <p className="reservations-subtitle">
            Gestiona y consulta todas tus reservas de yates
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="reservations-filters">
          <div className="filter-tabs">
            {[
              { key: "all", label: "Todas", count: reservations.length },
              {
                key: "confirmed",
                label: "Confirmadas",
                count: reservations.filter((r) => r.status === "confirmed")
                  .length,
              },
              {
                key: "pending",
                label: "Pendientes",
                count: reservations.filter((r) => r.status === "pending")
                  .length,
              },
              {
                key: "completed",
                label: "Completadas",
                count: reservations.filter((r) => r.status === "completed")
                  .length,
              },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`filter-tab ${filter === tab.key ? "filter-tab--active" : ""}`}
              >
                {tab.label}
                <span className="filter-tab__count">{tab.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Reservations List */}
        {filteredReservations.length === 0 ? (
          <div className="no-reservations">
            <div className="no-reservations__icon">
              <svg
                width="64"
                height="64"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
              </svg>
            </div>
            <h3 className="no-reservations__title">No tienes reservas</h3>
            <p className="no-reservations__subtitle">
              {filter === "all"
                ? "Aún no has realizado ninguna reserva"
                : `No tienes reservas ${getStatusText(filter).toLowerCase()}`}
            </p>
            <button className="btn btn-primary">Explorar Yates</button>
          </div>
        ) : (
          <div className="reservations-list">
            {filteredReservations.map((reservation) => (
              <div key={reservation.id} className="reservation-card">
                <div className="reservation-card__content">
                  <div className="reservation-info">
                    <div className="reservation-yacht">
                      <img
                        src={reservation.yachtImage}
                        alt={reservation.yachtName}
                        className="reservation-yacht__image"
                      />
                      <div className="reservation-yacht__details">
                        <div className="reservation-yacht__header">
                          <h3 className="reservation-yacht__name">
                            {reservation.yachtName}
                          </h3>
                          <span
                            className={`status-badge ${getStatusColor(reservation.status)}`}
                          >
                            {getStatusText(reservation.status)}
                          </span>
                        </div>
                        <div className="reservation-yacht__location">
                          <svg
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fillRule="evenodd"
                              d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>{reservation.location}</span>
                        </div>
                        <div className="reservation-yacht__guests">
                          <svg
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span>{reservation.guests} huéspedes</span>
                        </div>
                      </div>
                    </div>

                    <div className="reservation-summary">
                      <div className="reservation-price">
                        <div className="reservation-price__amount">
                          ${reservation.totalPrice.toLocaleString()}
                        </div>
                        <div className="reservation-dates">
                          {formatDate(reservation.dates.start)} -{" "}
                          {formatDate(reservation.dates.end)}
                        </div>
                      </div>
                      <div className="reservation-actions">
                        <button className="btn btn-primary btn-sm">
                          Ver Detalles
                        </button>
                        {reservation.status === "confirmed" && (
                          <button className="btn btn-secondary btn-sm">
                            Modificar
                          </button>
                        )}
                        {reservation.status === "pending" && (
                          <button className="btn btn-danger btn-sm">
                            Cancelar
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="reservation-footer">
                    <div className="reservation-meta">
                      <div className="reservation-booking-date">
                        Reservado el {formatDate(reservation.bookingDate)}
                      </div>
                      <div className="reservation-id">
                        ID de reserva: #
                        {reservation.id.toString().padStart(6, "0")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2 className="quick-actions__title">Acciones Rápidas</h2>
          <div className="quick-actions__grid">
            <div className="quick-action">
              <div className="quick-action__icon quick-action__icon--primary">
                <svg
                  width="32"
                  height="32"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <h3 className="quick-action__title">Nueva Reserva</h3>
              <p className="quick-action__description">
                Encuentra y reserva tu próximo yate
              </p>
              <button className="btn btn-primary">Buscar Yates</button>
            </div>

            <div className="quick-action">
              <div className="quick-action__icon quick-action__icon--secondary">
                <svg
                  width="32"
                  height="32"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="m18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <h3 className="quick-action__title">Soporte</h3>
              <p className="quick-action__description">
                Contacta nuestro equipo de ayuda
              </p>
              <button className="btn btn-secondary">Contactar</button>
            </div>

            <div className="quick-action">
              <div className="quick-action__icon quick-action__icon--accent">
                <svg
                  width="32"
                  height="32"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="quick-action__title">Mi Perfil</h3>
              <p className="quick-action__description">
                Actualiza tu información personal
              </p>
              <button className="btn btn-secondary">Editar Perfil</button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Reservations;
