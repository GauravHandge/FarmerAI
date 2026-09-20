"use client"

import { useState, useEffect } from "react"
import {
  Search,
  MapPin,
  TrendingUp,
  TrendingDown,
  Award,
  Sparkles,
  Stethoscope,
  Calculator,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Zap,
  Star,
  CheckCircle2,
  Tag
} from "lucide-react"
import { useLanguage } from "@/context/language-context"

type Commodity = {
  id: string
  name: string
  hindiName: string
  category: string
  apmc: string
  state: string
  price: string
  unit: string
  trend: "up" | "down" | "stable"
  changePercent: string
  rating: number
  giTagged: boolean
  imageEmoji: string
  description: string
  discount: string
}

const COMMODITIES: Commodity[] = [
  {
    id: "c1",
    name: "Red Onion",
    hindiName: "प्याज (Kanda)",
    category: "Vegetables",
    apmc: "Lasalgaon APMC",
    state: "Maharashtra",
    price: "₹2,250",
    unit: "quintal",
    trend: "up",
    changePercent: "+5.2%",
    rating: 4.9,
    giTagged: true,
    imageEmoji: "🧅",
    description: "Garwa / Phule Samarth high-pungency onion from Asia's largest market.",
    discount: "Live Agmarknet Best Rate",
  },
  {
    id: "c2",
    name: "Hybrid Tomato",
    hindiName: "टमाटर (Tamatar)",
    category: "Vegetables",
    apmc: "Kolar APMC",
    state: "Karnataka",
    price: "₹2,300",
    unit: "quintal",
    trend: "up",
    changePercent: "+3.8%",
    rating: 4.8,
    giTagged: false,
    imageEmoji: "🍅",
    description: "Abhinav / Shivam firm red tomatoes with high shelf-life.",
    discount: "Top Selling Commodity",
  },
  {
    id: "c3",
    name: "Cumin Seeds",
    hindiName: "जीरा (Jeera)",
    category: "Spices",
    apmc: "Unjha APMC",
    state: "Gujarat",
    price: "₹27,500",
    unit: "quintal",
    trend: "up",
    changePercent: "+8.4%",
    rating: 5.0,
    giTagged: true,
    imageEmoji: "🌿",
    description: "Gujarat Cumin-4 premium export quality seeds.",
    discount: "Export Grade GI Tag",
  },
  {
    id: "c4",
    name: "Alphonso Mango",
    hindiName: "हापूस (Hapoos)",
    category: "Fruits",
    apmc: "Vashi APMC",
    state: "Maharashtra",
    price: "₹4,500",
    unit: "box",
    trend: "stable",
    changePercent: "0.0%",
    rating: 4.9,
    giTagged: true,
    imageEmoji: "🥭",
    description: "Devgad & Ratnagiri GI-tagged rich aroma export mango.",
    discount: "Premium Export Quality",
  },
  {
    id: "c5",
    name: "Pusa Basmati 1121",
    hindiName: "धान (Paddy Basmati)",
    category: "Cereals",
    apmc: "Karnal APMC",
    state: "Haryana",
    price: "₹4,200",
    unit: "quintal",
    trend: "up",
    changePercent: "+2.1%",
    rating: 4.9,
    giTagged: true,
    imageEmoji: "🌾",
    description: "Extra long-grain aromatic rice exported to Gulf & US markets.",
    discount: "Government Verified MSP",
  },
  {
    id: "c6",
    name: "Guntur Red Chilli",
    hindiName: "लाल मिर्च (Chilli)",
    category: "Spices",
    apmc: "Guntur APMC",
    state: "Andhra Pradesh",
    price: "₹16,200",
    unit: "quintal",
    trend: "up",
    changePercent: "+6.5%",
    rating: 4.8,
    giTagged: true,
    imageEmoji: "🌶️",
    description: "Sannam / Teja hot red chilli exported to Asian markets.",
    discount: "High Pungency Hot Deal",
  },
  {
    id: "c7",
    name: "Mandsaur Garlic",
    hindiName: "लहसुन (Garlic)",
    category: "Vegetables",
    apmc: "Mandsaur APMC",
    state: "Madhya Pradesh",
    price: "₹11,800",
    unit: "quintal",
    trend: "up",
    changePercent: "+4.1%",
    rating: 4.7,
    giTagged: false,
    imageEmoji: "🧄",
    description: "Ek Kandi desi garlic with high essential oil concentration.",
    discount: "Asia Garlic Capital",
  },
  {
    id: "c8",
    name: "Sharbati Wheat",
    hindiName: "गेहूं (Gehun)",
    category: "Cereals",
    apmc: "Ludhiana APMC",
    state: "Punjab",
    price: "₹2,400",
    unit: "quintal",
    trend: "stable",
    changePercent: "+0.5%",
    rating: 4.8,
    giTagged: false,
    imageEmoji: "🌾",
    description: "Golden high-protein wheat grain ideal for soft rotis.",
    discount: "High Protein Grain",
  },
  {
    id: "c9",
    name: "Shankar-6 Cotton",
    hindiName: "कपास (Kapas)",
    category: "Cash Crops",
    apmc: "Rajkot APMC",
    state: "Gujarat",
    price: "₹7,050",
    unit: "quintal",
    trend: "down",
    changePercent: "-1.2%",
    rating: 4.6,
    giTagged: false,
    imageEmoji: "☁️",
    description: "Long-staple white cotton fiber for textile manufacturing.",
    discount: "Textile Grade Quality",
  },
]

