// src/components/Confirmation.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Confirmation = () => (
  <div className="success-container">
    <div className="success-icon">✅</div>
    <h1 className="success-title">Payment Successful</h1>
    <p className="success-message">
      Thank you for your payment. Your transaction has been completed successfully. A confirmation email has been sent to your registered email address.
    </p>
    <Link to="/" className="solid-button">Return to Homepage</Link>
  </div>
);

export default Confirmation;
