"use client";

import { useState } from "react";
import * as motion from "framer-motion/client";
import { MessageCircle, CheckCircle, ShieldCheck, Truck, ArrowLeft } from "lucide-react";
import CheckoutForm from "../components/CheckoutForm";

const MOCK_PRODUCT = {
  name: "سماعات لاسلكية ممتازة",
  subtitle: "استمتع بصوت عالي الدقة مع ميزة إلغاء الضوضاء النشط.",
  baseCost: 250,
  pack1: 295,
  pack2: 520,
  pack3: 730,
  features: [
    "🎧 صوت عالي الدقة مع باس عميق",
    "🔋 بطارية تدوم 40 ساعة",
    "🔇 إلغاء الضوضاء النشط",
    "🎙️ ميكروفون مدمج نقي جداً",
    "😌 وسائد أذن مريحة جداً"
  ],
  imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
};

export default function LandingPage() {
  const [selectedPack, setSelectedPack] = useState(1);
  const price = selectedPack === 1 ? MOCK_PRODUCT.pack1 : selectedPack === 2 ? MOCK_PRODUCT.pack2 : MOCK_PRODUCT.pack3;

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-32" dir="rtl">
      {/* Hero Section */}
      <div className="bg-white px-4 py-8 rounded-b-[40px] shadow-sm mb-6">
        <div className="max-w-md mx-auto space-y-6">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden shadow-lg border border-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={MOCK_PRODUCT.imageUrl} alt={MOCK_PRODUCT.name} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 bg-green-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
              الأعلى تقييماً ⭐
            </div>
          </div>

          <div className="text-center space-y-2">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {MOCK_PRODUCT.name}
            </h1>
            <p className="text-slate-600 font-medium">
              {MOCK_PRODUCT.subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 space-y-8">

        {/* Features Box */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-3 flex items-center justify-between">
            لماذا تحتاج هذا المنتج؟
            <span className="text-green-600"><CheckCircle className="w-5 h-5" /></span>
          </h2>
          <ul className="space-y-3">
            {MOCK_PRODUCT.features.map((feature, i) => (
              <li key={i} className="flex items-start text-slate-700 font-medium leading-tight">
                <span className="ml-2 opacity-80">{feature.charAt(0)}</span>
                <span>{feature.slice(2)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing Tiers */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center text-slate-900">اختر الباقة المناسبة</h2>

          <div className="grid gap-3 transition-all">
            {/* Pack 1 */}
            <div
              onClick={() => setSelectedPack(1)}
              className={`cursor-pointer rounded-2xl p-4 border-2 flex items-center justify-between transition-all ${selectedPack === 1 ? 'border-green-600 bg-green-50 shadow-md scale-[1.02]' : 'border-slate-200 bg-white hover:border-green-200'
                }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedPack === 1 ? 'border-green-600 bg-green-600' : 'border-slate-300'}`}>
                  {selectedPack === 1 && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">قطعة واحدة</h3>
                  <p className="text-sm text-slate-500">الباقة العادية</p>
                </div>
              </div>
              <div className="text-left" dir="ltr">
                <span className="font-extrabold text-2xl text-green-700">{MOCK_PRODUCT.pack1}</span> <span className="text-sm font-bold text-slate-500">MAD</span>
              </div>
            </div>

            {/* Pack 2 */}
            <div
              onClick={() => setSelectedPack(2)}
              className={`relative cursor-pointer rounded-2xl p-4 border-2 flex items-center justify-between transition-all ${selectedPack === 2 ? 'border-green-500 bg-emerald-50 shadow-md scale-[1.02]' : 'border-slate-200 bg-white hover:border-green-200'
                }`}
            >
              <div className="absolute -top-3 left-4 bg-green-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full z-10 shadow-sm">
                توفير 20%
              </div>
              <div className="flex items-center gap-4">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedPack === 2 ? 'border-green-500 bg-green-500' : 'border-slate-300'}`}>
                  {selectedPack === 2 && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">قطعتين</h3>
                  <p className="text-sm text-green-700">الخيار المفضل</p>
                </div>
              </div>
              <div className="text-left" dir="ltr">
                <span className="font-extrabold text-2xl text-green-700">{MOCK_PRODUCT.pack2}</span> <span className="text-sm font-bold text-slate-500">MAD</span>
              </div>
            </div>

            {/* Pack 3 */}
            <div
              onClick={() => setSelectedPack(3)}
              className={`relative cursor-pointer rounded-2xl p-4 border-2 flex items-center justify-between transition-all ${selectedPack === 3 ? 'border-slate-800 bg-slate-50 shadow-md scale-[1.02]' : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
            >
              <div className="absolute -top-3 left-4 bg-slate-800 text-white text-[10px] font-black px-2 py-0.5 rounded-full z-10 shadow-sm">
                أفضل قيمة
              </div>
              <div className="flex items-center gap-4">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedPack === 3 ? 'border-slate-800 bg-slate-800' : 'border-slate-300'}`}>
                  {selectedPack === 3 && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">3 قطع</h3>
                  <p className="text-sm text-slate-500">باقة العائلة</p>
                </div>
              </div>
              <div className="text-left" dir="ltr">
                <span className="font-extrabold text-2xl text-slate-800">{MOCK_PRODUCT.pack3}</span> <span className="text-sm font-bold text-slate-500">MAD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-2">
            <Truck className="w-6 h-6 text-green-600" />
            <span className="text-xs font-bold text-slate-600">توصيل مجاني وسريع</span>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-2">
            <ShieldCheck className="w-6 h-6 text-green-600" />
            <span className="text-xs font-bold text-slate-600">الدفع عند الاستلام</span>
          </div>
        </div>

        {/* Checkout Form Container */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-8" id="order-form">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">أكمل طلبك الآن</h2>
          <div className="bg-green-50 rounded-xl p-4 mb-6 flex justify-between items-center text-green-900 border border-green-100">
            <span className="font-bold text-lg">المجموع (الدفع عند الاستلام):</span>
            <span className="font-extrabold text-2xl" dir="ltr">{price} MAD</span>
          </div>
          <CheckoutForm productName={`${MOCK_PRODUCT.name} (باقة ${selectedPack})`} price={price} />
        </div>

      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-slate-200 flex gap-3 z-50">
        <a
          href="https://wa.me/21260333234"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-2xl shadow-lg hover:bg-green-600 transition-colors"
        >
          <MessageCircle className="w-7 h-7" />
        </a>
        <button
          onClick={() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex-1 bg-green-600 text-white text-xl font-bold rounded-2xl flex items-center justify-center shadow-lg hover:bg-green-700 transition-all gap-2"
        >
          اطلب الآن <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
}
