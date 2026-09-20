"use client"

import { useState, useEffect } from "react"
import {
  Sun,
  CloudRain,
  Droplets,
  TrendingUp,
  TrendingDown,
  Minus,
  Sparkles,
  Stethoscope,
  Calculator,
  MapPin,
  RefreshCw,
  Search,
} from "lucide-react"

type MandiRate = {
  commodity: string
  category?: string
  mandi: string
  min_price: number
  max_price: number
  modal_price: number
  trend: "up" | "down" | "stable"
}

const MANDI_LOCATIONS = [
  "Lasalgaon APMC, Nashik (Asia Onion Hub)",
  "Nashik APMC, Maharashtra",
  "Pimpalgaon APMC, Nashik",
  "Azadpur APMC, Delhi",
  "Mumbai APMC Vashi, Maharashtra",
  "Nagpur APMC, Maharashtra",
  "Mandsaur APMC, Madhya Pradesh",
  "Indore APMC, Madhya Pradesh",
  "Rajkot APMC, Gujarat",
  "Unjha APMC, Gujarat (Jeera Hub)",
  "Kolar APMC, Karnataka (Tomato Hub)",
  "Bengaluru APMC, Karnataka",
  "Guntur APMC, Andhra Pradesh (Chilli Hub)",
  "Hyderabad APMC, Telangana",
  "Agra APMC, Uttar Pradesh (Potato Hub)",
  "Kanpur APMC, Uttar Pradesh",
  "Khanna APMC, Punjab",
  "Ludhiana APMC, Punjab",
  "Karnal APMC, Haryana",
  "Bharatpur APMC, Rajasthan",
  "Patna APMC, Bihar",
  "Kolkata APMC, West Bengal",
]

const CATEGORIES = ["All", "Vegetables", "Spices", "Cereals", "Oilseeds", "Pulses", "Cash Crops"]

