"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Upload, Sparkles, Image as ImageIcon, Plus, X } from "lucide-react";

export default function NewProduct() {
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [productData, setProductData] = useState({
    name: "",
    slug: "",
    description: "",
    brandColor: "#16a34a",
    baseCost: "",
    pack1: 0,
    pack2: 0,
    pack3: 0,
    features: ["", "", ""],
    gallery: ["", "", ""],
    bannerText: "توصيل مجاني - عرض محدود 🚚",
    trustBadges: "توصيل سريع\nالدفع عند الاستلام\nضمان الجودة"
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const simulateAIPrefill = () => {
    if (!image) return alert("الرجاء رفع صورة أولاً!");
    setIsLoading(true);
    
    setTimeout(() => {
      setProductData({
        ...productData,
        name: "سماعات لاسلكية ممتازة",
        slug: "premium-wireless-headphones",
        description: "استمتع بصوت عالي الدقة مع ميزة إلغاء الضوضاء النشط.",
        features: [
          "🎧 صوت عالي الدقة مع باس عميق",
          "🔋 بطارية تدوم 40 ساعة",
          "🔇 إلغاء الضوضاء النشط"
        ],
        baseCost: "150",
        pack1: calculatePrice(150, 1),
        pack2: calculatePrice(150, 2),
        pack3: calculatePrice(150, 3)
      });
      setIsLoading(false);
    }, 2000);
  };

  const calculatePrice = (cost: number, packSize: number) => {
    const shipping = 30;
    const ads = 5;
    const minProfit = 10;
    const basePrice = cost + shipping + ads + minProfit;
    if (packSize === 1) return basePrice;
    if (packSize === 2) return Math.floor(basePrice * 1.8);
    if (packSize === 3) return Math.floor(basePrice * 2.5);
    return basePrice;
  };

  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cost = parseFloat(e.target.value) || 0;
    setProductData({
      ...productData,
      baseCost: e.target.value,
      pack1: calculatePrice(cost, 1),
      pack2: calculatePrice(cost, 2),
      pack3: calculatePrice(cost, 3),
    });
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-slate-50" dir="rtl">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="p-2 rounded-lg hover:bg-slate-200 transition-colors bg-white shadow-sm">
              <ArrowRight className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold text-slate-900">منتج جديد</h1>
          </div>
          
          <button 
            type="button" 
            onClick={simulateAIPrefill}
            disabled={isLoading || !image}
            className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl font-bold hover:bg-indigo-100 transition-colors disabled:opacity-50"
          >
            {isLoading ? <span className="animate-pulse">جاري التحليل...</span> : <><Sparkles className="w-4 h-4" /> ملء تلقائي بالذكاء الاصطناعي</>}
          </button>
        </div>

        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          
          {/* Main Image */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold mb-4">الصورة الرئيسية (Hero Image)</h2>
            <div className="relative border-2 border-dashed border-slate-300 rounded-xl overflow-hidden hover:border-green-500 transition-colors">
              {image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={image} className="w-full max-h-[400px] object-cover" alt="Preview" />
              ) : (
                <label className="flex flex-col items-center justify-center p-12 cursor-pointer">
                  <Upload className="w-10 h-10 text-slate-400 mb-2" />
                  <span className="text-slate-500">انقر لرفع صورة المنتج</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              )}
            </div>
          </div>

          {/* Basic Info */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
            <h2 className="text-lg font-bold mb-2">المعلومات الأساسية</h2>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">اسم المنتج *</label>
              <input 
                required type="text" value={productData.name}
                onChange={e => setProductData({...productData, name: e.target.value})}
                className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="مثال: ساعة ذكية ممتازة"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">الرابط (Slug)</label>
              <div className="flex items-center gap-2" dir="ltr">
                <span className="text-slate-400">alrahma.store/</span>
                <input 
                  type="text" value={productData.slug}
                  onChange={e => setProductData({...productData, slug: e.target.value})}
                  className="flex-1 p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="smart-watch-premium"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">وصف قصير</label>
              <textarea 
                value={productData.description}
                onChange={e => setProductData({...productData, description: e.target.value})}
                className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none min-h-[100px]"
                placeholder="وصف المنتج..."
              />
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">المميزات (نص + إيموجي)</h2>
              <button type="button" className="text-sm px-3 py-1 bg-slate-100 rounded-lg hover:bg-slate-200">+ إضافة</button>
            </div>
            <div className="space-y-3">
              {productData.features.map((feature, i) => (
                <div key={i} className="flex gap-2">
                  <input 
                    type="text" value={feature}
                    onChange={e => {
                      const newF = [...productData.features];
                      newF[i] = e.target.value;
                      setProductData({...productData, features: newF});
                    }}
                    className="flex-1 p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="✨ ميزة جديدة..."
                  />
                  <button type="button" className="p-3 text-red-500 hover:bg-red-50 rounded-xl"><X className="w-5 h-5"/></button>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold mb-4">التسعير (3 باقات)</h2>
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-1">التكلفة الأساسية للمنتج (MAD)</label>
              <input 
                type="number" value={productData.baseCost} onChange={handleCostChange}
                className="w-full md:w-1/2 p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none font-bold text-lg"
                placeholder="150"
              />
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-2 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <label className="font-bold text-slate-700">الباقة 1: قطعة واحدة (عادي)</label>
                <div className="flex items-center gap-2">
                  <input type="number" value={productData.pack1} onChange={e => setProductData({...productData, pack1: Number(e.target.value)})} className="p-3 border border-slate-200 rounded-xl flex-1 font-bold" />
                  <span className="text-slate-500">MAD</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-2 p-4 bg-green-50 rounded-xl border border-green-200 relative">
                <span className="absolute -top-3 left-4 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">الأكثر طلباً</span>
                <label className="font-bold text-green-900">الباقة 2: قطعتين (موصى به)</label>
                <div className="flex items-center gap-2">
                  <input type="number" value={productData.pack2} onChange={e => setProductData({...productData, pack2: Number(e.target.value)})} className="p-3 border border-green-200 rounded-xl flex-1 font-bold text-green-700 bg-white" />
                  <span className="text-slate-500">MAD</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 p-4 bg-slate-50 rounded-xl border border-slate-100 relative">
                <span className="absolute -top-3 left-4 bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded-full">أفضل قيمة</span>
                <label className="font-bold text-slate-700">الباقة 3: 3 قطع (توفير أقصى)</label>
                <div className="flex items-center gap-2">
                  <input type="number" value={productData.pack3} onChange={e => setProductData({...productData, pack3: Number(e.target.value)})} className="p-3 border border-slate-200 rounded-xl flex-1 font-bold" />
                  <span className="text-slate-500">MAD</span>
                </div>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 pb-12">
            <button type="submit" className="w-full bg-green-600 text-white text-lg font-bold py-4 rounded-xl shadow-lg hover:bg-green-700 transition-colors">
              حفظ ونشر الصفحة
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
