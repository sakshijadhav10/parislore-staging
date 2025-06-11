import React, { useState } from 'react';
import PaymentForm from './PaymentForm';
import ConfirmationPage from './ConfirmationPage';


const Payment = () => {
  const [step, setStep] = useState('payment');
  const [formData, setFormData] = useState(null);

  const handlePaymentSuccess = (data) => {
    setFormData(data);
    setStep('confirmation');
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      {step === 'payment' && <PaymentForm onSuccess={handlePaymentSuccess} />}
      {step === 'confirmation' && formData && <ConfirmationPage data={formData} />}
    </div>
  );
};

export default Payment;
