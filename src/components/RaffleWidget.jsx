import React, { useState, useEffect } from "react";

const BASE_URL = "http://localhost:5173/";

export const RaffleWidget = () => {
  const [tickets, setTickets] = useState(null);
  const [error, setError] = useState(null);
  const [isPaymentPage, setIsPaymentPage] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (window.location.pathname.includes("payment-success")) {
      setIsPaymentPage(true);
      (async () => {
        try {
          const res = await fetch(`${BASE_URL}/api/stripe-webhook`, { method: "POST" });
          const data = await res.json();
          if (data.success) {
            setTickets(data.tickets);
            setError(null);
          } else {
            throw new Error();
          }
        } catch {
          setError("❌ Something went wrong.");
        }
      })();
    }
  }, []);

  const handleBuy = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/api/raffle-ticket`, { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setTickets(data.tickets);
      } else {
        throw new Error();
      }
    } catch {
      setError("❌ Error, try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleStripe = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/api/create-checkout-session`, { method: "POST" });
      const data = await res.json();
      if (data.sessionId) {
        window.location.href = `https://checkout.stripe.com/pay/${data.sessionId}`;
      } else {
        throw new Error();
      }
    } catch {
      setError("❌ Stripe error.");
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#ececec",
      }}
    >
      <div
        style={{
          padding: "2rem",
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          fontFamily: "Roboto, sans-serif",
          maxWidth: "480px",
          width: "100%",
        }}
      >
        <h1 style={{ fontFamily: "Raleway, sans-serif", textAlign: "center", marginBottom: "1.5rem" }}>
          ParisLore Raffle Widget
        </h1>

        {!isPaymentPage ? (
          <div style={{ textAlign: "center" }}>
            <button
              onClick={handleBuy}
              disabled={loading}
              style={{
                backgroundColor: "var(--primary-color, #FF6F00)",
                color: "#fff",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: loading ? "not-allowed" : "pointer",
                marginRight: "10px",
                opacity: loading ? 0.6 : 1,
              }}
            >
              Buy €1 Raffle Ticket
            </button>
            <button
              onClick={handleStripe}
              disabled={loading}
              style={{
                backgroundColor: "transparent",
                color: "var(--primary-color, #FF6F00)",
                border: "1px solid var(--primary-color, #FF6F00)",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: loading ? "not-allowed" : "pointer",
                marginTop: "10px",
                opacity: loading ? 0.6 : 1,
              }}
            >
              Proceed to Payment
            </button>
            <p style={{ marginTop: "10px" }}>
              {tickets !== null && `✅ You have ${tickets} ticket(s)`}
              {error && <span>{error}</span>}
            </p>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <h2>Processing your payment...</h2>
            <p>{tickets !== null ? `✅ You now have ${tickets} ticket(s)!` : error || "Loading..."}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RaffleWidget;
