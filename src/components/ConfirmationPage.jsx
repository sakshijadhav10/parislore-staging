import React from 'react';

const ConfirmationPage = ({ data }) => {
  return (
    <div className="text-center space-y-4">
      <h2 className="text-2xl font-bold text-green-600">Payment Successful!</h2>
      <p>Thank you, <strong>{data.name}</strong>.</p>
      <p>Confirmation has been sent to <strong>{data.email}</strong>.</p>
      <p>Amount Paid: <strong>${data.amount}</strong></p>
    </div>
  );
};

export default ConfirmationPage;
