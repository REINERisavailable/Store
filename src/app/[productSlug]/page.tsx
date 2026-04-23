"use client";

import { useState } from "react";
import * as motion from "framer-motion/client";
import { MessageCircle, CheckCircle, ShieldCheck, Truck, ArrowRight } from "lucide-react";
import CheckoutForm from "../components/CheckoutForm";

const MOCK_PRODUCT = {
  name: "Premium Wireless Headphones",
  subtitle: "Experience high-fidelity sound with Active Noise Cancellation.",
  baseCost: 250,
  pack1: 295,
  pack2: 520,
  pack3: 730,
  features: [
    "🎧 High-fidelity sound with deep bass",
    "🔋 40-hour battery life",
    "🔇 Active Noise Cancellation",
    "🎙️ Crystal clear built-in microphone",
    "😌 Ultra-comfortable memory foam ear cushions"
  ],
  imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
};

export default function LandingPage() {
  const [selectedPack, setSelectedPack] = useState(1);
  const price = selectedPack === 1 ? MOCK_PRODUCT.pack1 : selectedPack === 2 ? MOCK_PRODUCT.pack2 : MOCK_PRODUCT.pack3;

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-32">
      {/* Hero Section */}
      <div className="bg-white px-4 py-8 rounded-b-[40px] shadow-sm mb-6">
        <div className="max-w-md mx-auto space-y-6">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden shadow-lg border border-slate-100">
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img src={MOCK_PRODUCT.imageUrl} alt={MOCK_PRODUCT.name} className="w-full h-full object-cover" />
             <div className="absolute top-4 left-4 bg-primary text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
               Top Rated ⭐
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
            Why you need this 
            <span className="text-primary"><CheckCircle className="w-5 h-5"/></span>
          </h2>
          <ul className="space-y-3">
            {MOCK_PRODUCT.features.map((feature, i) => (
              <li key={i} className="flex items-start text-slate-700 font-medium leading-tight">
                <span className="mr-2 opacity-80">{feature.charAt(0)}</span>
                <span>{feature.slice(2)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing Tiers */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center text-slate-900">Choose Your Pack</h2>
          
          <div className="grid gap-3 transition-all">
            {/* Pack 1 */}
            <div 
              onClick={() => setSelectedPack(1)}
              className={`cursor-pointer rounded-2xl p-4 border-2 flex items-center justify-between transition-all ${
                selectedPack === 1 ? 'border-primary bg-green-50 shadow-md scale-[1.02]' : 'border-slate-200 bg-white hover:border-green-200'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedPack === 1 ? 'border-primary bg-primary' : 'border-slate-300'}`}>
                  {selectedPack === 1 && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">1 Item</h3>
                  <p className="text-sm text-slate-500">Standard Pack</p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-extrabold text-2xl text-primary">{MOCK_PRODUCT.pack1}</span> <span className="text-sm font-bold text-slate-500">MAD</span>
              </div>
            </div>

            {/* Pack 2 */}
            <div 
              onClick={() => setSelectedPack(2)}
              className={`relative cursor-pointer rounded-2xl p-4 border-2 flex items-center justify-between transition-all ${
                selectedPack === 2 ? 'border-amber-400 bg-amber-50 shadow-md scale-[1.02]' : 'border-slate-200 bg-white hover:border-amber-200'
              }`}
            >
              <div className="absolute -top-3 right-4 bg-amber-400 text-amber-900 text-[10px] font-black uppercase px-2 py-0.5 rounded-full z-10 shadow-sm">
                Save 20%
              </div>
              <div className="flex items-center gap-4">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedPack === 2 ? 'border-amber-500 bg-amber-500' : 'border-slate-300'}`}>
                  {selectedPack === 2 && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">2 Items</h3>
                  <p className="text-sm text-slate-500">Popular Choice</p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-extrabold text-2xl text-amber-600">{MOCK_PRODUCT.pack2}</span> <span className="text-sm font-bold text-slate-500">MAD</span>
              </div>
            </div>

            {/* Pack 3 */}
            <div 
              onClick={() => setSelectedPack(3)}
              className={`relative cursor-pointer rounded-2xl p-4 border-2 flex items-center justify-between transition-all ${
                selectedPack === 3 ? 'border-rose-400 bg-rose-50 shadow-md scale-[1.02]' : 'border-slate-200 bg-white hover:border-rose-200'
              }`}
            >
              <div className="absolute -top-3 right-4 bg-rose-500 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full z-10 shadow-sm">
                Best Value
              </div>
              <div className="flex items-center gap-4">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedPack === 3 ? 'border-rose-500 bg-rose-500' : 'border-slate-300'}`}>
                  {selectedPack === 3 && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">3 Items</h3>
                  <p className="text-sm text-slate-500">Family Pack</p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-extrabold text-2xl text-rose-600">{MOCK_PRODUCT.pack3}</span> <span className="text-sm font-bold text-slate-500">MAD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-2 gap-4 text-center">
           <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-2">
             <Truck className="w-6 h-6 text-primary" />
             <span className="text-xs font-bold text-slate-600">Free & Fast Delivery</span>
           </div>
           <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-2">
             <ShieldCheck className="w-6 h-6 text-primary" />
             <span className="text-xs font-bold text-slate-600">Cash on Delivery</span>
           </div>
        </div>

        {/* Checkout Form Container */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-8" id="order-form">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Complete Your Order</h2>
          <div className="bg-green-50 rounded-xl p-4 mb-6 flex justify-between items-center text-green-900 border border-green-100">
            <span className="font-medium">Total to Pay (COD):</span>
            <span className="font-extrabold text-2xl">{price} MAD</span>
          </div>
          <CheckoutForm productName={`${MOCK_PRODUCT.name} (Pack ${selectedPack})`} price={price} />
        </div>

      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-slate-200 flex gap-3 z-50">
        <a 
          href="https://wa.me/212603323334" 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-2xl shadow-lg hover:bg-green-600 transition-colors"
        >
          <MessageCircle className="w-7 h-7" />
        </a>
        <button 
          onClick={() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex-1 bg-primary text-white text-xl font-bold rounded-2xl flex items-center justify-center shadow-lg hover:bg-green-700 transition-all gap-2"
        >
          اطلب الآن <ArrowRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
}
