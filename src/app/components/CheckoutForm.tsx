"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { submitOrder } from "../actions";

export default function CheckoutForm({ productName, price }: { productName: string, price: number }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    contact: "",
    address: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Call server action to write to Google Sheets
    try {
      const result = await submitOrder({
        productName,
        price,
        fullName: formData.fullName,
        contact: formData.contact,
        address: formData.address,
        date: new Date().toISOString()
      });

      if (result.success) {
        setSuccess(true);
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#16a34a', '#ffffff', '#22c55e']
        });
      } else {
        alert("There was an error submitting your order. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Error submitting order");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 text-green-800 p-8 rounded-2xl text-center border border-green-200">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">🎉</div>
        <h3 className="text-2xl font-bold mb-2">Thank you for your order!</h3>
        <p>We will contact you shortly to confirm your delivery to {formData.address}.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" id="checkout-form">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
        <input 
          required
          type="text" 
          value={formData.fullName}
          onChange={e => setFormData({...formData, fullName: e.target.value})}
          className="w-full p-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-primary outline-none transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number (or Email)</label>
        <input 
          required
          type="text" 
          value={formData.contact}
          onChange={e => setFormData({...formData, contact: e.target.value})}
          className="w-full p-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-primary outline-none transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Delivery Address</label>
        <textarea 
          required
          value={formData.address}
          onChange={e => setFormData({...formData, address: e.target.value})}
          className="w-full p-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-primary outline-none transition-all min-h-[100px]"
        />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full py-5 bg-primary text-white rounded-xl font-bold text-xl shadow-lg hover:bg-green-700 focus:ring-4 focus:ring-green-200 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
      >
        {loading ? (
          <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          "اشتري الآن" // Buy Now in Arabic
        )}
      </button>
      <p className="text-center text-sm text-slate-500 mt-2 font-medium">Cash on Delivery - Pay when you receive it!</p>
    </form>
  );
}
