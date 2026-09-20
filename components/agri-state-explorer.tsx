"use client"

import { useState } from "react"
import { Award, MapPin, Sparkles, Stethoscope, Calculator, ChevronRight, TrendingUp } from "lucide-react"

type StateAgriInfo = {
  state: string
  flag: string
  tagline: string
  crops: {
    name: string
    variety: string
    giTagged: boolean
    icon: string
    famousMarket: string
    avgPrice: string
    description: string
  }[]
}

const STATE_DATA: StateAgriInfo[] = [
  {
    state: "Maharashtra",
    flag: "🦁",
    tagline: "India's Horticulture & Onion Capital",
    crops: [
      {
        name: "Red Onion (प्याज - Kanda)",
        variety: "Garwa / Phule Samarth",
        giTagged: true,
        icon: "🧅",
        famousMarket: "Lasalgaon & Pimpalgaon APMC",
        avgPrice: "₹2,250 / qtl",
        description: "Asia's largest onion market. High pungency & 6-month storage life.",
      },
      {
        name: "Alphonso Mango (हापूस)",
        variety: "Devgad & Ratnagiri GI",
        giTagged: true,
        icon: "🥭",
        famousMarket: "Vashi APMC, Mumbai",
        avgPrice: "₹4,500 / box",
        description: "World-famous GI-tagged rich aroma mango exported globally.",
      },
      {
        name: "Nashik Grapes (द्राक्ष)",
        variety: "Thomson Seedless",
        giTagged: true,
        icon: "🍇",
        famousMarket: "Nashik APMC",
        avgPrice: "₹65 / kg",
        description: "India's Grape & Wine capital with high Brix sweetness index.",
      },
      {
        name: "Nagpur Orange (संतरा)",
        variety: "Mandarin Orange",
        giTagged: true,
        icon: "🍊",
        famousMarket: "Nagpur APMC",
        avgPrice: "₹3,800 / qtl",
        description: "Famous juicy citrus crop with sweet-tangy flavor profile.",
      },
    ],
  },
  {
    state: "Punjab & Haryana",
    flag: "🌾",
    tagline: "India's Wheat & Basmati Granary",
    crops: [
      {
        name: "Paddy Basmati (धान 1121)",
        variety: "Pusa Basmati 1121 & 1509",
        giTagged: true,
        icon: "🌾",
        famousMarket: "Karnal & Khanna APMC",
        avgPrice: "₹4,200 / qtl",
        description: "Extra long-grain fragrant rice exported to US & Gulf nations.",
      },
      {
        name: "Sharbati Wheat (गेहूं)",
        variety: "PBW 550 / HD 2967",
        giTagged: false,
        icon: "🌾",
        famousMarket: "Ludhiana APMC",
        avgPrice: "₹2,400 / qtl",
        description: "High-protein golden wheat grain ideal for soft rotis.",
      },
    ],
  },
  {
    state: "Gujarat",
    flag: "🪔",
    tagline: "Spices, Cotton & Groundnut Powerhouse",
    crops: [
      {
        name: "Cumin Seeds (जीरा)",
        variety: "Gujarat Cumin-4",
        giTagged: true,
        icon: "🌿",
        famousMarket: "Unjha APMC (Asia's Largest)",
        avgPrice: "₹27,500 / qtl",
        description: "World market price-setter for Cumin/Jeera exports.",
      },
      {
        name: "Gir Kesar Mango",
        variety: "Gir Kesar GI",
        giTagged: true,
        icon: "🥭",
        famousMarket: "Talala Gir APMC",
        avgPrice: "₹3,800 / box",
        description: "Queen of Mangoes with bright saffron sweet pulp.",
      },
    ],
  },
  {
    state: "Madhya Pradesh",
    flag: "🌲",
    tagline: "Pulse, Soyabean & Garlic Hub",
    crops: [
      {
        name: "Mandsaur Garlic (लहसुन)",
        variety: "Ooty / Ek Kandi Desi",
        giTagged: false,
        icon: "🧄",
        famousMarket: "Mandsaur & Neemuch APMC",
        avgPrice: "₹11,800 / qtl",
        description: "India's largest garlic trading hub with high essential oil.",
      },
      {
        name: "Soyabean (सोयाबीन)",
        variety: "JS 335 / JS 9560",
        giTagged: false,
        icon: "🌱",
        famousMarket: "Indore & Ujjain APMC",
        avgPrice: "₹4,600 / qtl",
        description: "High protein & edible oil bean crop.",
      },
    ],
  },
  {
    state: "Karnataka & AP",
    flag: "🌶️",
    tagline: "Red Chilli & Tomato Powerhouse",
    crops: [
      {
        name: "Guntur Red Chilli (लाल मिर्च)",
        variety: "334 / Sannam / Teja",
        giTagged: true,
        icon: "🌶️",
        famousMarket: "Guntur APMC (Asia's Largest)",
        avgPrice: "₹16,200 / qtl",
        description: "World famous hot red chilli exported to China & Vietnam.",
      },
      {
        name: "Kolar Tomato (टमाटर)",
        variety: "Hybrid Abhinav / Shivam",
        giTagged: false,
        icon: "🍅",
        famousMarket: "Kolar APMC",
        avgPrice: "₹2,300 / qtl",
        description: "Major tomato supplier for South & Central India.",
      },
    ],
  },
]