const CAROUSEL_SLIDES = [
  {
    title: "Maharashtra Horticulture & Onion Capital",
    subtitle: "Real-time Mandi Rates for Lasalgaon Onion, Ratnagiri Hapoos & Nashik Grapes",
    bgGradient: "from-blue-700 via-indigo-800 to-blue-900",
    badge: "⚡ LIVE APMC RATES",
    tag: "Nashik & Vashi Hubs",
    imgUrl: "/banners/maharashtra.png",
    prompt: "Tell me complete cultivation techniques and selling strategy for Lasalgaon Onion and Ratnagiri Hapoos Mango.",
  },
  {
    title: "Punjab & Haryana Basmati Granary",
    subtitle: "Pusa Basmati 1121 & Sharbati Wheat Mandi Advisory with 120B AI Vision",
    bgGradient: "from-emerald-700 via-teal-800 to-emerald-900",
    badge: "🌾 GRANARY SPECIAL",
    tag: "Karnal & Khanna Hubs",
    imgUrl: "/banners/punjab.png",
    prompt: "Give me the optimal sowing window, fertilizer ratio, and price outlook for Pusa Basmati 1121.",
  },
  {
    title: "Gujarat Spices & Red Chilli Export Hub",
    subtitle: "Unjha Cumin Seeds & Guntur Teja Red Chilli Price Forecast & Leaf Scan",
    bgGradient: "from-amber-600 via-orange-700 to-amber-800",
    badge: "🌿 SPICE EXPORT HUB",
    tag: "Unjha & Guntur APMC",
    imgUrl: "/banners/maharashtra.png",
    prompt: "What is the 7-day Mandi price forecast and selling strategy for Unjha Cumin and Guntur Chilli?",
  },
]

