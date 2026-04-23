"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Package, ExternalLink, Edit, Globe } from "lucide-react";

export default function AdminDashboard() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const isAr = lang === 'ar';

  // Mock data for existing products
  const products = [
    {
      id: 1,
      name: isAr ? "سماعات لاسلكية" : "Wireless Headphones",
      slug: "premium-wireless-headphones",
      price: 295,
      date: "2026-04-23",
      status: "published"
    }
  ];

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-5xl mx-auto space-y-8" dir={isAr ? "rtl" : "ltr"}>
      <div className="flex justify-end w-full">
        <button 
          onClick={() => setLang(isAr ? 'en' : 'ar')}
          className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-full shadow-sm hover:bg-slate-50 transition-colors font-bold text-sm"
        >
          <Globe className="w-4 h-4" />
          {isAr ? 'English' : 'العربية'}
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            {isAr ? 'لوحة تحكم الرحمة' : 'AlRahma Dashboard'}
          </h1>
          <p className="text-slate-500">
            {isAr ? 'إدارة المنتجات وصفحات الهبوط' : 'Manage products and landing pages'}
          </p>
        </div>
        
        <Link 
          href="/admin/new"
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          {isAr ? 'إنشاء صفحة هبوط جديدة' : 'Create New Landing Page'}
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Package className="w-5 h-5 text-green-600" /> 
            {isAr ? 'المنتجات الحالية' : 'Current Products'}
          </h2>
        </div>
        
        <div className="divide-y divide-slate-100">
          {products.map(product => (
            <div key={product.id} className="p-6 flex flex-col md:flex-row items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
              <div className="flex flex-col">
                <h3 className="font-bold text-slate-900 text-lg">{product.name}</h3>
                <span className="text-sm text-slate-500" dir="ltr">/{product.slug} • {product.price} MAD</span>
              </div>
              
              <div className="flex items-center gap-3 w-full md:w-auto">
                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium transition-colors">
                  <Edit className="w-4 h-4" /> {isAr ? 'تعديل' : 'Edit'}
                </button>
                <Link 
                  href={`/${product.slug}`}
                  target="_blank"
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <ExternalLink className="w-4 h-4" /> {isAr ? 'معاينة' : 'Preview'}
                </Link>
              </div>
            </div>
          ))}
          
          {products.length === 0 && (
            <div className="p-12 text-center text-slate-500">
              {isAr ? 'لا توجد منتجات بعد. انقر على "إنشاء صفحة هبوط جديدة" للبدء.' : 'No products yet. Click "Create New Landing Page" to start.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