const COMMON_DISEASES = [
  {
    crop: "Tomato",
    name: "Early Blight (Alternaria solani)",
    symptom: "Concentric target rings with yellow halo on leaf",
    severity: "High",
    icon: "🍅",
    treatment: "Mancozeb 75% WP @ 2.5g/L water spray",
  },
  {
    crop: "Wheat",
    name: "Yellow Rust (Puccinia striiformis)",
    symptom: "Yellow pustule stripes along leaf veins",
    severity: "Critical",
    icon: "🌾",
    treatment: "Propiconazole 25% EC @ 1ml/L water spray",
  },
  {
    crop: "Cotton",
    name: "Pink Bollworm (Pectinophora gossa)",
    symptom: "Rosetted flowers & lint boll damage",
    severity: "Critical",
    icon: "☁️",
    treatment: "Pheromone traps (5/acre) + Emamectin Benzoate",
  },
  {
    crop: "Onion",
    name: "Purple Blotch (Alternaria porri)",
    symptom: "Purple-brown oval lesions on leaves",
    severity: "Medium",
    icon: "🧅",
    treatment: "Tebuconazole 50% + Trifloxystrobin 25% @ 0.7g/L",
  },
]

export function AgriStateExplorer({
  onQuickAsk,
  onOpenLeafDoctor,
}: {
  onQuickAsk: (prompt: string) => void
  onOpenLeafDoctor: () => void
}) {
  const [selectedStateIndex, setSelectedStateIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<"states" | "diseases" | "calc">("states")

  // Yield & Profit Calculator State
  const [calcCrop, setCalcCrop] = useState("Onion")
  const [acres, setAcres] = useState(2)
  const [expectedYieldQtl, setExpectedYieldQtl] = useState(100)
  const [mandiPrice, setMandiPrice] = useState(2250)
  const [costPerAcre, setCostPerAcre] = useState(45000)

  const currentState = STATE_DATA[selectedStateIndex]

  // Calculations
  const totalProduction = acres * expectedYieldQtl
  const totalRevenue = totalProduction * mandiPrice
  const totalCost = acres * costPerAcre
  const netProfit = totalRevenue - totalCost

  return (
    <div className="w-full rounded-3xl border border-emerald-500/40 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 p-4 sm:p-6 shadow-2xl backdrop-blur-2xl text-slate-100 font-sans my-2">
      
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-emerald-500/20 pb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-400 via-teal-500 to-cyan-400 text-slate-950 shadow-lg shadow-emerald-500/30">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-teal-100 to-amber-200">
              State GI Crops & Diagnostics
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              GI Tagged Crops, Pest Visual Gallery & Yield Profitability Calculator
            </p>
          </div>
        </div>

        {/* Tab Switcher Buttons */}
        <div className="flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/90 p-1.5 text-xs font-bold shadow-inner">
          <button
            onClick={() => setActiveTab("states")}
            className={`rounded-xl px-4 py-2 transition-all ${
              activeTab === "states"
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/30"
                : "text-slate-400 hover:text-emerald-300"
            }`}
          >
            🗺️ State Crops
          </button>

          <button
            onClick={() => setActiveTab("diseases")}
            className={`rounded-xl px-4 py-2 transition-all ${
              activeTab === "diseases"
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/30"
                : "text-slate-400 hover:text-emerald-300"
            }`}
          >
            🌿 Pest Gallery
          </button>

          <button
            onClick={() => setActiveTab("calc")}
            className={`rounded-xl px-4 py-2 transition-all ${
              activeTab === "calc"
                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-amber-500/30"
                : "text-slate-400 hover:text-amber-300"
            }`}
          >
            💰 Profit Calculator
          </button>
        </div>
      </div>

      {/* TAB 1: STATE SPECIALTY CROPS */}
      {activeTab === "states" && (
        <div className="mt-5 space-y-5">
          
          {/* State Selectors */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {STATE_DATA.map((st, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedStateIndex(idx)}
                className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold whitespace-nowrap border transition-all ${
                  selectedStateIndex === idx
                    ? "border-emerald-400 bg-emerald-950/80 text-emerald-200 shadow-lg shadow-emerald-950/80"
                    : "border-slate-800 bg-slate-900/80 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                <span className="text-base">{st.flag}</span>
                <span>{st.state}</span>
              </button>
            ))}
          </div>

          {/* Active State Header Banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-950/30 px-5 py-3.5">
            <div className="flex items-center gap-2.5">
              <MapPin className="h-5 w-5 text-emerald-400 shrink-0" />
              <span className="font-serif text-base font-bold text-emerald-200">{currentState.state}</span>
              <span className="text-xs text-slate-400 font-medium">• {currentState.tagline}</span>
            </div>
            <span className="text-xs font-semibold text-emerald-300 bg-emerald-900/60 px-3 py-1 rounded-full border border-emerald-500/40">
              {currentState.crops.length} Flagship Commodities
            </span>
          </div>

          {/* Unclipped Grid of Crop Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {currentState.crops.map((crop, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/90 p-4 hover:border-emerald-500/60 hover:shadow-xl hover:shadow-emerald-950/40 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-3xl p-2 rounded-xl bg-slate-800/90 border border-slate-700/60">
                      {crop.icon}
                    </span>
                    {crop.giTagged && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/50 bg-amber-950/90 px-2.5 py-1 text-[11px] font-bold text-amber-300 shadow-sm">
                        <Award className="h-3 w-3" /> GI Tagged
                      </span>
                    )}
                  </div>

                  <h4 className="mt-3 font-serif font-bold text-sm text-slate-100 group-hover:text-emerald-300 transition-colors">
                    {crop.name}
                  </h4>
                  <p className="text-[11px] font-semibold text-emerald-400">{crop.variety}</p>

                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    {crop.description}
                  </p>

                  {/* Mandi & Price Info Block - No Cutoff */}
                  <div className="mt-3.5 space-y-1.5 rounded-xl border border-slate-800 bg-slate-950/90 p-3 text-xs">
                    <div className="flex items-center justify-between text-slate-400 gap-2">
                      <span className="shrink-0">Hub APMC:</span>
                      <span className="font-semibold text-slate-200 text-right font-sans leading-tight">
                        {crop.famousMarket}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400 border-t border-slate-800/80 pt-1.5">
                      <span>Live Rate:</span>
                      <span className="font-serif font-extrabold text-amber-300 text-sm">{crop.avgPrice}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onQuickAsk(`Tell me complete cultivation techniques, best sowing window, and Mandi selling strategy for ${crop.name} in ${currentState.state}.`)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-950/70 py-2.5 text-xs font-bold text-emerald-300 hover:bg-emerald-900/80 transition-all shadow-md"
                >
                  <Sparkles className="h-4 w-4 text-emerald-400" /> Ask AI Advisory
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: PEST & DISEASE PHOTO GALLERY */}
      {activeTab === "diseases" && (
        <div className="mt-5 space-y-4">
          <div className="flex items-center justify-between rounded-2xl border border-rose-500/30 bg-rose-950/30 px-5 py-3.5">
            <div>
              <h4 className="font-serif text-base font-bold text-rose-300">Indian Crop Disease Diagnostic Gallery</h4>
              <p className="text-xs text-slate-400">Click any card to trigger Instant AI Treatment advisory</p>
            </div>
            <button
              onClick={onOpenLeafDoctor}
              className="flex items-center gap-2 rounded-xl border border-rose-500/50 bg-rose-950 px-4 py-2 text-xs font-bold text-rose-200 hover:bg-rose-900 transition-colors shadow-lg"
            >
              <Stethoscope className="h-4 w-4" /> Open Leaf Doctor
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {COMMON_DISEASES.map((dis, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 hover:border-rose-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{dis.icon}</span>
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                      dis.severity === "Critical" ? "bg-rose-950 text-rose-300 border border-rose-500/50" : "bg-amber-950 text-amber-300 border border-amber-500/50"
                    }`}>
                      {dis.severity} Severity
                    </span>
                  </div>

                  <h5 className="mt-3.5 font-bold text-sm text-slate-200">{dis.crop} — {dis.name}</h5>
                  <p className="mt-1.5 text-xs text-slate-400 leading-snug"><strong>Symptom:</strong> {dis.symptom}</p>
                  
                  <div className="mt-3 rounded-xl bg-slate-950 p-3 border border-slate-800 text-xs">
                    <span className="font-semibold text-emerald-400">Recommended Formula:</span>
                    <p className="text-slate-300 mt-1 leading-snug">{dis.treatment}</p>
                  </div>
                </div>

                <button
                  onClick={() => onQuickAsk(`My ${dis.crop} crop leaves show symptoms of ${dis.name} (${dis.symptom}). Give me complete organic and chemical remedy dosage per acre.`)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-rose-500/40 bg-rose-950/70 py-2.5 text-xs font-bold text-rose-300 hover:bg-rose-900/80 transition-colors"
                >
                  <Stethoscope className="h-4 w-4" /> Diagnose {dis.crop}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PER-ACRE PROFITABILITY CALCULATOR */}
      {activeTab === "calc" && (
        <div className="mt-5 rounded-2xl border border-amber-500/30 bg-slate-900/90 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
            <div>
              <h4 className="font-serif text-base font-bold text-amber-300">Smart Farm Profitability & Yield Estimator</h4>
              <p className="text-xs text-slate-400">Estimate net profit based on live Mandi prices and production costs</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40">
              <Calculator className="h-5 w-5" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 font-medium mb-1.5">Select Crop</label>
              <select
                value={calcCrop}
                onChange={(e) => setCalcCrop(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-slate-200 focus:border-amber-400 focus:outline-none"
              >
                <option value="Onion">Onion (प्याज)</option>
                <option value="Tomato">Tomato (टमाटर)</option>
                <option value="Wheat">Wheat (गेहूं)</option>
                <option value="Paddy Basmati">Paddy Basmati (धान)</option>
                <option value="Garlic">Garlic (लहसुन)</option>
                <option value="Cotton">Cotton (कपास)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1.5">Land Size (Acres)</label>
              <input
                type="number"
                value={acres}
                onChange={(e) => setAcres(Number(e.target.value) || 1)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-slate-200 focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1.5">Yield / Acre (Quintals)</label>
              <input
                type="number"
                value={expectedYieldQtl}
                onChange={(e) => setExpectedYieldQtl(Number(e.target.value) || 10)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-slate-200 focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1.5">Mandi Price (₹/Quintal)</label>
              <input
                type="number"
                value={mandiPrice}
                onChange={(e) => setMandiPrice(Number(e.target.value) || 1000)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-slate-200 focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Profit Output Banner */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-2xl border border-emerald-500/40 bg-emerald-950/40 p-4">
            <div>
              <span className="text-xs text-slate-400">Total Yield:</span>
              <p className="font-serif text-2xl font-bold text-emerald-300">{totalProduction} Quintals</p>
            </div>
            <div>
              <span className="text-xs text-slate-400">Gross Revenue:</span>
              <p className="font-serif text-2xl font-bold text-amber-300">₹{totalRevenue.toLocaleString()}</p>
            </div>
            <div>
              <span className="text-xs text-slate-400">Net Estimated Profit:</span>
              <p className="font-serif text-3xl font-extrabold text-emerald-400">₹{netProfit.toLocaleString()}</p>
            </div>
          </div>

          <button
            onClick={() => onQuickAsk(`I am cultivating ${acres} acres of ${calcCrop} expecting ${expectedYieldQtl} qtl/acre yield at ₹${mandiPrice}/qtl mandi rate. How can I optimize fertilizer dosage and harvesting time to maximize my net profit?`)}
            className="flex items-center justify-center gap-2 w-full rounded-xl border border-amber-500/50 bg-gradient-to-r from-amber-950 to-slate-900 py-3.5 text-xs font-bold text-amber-200 hover:brightness-110 transition-all shadow-lg"
          >
            <Sparkles className="h-4 w-4" /> Get AI Strategy to Maximize Profit
          </button>
        </div>
      )}
    </div>
  )
}
