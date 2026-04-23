"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Package, Globe } from 'lucide-react';

export default function Home() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const isAr = lang === 'ar';

  return (
    <div className={`min-h-screen p-4 md:p-8 max-w-4xl mx-auto flex flex-col`} dir={isAr ? 'rtl' : 'ltr'}>
      {/* Header with Language Toggle */}
      <div className="flex justify-end w-full mb-8">
        <button 
          onClick={() => setLang(isAr ? 'en' : 'ar')}
          className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-full shadow-sm hover:bg-slate-50 transition-colors font-bold text-sm"
        >
          <Globe className="w-4 h-4" />
          {isAr ? 'English' : 'العربية'}
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <Package className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            {isAr ? 'متجر الرحمة' : 'AlRahma Store'}
          </h1>
          <p className="text-slate-600 font-medium text-lg max-w-md mx-auto">
            {isAr 
              ? 'أفضل المنتجات بأفضل الأسعار. تصفح منتجاتنا واطلب الآن بكل سهولة.' 
              : 'The best products at the best prices. Browse our products and order easily.'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-8">
          {/* Placeholder Product Link */}
          <Link 
            href="/premium-wireless-headphones" 
            className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-green-200 hover:shadow-md transition-all text-center flex flex-col items-center justify-center gap-3"
          >
            <h2 className="text-xl font-bold text-slate-800">
              {isAr ? 'سماعات لاسلكية' : 'Wireless Headphones'}
            </h2>
            <span className="text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full text-sm">
              {isAr ? 'عرض المنتج' : 'View Product'}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
