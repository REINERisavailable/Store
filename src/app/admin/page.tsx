"use client";

import { useState } from "react";
import { Upload, Plus, Tag, Calculator, ChevronRight, Package, Link as LinkIcon, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusText, setStatusText] = useState("");
  
  const [productData, setProductData] = useState({
    name: "",
    slug: "",
    baseCost: "",
    category: "",
    features: [] as string[],
    pack1: 0,
    pack2: 0,
    pack3: 0,
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      
      // Simulate AI Processing
      setIsLoading(true);
      setStatusText("Analyzing image with AI...");
      
      setTimeout(() => {
        setStatusText("Extracting product features...");
      }, 1500);

      setTimeout(() => {
        setProductData({
          ...productData,
          name: "Premium Wireless Headphones",
          slug: "premium-wireless-headphones",
          category: "Electronics > Audio > Headphones",
          features: [
            "🎧 High-fidelity sound with deep bass",
            "🔋 40-hour battery life",
            "🔇 Active Noise Cancellation",
            "🎙️ Crystal clear built-in microphone",
            "😌 Ultra-comfortable memory foam ear cushions"
          ],
          baseCost: "250",
          pack1: calculatePrice(250, 1),
          pack2: calculatePrice(250, 2),
          pack3: calculatePrice(250, 3)
        });
        setIsLoading(false);
      }, 3500);
    }
  };

  const calculatePrice = (cost: number, packSize: number) => {
    const shipping = 30;
    const ads = 5;
    const minProfit = 10;
    const basePrice = cost + shipping + ads + minProfit;
    
    if (packSize === 1) return basePrice;
    if (packSize === 2) return Math.floor(basePrice * 1.8); // bulk discount
    if (packSize === 3) return Math.floor(basePrice * 2.5); // best value
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
    <div className="min-h-screen p-8 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">AlRahma Admin</h1>
          <p className="text-slate-500">Fast product creation dashboard.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Upload Column */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center min-h-[300px]">
          {image ? (
            <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} className="w-full h-full object-cover" alt="Product" />
            </div>
          ) : (
            <label className="cursor-pointer flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
              <Upload className="w-10 h-10 text-slate-400 mb-2" />
              <span className="text-slate-500 font-medium">Upload product photo</span>
              <span className="text-slate-400 text-sm mt-1">AI will extract details</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          )}
          
          {isLoading && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl p-6">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-primary font-medium animate-pulse">{statusText}</p>
            </div>
          )}
        </div>

        {/* Details Column */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" /> Product Details
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
              <input 
                type="text" 
                value={productData.name}
                onChange={(e) => setProductData({...productData, name: e.target.value})}
                placeholder="Product name..."
                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                <Tag className="w-4 h-4" /> Category Tree
              </label>
              <input 
                type="text" 
                value={productData.category}
                onChange={(e) => setProductData({...productData, category: e.target.value})}
                placeholder="Level 1 > Level 2 > Level 3"
                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none bg-slate-50"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
             <h2 className="text-lg font-bold flex items-center gap-2">
              <Calculator className="w-5 h-5 text-primary" /> Smart Pricing (MAD)
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Base Cost</label>
              <input 
                type="number" 
                value={productData.baseCost}
                onChange={handleCostChange}
                placeholder="e.g. 150"
                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-lg font-bold"
              />
            </div>

            {productData.baseCost && (
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="bg-slate-50 p-3 rounded-lg text-center border border-slate-100">
                  <div className="text-xs text-slate-500 font-medium mb-1">1 Item</div>
                  <div className="font-bold text-primary">{productData.pack1}</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg text-center border border-slate-100">
                  <div className="text-xs text-slate-500 font-medium mb-1">2 Items</div>
                  <div className="font-bold text-primary">{productData.pack2}</div>
                </div>
                <div className="bg-amber-50 p-3 rounded-lg text-center border border-amber-200">
                  <div className="text-xs text-amber-600 font-medium mb-1">3 Items</div>
                  <div className="font-bold text-amber-600">{productData.pack3}</div>
                </div>
              </div>
            )}
          </div>

          {productData.slug && (
            <Link 
              href={`/${productData.slug}`}
              className="w-full py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-green-700 focus:ring-4 focus:ring-green-200 transition-all group"
            >
              Preview Landing Page 
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}

        </div>
      </div>
    </div>
  );
}
