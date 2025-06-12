import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";

export default function Subscribe() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handlePay = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("http://localhost:3000/api/parents/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await response.json(); // ✅ only once

      if (response.ok) {
        if (data.checkout_url) {
          window.location.href = data.checkout_url;
        } else {
          setMessage(data.message || "Payment initialized successfully.");
        }
      } else {
        setError(data.error || "Payment initialization failed.");
      }
    } catch (err) {
      setError("Error initializing payment: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Kuncho Subscription Payment</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
      <button onClick={handlePay} disabled={loading}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}
