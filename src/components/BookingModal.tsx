'use client'

import { useState } from "react";
import "./styles/BookingModal.css";

interface Yacht {
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

interface BookingModalProps {
  yacht: Yacht;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (bookingData: BookingData) => void;
}

interface BookingData {
  yachtId: number;
  startDate: string;
  endDate: string;
  guests: number;
  specialRequests: string;
  totalPrice: number;
  days: number;
}

const BookingModal = ({
  yacht,
  isOpen,
  onClose,
  onConfirm,
}: BookingModalProps) => {
  const [bookingData, setBookingData] = useState({
    startDate: "",
    endDate: "",
    guests: 1,
    specialRequests: "",
  });

  const calculateDays = () => {
    if (bookingData.startDate && bookingData.endDate) {
      const start = new Date(bookingData.startDate);
      const end = new Date(bookingData.endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const days = calculateDays();
  const totalPrice = days * yacht.pricePerDay;
  const taxes = totalPrice * 0.16; // 16% IVA
  const finalPrice = totalPrice + taxes;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingData.startDate || !bookingData.endDate) {
      alert("Por favor selecciona las fechas de tu reserva");
      return;
    }

    onConfirm({
      yachtId: yacht.id,
      startDate: bookingData.startDate,
      endDate: bookingData.endDate,
      guests: bookingData.guests,
      specialRequests: bookingData.specialRequests,
      totalPrice: finalPrice,
      days,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content booking-modal">
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">Reservar Yate</h2>
          <button onClick={onClose} className="modal-close">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M6 18L18 6M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Yacht Info */}
        <div className="booking-modal__yacht-info">
          <div className="yacht-summary">
            <img
              src={yacht.image}
              alt={yacht.name}
              className="yacht-summary__image"
            />
            <div className="yacht-summary__details">
              <h3 className="yacht-summary__name">{yacht.name}</h3>
              <p className="yacht-summary__location">{yacht.location}</p>
              <div className="yacht-summary__specs">
                <span>👥 {yacht.capacity} personas</span>
                <span>📏 {yacht.length}m</span>
                <span>⭐ {yacht.rating}</span>
              </div>
            </div>
            <div className="yacht-summary__price">
              <div className="price-amount">
                ${yacht.pricePerDay.toLocaleString()}
              </div>
              <div className="price-period">por día</div>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-grid">
            {/* Start Date */}
            <div className="form-group">
              <label className="form-label">Fecha de Inicio *</label>
              <input
                type="date"
                required
                min={new Date().toISOString().split("T")[0]}
                value={bookingData.startDate}
                onChange={(e) =>
                  setBookingData({ ...bookingData, startDate: e.target.value })
                }
                className="form-input"
              />
            </div>

            {/* End Date */}
            <div className="form-group">
              <label className="form-label">Fecha de Fin *</label>
              <input
                type="date"
                required
                min={
                  bookingData.startDate ||
                  new Date().toISOString().split("T")[0]
                }
                value={bookingData.endDate}
                onChange={(e) =>
                  setBookingData({ ...bookingData, endDate: e.target.value })
                }
                className="form-input"
              />
            </div>

            {/* Guests */}
            <div className="form-group">
              <label className="form-label">Número de Huéspedes</label>
              <select
                value={bookingData.guests}
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    guests: parseInt(e.target.value),
                  })
                }
                className="form-select"
              >
                {[...Array(yacht.capacity)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i === 0 ? "persona" : "personas"}
                  </option>
                ))}
              </select>
            </div>

            {/* Special Requests */}
            <div className="form-group form-group--full">
              <label className="form-label">Peticiones Especiales</label>
              <textarea
                value={bookingData.specialRequests}
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    specialRequests: e.target.value,
                  })
                }
                rows={3}
                placeholder="Chef privado, decoración especial, actividades..."
                className="form-textarea"
              />
            </div>
          </div>

          {/* Price Breakdown */}
          {days > 0 && (
            <div className="price-breakdown">
              <h4 className="price-breakdown__title">Resumen de Precios</h4>
              <div className="price-breakdown__items">
                <div className="price-breakdown__item">
                  <span>
                    ${yacht.pricePerDay.toLocaleString()} × {days} días
                  </span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
                <div className="price-breakdown__item">
                  <span>IVA (16%)</span>
                  <span>${taxes.toLocaleString()}</span>
                </div>
                <div className="price-breakdown__total">
                  <span>Total</span>
                  <span>${finalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={days === 0}
              className="btn btn-primary"
            >
              {days === 0
                ? "Selecciona fechas"
                : `Continuar al Pago - $${finalPrice.toLocaleString()}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
