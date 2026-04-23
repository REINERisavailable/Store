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
        alert("حدث خطأ أثناء إرسال طلبك. يرجى المحاولة مرة أخرى.");
      }
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء إرسال الطلب");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 text-green-800 p-8 rounded-2xl text-center border border-green-200" dir="rtl">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">🎉</div>
        <h3 className="text-2xl font-bold mb-2">شكراً لطلبك!</h3>
        <p>سنتصل بك قريباً لتأكيد التوصيل إلى العنوان: {formData.address}.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" id="checkout-form" dir="rtl">
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">الاسم الكامل</label>
        <input 
          required
          type="text" 
          value={formData.fullName}
          onChange={e => setFormData({...formData, fullName: e.target.value})}
          className="w-full p-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-600 outline-none transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">رقم الهاتف (أو البريد الإلكتروني)</label>
        <input 
          required
          type="text" 
          value={formData.contact}
          onChange={e => setFormData({...formData, contact: e.target.value})}
          className="w-full p-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-600 outline-none transition-all text-left"
          dir="ltr"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">عنوان التوصيل (المدينة والحي)</label>
        <textarea 
          required
          value={formData.address}
          onChange={e => setFormData({...formData, address: e.target.value})}
          className="w-full p-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-600 outline-none transition-all min-h-[100px]"
        />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full py-5 bg-green-600 text-white rounded-xl font-bold text-2xl shadow-lg hover:bg-green-700 focus:ring-4 focus:ring-green-200 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
      >
        {loading ? (
          <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          "اطلب الآن"
        )}
      </button>
      <p className="text-center text-sm text-green-700 mt-3 font-bold bg-green-50 py-2 rounded-lg border border-green-100">
        الدفع عند الاستلام - ادفع فقط عند استلام طلبك!
      </p>
    </form>
  );
}