export function LeftDashboard({
  onOpenLeafDoctor,
  onQuickAsk,
}: {
  onOpenLeafDoctor: () => void
  onQuickAsk: (text: string) => void
}) {
  const [mandiLocation, setMandiLocation] = useState("Lasalgaon APMC, Nashik (Asia Onion Hub)")
  const [customSearchLocation, setCustomSearchLocation] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [cropSearchQuery, setCropSearchQuery] = useState("")
  const [rates, setRates] = useState<MandiRate[]>([
    { commodity: "Tomato (टमाटर - Hybrid)", category: "Vegetables", mandi: "Kolar / Lasalgaon", min_price: 1900, max_price: 2700, modal_price: 2300, trend: "up" },
    { commodity: "Onion (प्याज - Kanda)", category: "Vegetables", mandi: "Lasalgaon", min_price: 1800, max_price: 2600, modal_price: 2250, trend: "up" },
    { commodity: "Potato (आलू - Batata)", category: "Vegetables", mandi: "Agra", min_price: 1400, max_price: 1850, modal_price: 1620, trend: "stable" },
    { commodity: "Garlic (लहसुन)", category: "Vegetables", mandi: "Mandsaur", min_price: 9500, max_price: 14000, modal_price: 11800, trend: "up" },
    { commodity: "Ginger (अदरक)", category: "Vegetables", mandi: "Nagpur", min_price: 6500, max_price: 8800, modal_price: 7600, trend: "stable" },
    { commodity: "Green Chilli (हरी मिर्च)", category: "Vegetables", mandi: "Guntur", min_price: 3200, max_price: 4500, modal_price: 3800, trend: "up" },
    { commodity: "Wheat (गेहूं)", category: "Cereals", mandi: "Khanna", min_price: 2250, max_price: 2550, modal_price: 2400, trend: "up" },
    { commodity: "Paddy Basmati (धान)", category: "Cereals", mandi: "Karnal", min_price: 3800, max_price: 4600, modal_price: 4200, trend: "stable" },
    { commodity: "Maize (मक्का)", category: "Cereals", mandi: "Rajkot", min_price: 1900, max_price: 2250, modal_price: 2080, trend: "up" },
    { commodity: "Mustard (सरसों)", category: "Oilseeds", mandi: "Bharatpur", min_price: 5300, max_price: 5850, modal_price: 5600, trend: "up" },
    { commodity: "Soyabean (सोयाबीन)", category: "Oilseeds", mandi: "Indore", min_price: 4300, max_price: 4850, modal_price: 4600, trend: "stable" },
    { commodity: "Chana / Gram (चना)", category: "Pulses", mandi: "Bikaner", min_price: 5600, max_price: 6200, modal_price: 5900, trend: "up" },
    { commodity: "Tur / Arhar (अरहर)", category: "Pulses", mandi: "Latur", min_price: 8500, max_price: 10200, modal_price: 9400, trend: "up" },
    { commodity: "Cumin Seeds (जीरा)", category: "Spices", mandi: "Unjha", min_price: 24000, max_price: 31000, modal_price: 27500, trend: "up" },
    { commodity: "Turmeric (हल्दी)", category: "Spices", mandi: "Nizamabad", min_price: 12500, max_price: 16000, modal_price: 14200, trend: "stable" },
    { commodity: "Cotton (कपास)", category: "Cash Crops", mandi: "Rajkot", min_price: 6700, max_price: 7300, modal_price: 7050, trend: "down" },
  ])
  const [loadingRates, setLoadingRates] = useState(false)

  const fetchRates = async (locationToFetch?: string) => {
    setLoadingRates(true)
    const loc = locationToFetch || mandiLocation
    try {
      const res = await fetch(`/api/backend/mandi-prices?location=${encodeURIComponent(loc)}`)
      if (res.ok) {
        const data = await res.json()
        if (data.rates && data.rates.length > 0) {
          setRates(data.rates)
        }
      }
    } catch {
      // Fallback
    } finally {
      setLoadingRates(false)
    }
  }

  useEffect(() => {
    fetchRates(mandiLocation)
  }, [mandiLocation])

  const handleCustomSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (customSearchLocation.trim()) {
      setMandiLocation(customSearchLocation.trim())
      fetchRates(customSearchLocation.trim())
    }
  }

  const filteredRates = rates.filter((r) => {
    const name = (r.commodity || (r as any).crop || "").toLowerCase()
    const cat = (r.category || "").toLowerCase()
    const selCat = selectedCategory.toLowerCase()
    const query = cropSearchQuery.trim().toLowerCase()

    const matchesCategory = selectedCategory === "All" || !r.category || cat.includes(selCat) || selCat.includes(cat)
    const matchesSearch = !query || name.includes(query)
    return matchesCategory && matchesSearch
  })

  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-y-auto pr-1.5 text-slate-100 font-sans">
      
      {/* 1. Farm Weather & Soil Radar Card */}
      <div className="relative rounded-3xl border border-cyan-500/30 bg-slate-950/90 p-4 shadow-xl shrink-0">
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2.5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-500 text-slate-950 shadow-md shadow-cyan-500/20">
              <Sun className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-serif text-xs font-bold text-cyan-300">Farm Weather Radar</h3>
              <p className="text-[10px] text-slate-400">Live Soil & Micro-climate Index</p>
            </div>
          </div>
          <span className="rounded-full border border-cyan-500/30 bg-cyan-950/60 px-2 py-0.5 text-[9px] font-bold text-cyan-400">
            Live
          </span>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-amber-500/20 bg-amber-950/30 p-2.5 flex items-center justify-between">
            <div>
              <span className="text-[9px] font-semibold text-amber-400">Temp / Air</span>
              <p className="font-serif text-base font-bold text-amber-200">28°C</p>
            </div>
            <Sun className="h-5 w-5 text-amber-400 animate-pulse" />
          </div>

          <div className="rounded-xl border border-cyan-500/20 bg-cyan-950/30 p-2.5 flex items-center justify-between">
            <div>
              <span className="text-[9px] font-semibold text-cyan-400">Humidity</span>
              <p className="font-serif text-base font-bold text-cyan-200">65%</p>
            </div>
            <Droplets className="h-5 w-5 text-cyan-400" />
          </div>

          <div className="rounded-xl border border-blue-500/20 bg-blue-950/30 p-2.5 flex items-center justify-between">
            <div>
              <span className="text-[9px] font-semibold text-blue-400">Rain Chance</span>
              <p className="font-serif text-base font-bold text-blue-200">25%</p>
            </div>
            <CloudRain className="h-5 w-5 text-blue-400" />
          </div>

          <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/30 p-2.5 flex items-center justify-between">
            <div>
              <span className="text-[9px] font-semibold text-emerald-400">Soil Moisture</span>
              <p className="font-serif text-base font-bold text-emerald-200">72% <span className="text-[9px] text-emerald-400 font-sans">Optimum</span></p>
            </div>
            <Sparkles className="h-5 w-5 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* 2. Live Agmarknet Mandi Intelligence Engine */}
      <div className="relative rounded-3xl border border-amber-500/30 bg-slate-950/90 p-4 shadow-xl shrink-0 flex flex-col">
        
        {/* Mandi Card Header */}
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-2.5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-orange-400 text-slate-950 shadow-md shadow-amber-500/20">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-serif text-xs font-bold text-amber-300">Live Agmarknet Mandi Rates</h3>
              <p className="text-[10px] text-slate-400">All Indian States & 10+ Crop Categories</p>
            </div>
          </div>

          <button
            onClick={() => fetchRates()}
            disabled={loadingRates}
            className="rounded-lg p-1.5 text-amber-400 hover:bg-amber-950/50 transition-colors"
            title="Refresh Mandi Rates"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loadingRates ? "animate-spin" : ""}`} />
          </button>
        </div>

        {/* State / APMC Dropdown */}
        <div className="mt-2.5 flex items-center gap-2 rounded-xl border border-amber-500/20 bg-slate-900 px-2.5 py-1.5 text-xs text-amber-300">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-amber-400" />
          <select
            value={mandiLocation}
            onChange={(e) => setMandiLocation(e.target.value)}
            className="bg-transparent font-medium focus:outline-none cursor-pointer w-full text-slate-200 text-xs"
          >
            {MANDI_LOCATIONS.map((loc, idx) => (
              <option key={idx} value={loc} className="bg-slate-900 text-slate-100">
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Custom City / Mandi Search Input */}
        <form onSubmit={handleCustomSearch} className="mt-2 flex items-center gap-1.5">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search any Indian City / Mandi..."
              value={customSearchLocation}
              onChange={(e) => setCustomSearchLocation(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-900/90 pl-7 pr-2.5 py-1.5 text-xs text-amber-100 placeholder-slate-500 focus:border-amber-400 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="rounded-xl border border-amber-500/40 bg-amber-950/60 px-2.5 py-1.5 text-xs font-bold text-amber-300 hover:bg-amber-900/60 transition-colors shrink-0"
          >
            Search
          </button>
        </form>

        {/* Category Filter Chips */}
        <div className="mt-2 flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-amber-500 text-slate-950 font-bold shadow-sm shadow-amber-500/30"
                  : "bg-slate-900 text-slate-400 hover:text-amber-300 border border-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Commodity Search Filter Input */}
        <div className="mt-1.5 relative">
          <input
            type="text"
            placeholder="Filter crop (e.g. Tomato, Onion, Wheat)..."
            value={cropSearchQuery}
            onChange={(e) => setCropSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-2.5 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:border-amber-400 focus:outline-none"
          />
        </div>

        {/* Commodity Rates List (Scrollable with explicit min-h-[220px] and max-h-[300px]) */}
        <div className="mt-3 space-y-2 overflow-y-auto max-h-[300px] min-h-[220px] pr-1">
          {loadingRates ? (
            <div className="flex h-32 items-center justify-center text-xs text-amber-400/80">
              <RefreshCw className="h-4 w-4 animate-spin mr-2" />
              Fetching live rates for {mandiLocation}…
            </div>
          ) : filteredRates.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-4 text-center text-xs text-slate-400 gap-2">
              <p className="text-[11px]">No crops matching "{cropSearchQuery}" in {selectedCategory}.</p>
              <button
                onClick={() => {
                  setCropSearchQuery("")
                  setSelectedCategory("All")
                }}
                className="rounded-xl border border-amber-500/40 bg-amber-950/60 px-3 py-1 font-semibold text-amber-300 hover:bg-amber-900/60 transition-colors text-[10px]"
              >
                Clear Search & Show All Crops
              </button>
            </div>
          ) : (
            filteredRates.map((r, idx) => (
              <div
                key={idx}
                onClick={() => onQuickAsk(`What is the future market price trend and selling advice for ${r.commodity} in ${mandiLocation}?`)}
                className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/90 p-3 hover:border-amber-500/50 hover:bg-slate-900 transition-all cursor-pointer group shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-slate-200 group-hover:text-amber-300 transition-colors">
                      {r.commodity}
                    </span>
                    {r.category && (
                      <span className="rounded bg-slate-800 px-1.5 py-0.2 text-[8px] font-medium text-slate-400">
                        {r.category}
                      </span>
                    )}
                  </div>
                  <span className="text-[9px] text-slate-400 block truncate max-w-[160px]">{r.mandi} Mandi</span>
                </div>

                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 justify-end">
                    <span className="font-serif font-bold text-xs sm:text-sm text-amber-200">
                      ₹{r.modal_price.toLocaleString()}
                    </span>
                    <span className="text-[9px] text-slate-400">/qtl</span>

                    {r.trend === "up" && (
                      <span className="flex items-center text-[9px] font-bold text-emerald-400 bg-emerald-950/80 px-1 py-0.5 rounded border border-emerald-500/40">
                        <TrendingUp className="h-2.5 w-2.5 mr-0.5" /> ↑
                      </span>
                    )}
                    {r.trend === "down" && (
                      <span className="flex items-center text-[9px] font-bold text-rose-400 bg-rose-950/80 px-1 py-0.5 rounded border border-rose-500/40">
                        <TrendingDown className="h-2.5 w-2.5 mr-0.5" /> ↓
                      </span>
                    )}
                    {r.trend === "stable" && (
                      <span className="flex items-center text-[9px] font-bold text-amber-400 bg-amber-950/80 px-1 py-0.5 rounded border border-amber-500/40">
                        <Minus className="h-2.5 w-2.5 mr-0.5" /> ↔
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 3. Quick Tools Launchpad */}
      <div className="shrink-0 grid grid-cols-2 gap-2.5 pb-2">
        <button
          onClick={onOpenLeafDoctor}
          className="flex items-center gap-2 rounded-2xl border border-cyan-500/40 bg-gradient-to-r from-cyan-950 to-slate-900 p-3 text-left text-xs font-bold text-cyan-200 shadow-lg hover:brightness-110 transition-all group"
        >
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 group-hover:scale-105 transition-transform">
            <Stethoscope className="h-3.5 w-3.5" />
          </div>
          <div>
            <span className="block leading-tight">AI Leaf Doctor</span>
            <p className="text-[9px] font-normal text-slate-400">Disease Diagnosis</p>
          </div>
        </button>

        <button
          onClick={() => onQuickAsk("Calculate per acre NPK and Urea dosage for Wheat crop.")}
          className="flex items-center gap-2 rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-950 to-slate-900 p-3 text-left text-xs font-bold text-amber-200 shadow-lg hover:brightness-110 transition-all group"
        >
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 group-hover:scale-105 transition-transform">
            <Calculator className="h-3.5 w-3.5" />
          </div>
          <div>
            <span className="block leading-tight">NPK Calculator</span>
            <p className="text-[9px] font-normal text-slate-400">Fertilizer Dosage</p>
          </div>
        </button>
      </div>
    </div>
  )
}
