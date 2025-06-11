import React, { useState } from 'react';

const PaymentForm = ({ onSuccess }) => {
  const [form, setForm] = useState({ name: '', email: '', amount: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate payment success
    onSuccess(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold mb-2">Enter Payment Details</h2>

      <input
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={form.email}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
        required
      />
      <input
        type="number"
        name="amount"
        placeholder="Amount (USD)"
        value={form.amount}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
        required
      />

      <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
        Pay Now
      </button>
    </form>
  );
};

export default PaymentForm;
