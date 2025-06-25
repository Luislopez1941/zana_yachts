'use client'

import { useState } from "react";
import { BookingData, PaymentData } from "@/types/yacht";
import "./styles/PaymentModal.css";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: BookingData;
  yachtName: string;
  onPaymentComplete: (paymentData: PaymentData) => void;
}

export const PaymentModal = ({
  isOpen,
  onClose,
  bookingData,
  yachtName,
  onPaymentComplete,
}: PaymentModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const paymentData: PaymentData = {
      method: paymentMethod === "credit-card" ? "Tarjeta de Crédito" : "PayPal",
      amount: bookingData.totalPrice,
      cardNumber: paymentMethod === "credit-card" ? cardNumber : undefined,
      expiryDate: paymentMethod === "credit-card" ? expiryDate : undefined,
      cvv: paymentMethod === "credit-card" ? cvv : undefined,
      paypalEmail: paymentMethod === "paypal" ? paypalEmail : undefined,
    };

    onPaymentComplete(paymentData);
    setIsProcessing(false);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  if (!isOpen) return null;

  return (
    <div className="payment-modal-overlay" onClick={onClose}>
      <div
        className="payment-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="payment-modal-header">
          <h2 className="payment-modal-title">Completar Pago</h2>
        </div>

        <div className="payment-modal-body">
          {/* Booking Summary */}
          <div className="payment-booking-summary">
            <h4 className="payment-booking-summary-title">
              Resumen de Reserva
            </h4>
            <div className="payment-booking-summary-details">
              <div className="payment-booking-summary-row">
                <span>Yate:</span>
                <span className="payment-booking-summary-value">
                  {yachtName}
                </span>
              </div>
              <div className="payment-booking-summary-row">
                <span>Fechas:</span>
                <span className="payment-booking-summary-value">
                  {new Date(bookingData.startDate).toLocaleDateString()} -{" "}
                  {new Date(bookingData.endDate).toLocaleDateString()}
                </span>
              </div>
              <div className="payment-booking-summary-row">
                <span>Duración:</span>
                <span className="payment-booking-summary-value">
                  {bookingData.days} {bookingData.days === 1 ? "día" : "días"}
                </span>
              </div>
              <div className="payment-booking-summary-row">
                <span>Huéspedes:</span>
                <span className="payment-booking-summary-value">
                  {bookingData.guests}
                </span>
              </div>
              <div className="payment-booking-summary-total">
                <div className="payment-booking-summary-total-row">
                  <span>Total:</span>
                  <span>${bookingData.totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="payment-form">
            {/* Payment Method Selection */}
            <div className="payment-method-section">
              <div className="payment-method-title">Método de Pago</div>
              <div className="payment-method-options">
                <div className="payment-method-option">
                  <div
                    className={`payment-method-radio ${paymentMethod === "credit-card" ? "checked" : ""}`}
                    onClick={() => setPaymentMethod("credit-card")}
                  />
                  <label
                    className="payment-method-label"
                    onClick={() => setPaymentMethod("credit-card")}
                  >
                    <svg
                      className="payment-method-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <line x1="2" x2="22" y1="10" y2="10" />
                    </svg>
                    Tarjeta de Crédito/Débito
                  </label>
                </div>
                <div className="payment-method-option">
                  <div
                    className={`payment-method-radio ${paymentMethod === "paypal" ? "checked" : ""}`}
                    onClick={() => setPaymentMethod("paypal")}
                  />
                  <label
                    className="payment-method-label"
                    onClick={() => setPaymentMethod("paypal")}
                  >
                    <svg
                      className="payment-method-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="12" x2="12" y1="2" y2="22" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                    PayPal
                  </label>
                </div>
              </div>
            </div>

            {/* Credit Card Form */}
            {paymentMethod === "credit-card" && (
              <div className="payment-form-section">
                <div className="payment-form-field">
                  <label htmlFor="cardName" className="payment-form-label">
                    <svg
                      className="payment-form-label-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    Nombre en la tarjeta
                  </label>
                  <input
                    id="cardName"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Nombre completo"
                    required
                    className="payment-form-input"
                  />
                </div>

                <div className="payment-form-field">
                  <label htmlFor="cardNumber" className="payment-form-label">
                    <svg
                      className="payment-form-label-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <line x1="2" x2="22" y1="10" y2="10" />
                    </svg>
                    Número de tarjeta
                  </label>
                  <input
                    id="cardNumber"
                    value={cardNumber}
                    onChange={(e) =>
                      setCardNumber(formatCardNumber(e.target.value))
                    }
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    required
                    className="payment-form-input"
                  />
                </div>

                <div className="payment-form-row">
                  <div className="payment-form-field">
                    <label htmlFor="expiryDate" className="payment-form-label">
                      <svg
                        className="payment-form-label-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M8 2v4" />
                        <path d="M16 2v4" />
                        <rect width="18" height="18" x="3" y="4" rx="2" />
                        <path d="M3 10h18" />
                      </svg>
                      Fecha de vencimiento
                    </label>
                    <input
                      id="expiryDate"
                      value={expiryDate}
                      onChange={(e) =>
                        setExpiryDate(formatExpiryDate(e.target.value))
                      }
                      placeholder="MM/YY"
                      maxLength={5}
                      required
                      className="payment-form-input"
                    />
                  </div>

                  <div className="payment-form-field">
                    <label htmlFor="cvv" className="payment-form-label">
                      <svg
                        className="payment-form-label-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                        <path d="M9 12l2 2 4-4" />
                      </svg>
                      CVV
                    </label>
                    <input
                      id="cvv"
                      value={cvv}
                      onChange={(e) =>
                        setCvv(
                          e.target.value.replace(/\D/g, "").substring(0, 3),
                        )
                      }
                      placeholder="123"
                      maxLength={3}
                      required
                      className="payment-form-input"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* PayPal Form */}
            {paymentMethod === "paypal" && (
              <div className="payment-form-field">
                <label htmlFor="paypalEmail" className="payment-form-label">
                  Email de PayPal
                </label>
                <input
                  id="paypalEmail"
                  type="email"
                  value={paypalEmail}
                  onChange={(e) => setPaypalEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="payment-form-input"
                />
              </div>
            )}

            {/* Security Notice */}
            <div className="payment-security-notice">
              <div className="payment-security-content">
                <svg
                  className="payment-security-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
                <span className="payment-security-text">
                  Tu información está protegida con encriptación SSL de 256 bits
                </span>
              </div>
            </div>

            <div className="payment-modal-footer">
              <button
                type="button"
                onClick={onClose}
                disabled={isProcessing}
                className="payment-cancel-button"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isProcessing}
                className="payment-submit-button"
              >
                {isProcessing ? (
                  <div className="payment-processing">
                    <div className="payment-spinner"></div>
                    Procesando...
                  </div>
                ) : (
                  `Pagar $${bookingData.totalPrice.toLocaleString()}`
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