export function AgriMarketplace({
  onAskAI,
  onOpenLeafDoctor,
}: {
  onAskAI: (prompt: string) => void
  onOpenLeafDoctor: () => void
}) {
  const { t } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState("All Mandis")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeSlide, setActiveSlide] = useState(0)

  const CATEGORIES = [
    { name: "All Mandis", label: t("allMandis"), icon: "🌾", count: "20+ APMCs" },
    { name: "Vegetables", label: t("vegetables"), icon: "🥦", count: "12 Crops" },
    { name: "Spices", label: t("spices"), icon: "🌿", count: "8 Spices" },
    { name: "Cereals", label: t("cereals"), icon: "🌾", count: "6 Grains" },
    { name: "Fruits", label: t("fruits"), icon: "🍎", count: "10 Fruits" },
    { name: "Cash Crops", label: t("cashCrops"), icon: "☁️", count: "5 Fiber" },
    { name: "Leaf Doctor", label: t("leafDoctor"), icon: "🔬", count: "Instant Scan" },
    { name: "Profit Estimator", label: t("profitEstimator"), icon: "💰", count: "Calculator" },
  ]

  // Automatic Carousel Slide Timer (3.5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  const filteredCommodities = COMMODITIES.filter((item) => {
    const matchesCategory =
      selectedCategory === "All Mandis" || item.category.toLowerCase() === selectedCategory.toLowerCase()
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.hindiName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.apmc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.state.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="w-full min-h-screen bg-slate-100 text-slate-900 font-sans pb-16">
      
      {/* 🚀 1. Flipkart-Style Live Yellow Marquee Ticker */}
      <div className="w-full bg-yellow-400 text-slate-950 px-4 py-2 font-bold text-xs shadow-md border-b border-yellow-500 overflow-x-auto whitespace-nowrap flex items-center gap-6 scrollbar-none">
        <span className="flex items-center gap-1.5 font-extrabold text-blue-900 shrink-0 uppercase tracking-wide">
          <Zap className="h-4 w-4 fill-blue-900 text-blue-900 animate-pulse" /> LIVE AGMARKNET TICKER:
        </span>
        <div className="flex items-center gap-8 shrink-0 font-semibold">
          <span className="flex items-center gap-1">🧅 Lasalgaon Onion: <strong className="text-blue-950 font-extrabold">₹2,250/qtl</strong> <TrendingUp className="h-3.5 w-3.5 text-emerald-800" /></span>
          <span className="flex items-center gap-1">🌿 Unjha Cumin: <strong className="text-blue-950 font-extrabold">₹27,500/qtl</strong> <TrendingUp className="h-3.5 w-3.5 text-emerald-800" /></span>
          <span className="flex items-center gap-1">🌶️ Guntur Chilli: <strong className="text-blue-950 font-extrabold">₹16,200/qtl</strong> <TrendingUp className="h-3.5 w-3.5 text-emerald-800" /></span>
          <span className="flex items-center gap-1">🍅 Kolar Tomato: <strong className="text-blue-950 font-extrabold">₹2,300/qtl</strong> <TrendingUp className="h-3.5 w-3.5 text-emerald-800" /></span>
          <span className="flex items-center gap-1">🌾 Karnal Basmati: <strong className="text-blue-950 font-extrabold">₹4,200/qtl</strong> <TrendingUp className="h-3.5 w-3.5 text-emerald-800" /></span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 space-y-6">
        
        {/* 🛍️ 2. Flipkart Auto-Sliding Hero Carousel */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white shadow-xl">
          <div className="relative h-64 sm:h-72 w-full flex items-center px-6 sm:px-12 transition-all duration-700">
            
            {/* Background Banner Image overlay */}
            <img
              src={CAROUSEL_SLIDES[activeSlide].imgUrl}
              alt="State Agricultural Banner"
              className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-overlay transition-opacity duration-700"
            />

            <div className="relative z-10 max-w-2xl space-y-3">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-yellow-400 px-3 py-0.5 text-[11px] font-extrabold text-slate-950 shadow-sm">
                  {CAROUSEL_SLIDES[activeSlide].badge}
                </span>
                <span className="rounded-full bg-white/20 backdrop-blur-md px-3 py-0.5 text-[11px] font-semibold text-white">
                  📍 {CAROUSEL_SLIDES[activeSlide].tag}
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-yellow-300 leading-tight">
                {CAROUSEL_SLIDES[activeSlide].title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
                {CAROUSEL_SLIDES[activeSlide].subtitle}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onAskAI(CAROUSEL_SLIDES[activeSlide].prompt)}
                  className="flex items-center gap-2 rounded-xl bg-yellow-400 px-5 py-2.5 text-xs font-extrabold text-slate-950 shadow-md hover:bg-yellow-300 transition-all"
                >
                  <Sparkles className="h-4 w-4" /> Ask AI Advisory
                </button>
                <button
                  onClick={onOpenLeafDoctor}
                  className="flex items-center gap-2 rounded-xl border border-white/40 bg-white/10 backdrop-blur-md px-4 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition-all"
                >
                  <Stethoscope className="h-4 w-4 text-emerald-300" /> Leaf Diagnostic
                </button>
              </div>
            </div>

            {/* Next/Prev Navigation Buttons */}
            <button
              onClick={() => setActiveSlide((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-slate-950/40 text-white hover:bg-slate-950/70 backdrop-blur-md transition-all"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setActiveSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-slate-950/40 text-white hover:bg-slate-950/70 backdrop-blur-md transition-all"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Carousel Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
              {CAROUSEL_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2 rounded-full transition-all ${
                    activeSlide === idx ? "w-6 bg-yellow-400" : "w-2 bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 🥦 3. Flipkart Category Navigation Carousel */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Browse Commodities by Category</h3>
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (cat.name === "Leaf Doctor") onOpenLeafDoctor()
                  else setSelectedCategory(cat.name)
                }}
                className={`flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-xs font-bold whitespace-nowrap border transition-all ${
                  selectedCategory === cat.name
                    ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100"
                }`}
              >
                <span className="text-lg">{cat.icon}</span>
                <div className="text-left">
                  <div className="leading-tight font-extrabold">{cat.label}</div>
                  <div className="text-[10px] text-slate-500 font-normal">{cat.count}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 🔍 4. Amazon/Flipkart Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm border border-slate-200">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Onion, Tomato, Cumin, Lasalgaon APMC..."
              className="w-full rounded-xl border border-slate-300 bg-slate-50 pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none focus:bg-white font-medium"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <span>Showing <strong className="text-blue-700 font-extrabold">{filteredCommodities.length}</strong> Commodities</span>
          </div>
        </div>

        {/* 📦 5. Flipkart Crisp White Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCommodities.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-xl hover:border-blue-300 transition-all"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-4xl p-2 rounded-xl bg-slate-100 border border-slate-200">
                    {item.imageEmoji}
                  </span>
                  <div className="flex flex-col items-end gap-1">
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                      <Tag className="h-3 w-3 text-blue-600" /> {item.discount}
                    </span>
                    {item.giTagged && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                        <Award className="h-3 w-3 text-amber-600" /> GI Tagged
                      </span>
                    )}
                  </div>
                </div>

                {/* Title & APMC */}
                <h3 className="mt-4 font-serif font-bold text-base text-slate-900 group-hover:text-blue-700 transition-colors">
                  {item.name} <span className="text-xs text-slate-500 font-normal">({item.hindiName})</span>
                </h3>
                
                <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                  <MapPin className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                  <span>{item.apmc}, {item.state}</span>
                </div>

                <p className="mt-2.5 text-xs text-slate-600 leading-relaxed min-h-[36px]">
                  {item.description}
                </p>

                {/* BOLD Flipkart Yellow/Green Pricing Block */}
                <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-3.5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Live Mandi Rate</span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-serif font-extrabold text-2xl text-slate-950">{item.price}</span>
                      <span className="text-xs text-slate-600 font-medium">/ {item.unit}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-300">
                      <TrendingUp className="h-3.5 w-3.5" /> {item.changePercent}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => onAskAI(`What is the 7-day Mandi price forecast and selling advisory for ${item.name} at ${item.apmc}?`)}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 py-2.5 text-xs font-bold text-white shadow-md transition-all"
                >
                  <Sparkles className="h-4 w-4 text-yellow-300" /> Ask AI Advisory
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
