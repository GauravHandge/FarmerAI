"use client"

import React, { useState } from "react"
import {
  Users,
  TrendingUp,
  BarChart3,
  Stethoscope,
  Plus,
  Edit2,
  Save,
  Trash2,
  Zap,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Search,
  Bell,
  Radio,
  FileText
} from "lucide-react"

type AdminStat = {
  label: string
  value: string
  change: string
  icon: React.ReactNode
  color: string
}

type EditablePrice = {
  id: string
  commodity: string
  apmc: string
  minPrice: number
  maxPrice: number
  modalPrice: number
  unit: string
}

const INITIAL_PRICES: EditablePrice[] = [
  { id: "p1", commodity: "Red Onion (प्याज)", apmc: "Lasalgaon APMC", minPrice: 1800, maxPrice: 2600, modalPrice: 2250, unit: "quintal" },
  { id: "p2", commodity: "Hybrid Tomato (टमाटर)", apmc: "Kolar APMC", minPrice: 1900, maxPrice: 2700, modalPrice: 2300, unit: "quintal" },
  { id: "p3", commodity: "Cumin Seeds (जीरा)", apmc: "Unjha APMC", minPrice: 24000, maxPrice: 31000, modalPrice: 27500, unit: "quintal" },
  { id: "p4", commodity: "Pusa Basmati 1121 (धान)", apmc: "Karnal APMC", minPrice: 3800, maxPrice: 4600, modalPrice: 4200, unit: "quintal" },
]

const AI_QUERY_LOGS = [
  { id: "q1", time: "12:42 PM", farmer: "Ramesh Patil (Nashik)", query: "Lasalgaon Onion 7-day price trend?", topic: "Marketplace Advisory", status: "Resolved", model: "Llama-3.3-70B" },
  { id: "q2", time: "12:35 PM", farmer: "Sukhwinder Singh (Khanna)", query: "Leaf rust on Pusa 1121 rice treatment", topic: "Pest Diagnostic", status: "Resolved", model: "Llama-3.2-Vision" },
  { id: "q3", time: "12:20 PM", farmer: "Jignesh Patel (Unjha)", query: "Unjha Cumin export demand forecast", topic: "Commodity Forecast", status: "Resolved", model: "Llama-3.3-70B" },
]

export function AgriAdminDashboard() {
  const [prices, setPrices] = useState<EditablePrice[]>(INITIAL_PRICES)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<EditablePrice>>({})
  const [tickerNews, setTickerNews] = useState("Lasalgaon Onion: ₹2,250/qtl ▲ | Unjha Cumin: ₹27,500/qtl ▲ | Govt MSP Rice: ₹2,300/qtl")
  const [savedSuccess, setSavedSuccess] = useState(false)

  const handleEditClick = (item: EditablePrice) => {
    setEditingId(item.id)
    setEditForm(item)
  }

  const handleSaveClick = (id: string) => {
    setPrices(prices.map(p => p.id === id ? { ...p, ...editForm } as EditablePrice : p))
    setEditingId(null)
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 3000)
  }

  return (
    <div className="w-full min-h-screen bg-slate-900 text-slate-100 font-sans p-4 sm:p-8 space-y-8">
      
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-yellow-400 px-3 py-0.5 text-xs font-extrabold text-slate-950 shadow-sm">
              <ShieldCheck className="inline h-3.5 w-3.5 mr-1" /> MASTER ADMIN OS
            </span>
            <span className="rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-0.5 text-xs font-bold flex items-center gap-1">
              <Radio className="h-3 w-3 animate-pulse text-emerald-400" /> System Live
            </span>
          </div>
          <h1 className="mt-2 font-serif text-2xl sm:text-3xl font-extrabold text-white">
            KisanMitra Command & Analytics Center
          </h1>
          <p className="text-xs text-slate-400 font-medium">Real-Time Mandi Price Overrides, AI Query Monitoring & Commodity Management</p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 px-4 py-2 text-xs font-extrabold text-emerald-300 animate-in fade-in">
            <CheckCircle2 className="h-4 w-4" /> Live Mandi Rates Updated Successfully!
          </div>
        )}
      </div>

      {/* 📊 1. Key Performance Indicators (KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Registered Farmers</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-serif font-extrabold text-3xl text-white">14,280</span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">+12.4% this week</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">AI Consultations</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
              <Zap className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-serif font-extrabold text-3xl text-white">3,840</span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">+18.2% today</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Leaf Scans Processed</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <Stethoscope className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-serif font-extrabold text-3xl text-white">1,120</span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">99.4% Accuracy</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active APMC Mandis</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <BarChart3 className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="font-serif font-extrabold text-3xl text-white">52 Mandis</span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">Agmarknet Sync</span>
          </div>
        </div>
      </div>

      {/* 📈 2. Real-Time Mandi Price Override Manager */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-lg text-white">Real-Time Mandi Rate Override Manager</h3>
            <p className="text-xs text-slate-400">Directly update APMC Mandi rates across the platform in real-time</p>
          </div>
          <button
            onClick={() => setSavedSuccess(true)}
            className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 transition-all shadow-md"
          >
            <Plus className="h-4 w-4" /> Add Commodity Rate
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-slate-400 font-bold border-b border-slate-800 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-3.5">Commodity Name</th>
                <th className="p-3.5">APMC Mandi</th>
                <th className="p-3.5">Min Price (₹)</th>
                <th className="p-3.5">Max Price (₹)</th>
                <th className="p-3.5 text-yellow-400">Modal Price (⚡ Live)</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {prices.map((p) => (
                <tr key={p.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="p-3.5 font-bold text-white">{p.commodity}</td>
                  <td className="p-3.5 text-slate-300">{p.apmc}</td>
                  
                  {editingId === p.id ? (
                    <>
                      <td className="p-2">
                        <input
                          type="number"
                          value={editForm.minPrice || 0}
                          onChange={(e) => setEditForm({ ...editForm, minPrice: Number(e.target.value) })}
                          className="w-20 rounded-lg bg-slate-900 border border-blue-500 px-2 py-1 text-white font-bold"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          value={editForm.maxPrice || 0}
                          onChange={(e) => setEditForm({ ...editForm, maxPrice: Number(e.target.value) })}
                          className="w-20 rounded-lg bg-slate-900 border border-blue-500 px-2 py-1 text-white font-bold"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          value={editForm.modalPrice || 0}
                          onChange={(e) => setEditForm({ ...editForm, modalPrice: Number(e.target.value) })}
                          className="w-24 rounded-lg bg-slate-900 border border-yellow-400 px-2 py-1 text-yellow-300 font-extrabold"
                        />
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => handleSaveClick(p.id)}
                          className="rounded-lg bg-emerald-600 px-3 py-1 text-xs font-bold text-white hover:bg-emerald-500 transition-all flex items-center gap-1 ml-auto"
                        >
                          <Save className="h-3.5 w-3.5" /> Save Rate
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-3.5 font-medium text-slate-300">₹{p.minPrice.toLocaleString()}</td>
                      <td className="p-3.5 font-medium text-slate-300">₹{p.maxPrice.toLocaleString()}</td>
                      <td className="p-3.5 font-serif font-extrabold text-sm text-yellow-300 bg-yellow-400/10 rounded-lg">
                        ₹{p.modalPrice.toLocaleString()} / {p.unit}
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => handleEditClick(p)}
                          className="rounded-lg bg-slate-800 hover:bg-slate-700 px-3 py-1.5 text-xs font-bold text-blue-400 border border-slate-700 transition-all inline-flex items-center gap-1"
                        >
                          <Edit2 className="h-3.5 w-3.5" /> Override Rate
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🤖 3. AI Advisory Audit & Consultation Log */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-4 shadow-xl">
        <h3 className="font-serif font-bold text-lg text-white">Live AI Farmer Advisory Log</h3>
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-slate-400 font-bold border-b border-slate-800 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-3.5">Timestamp</th>
                <th className="p-3.5">Farmer & Region</th>
                <th className="p-3.5">Query Summary</th>
                <th className="p-3.5">AI Model Engine</th>
                <th className="p-3.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {AI_QUERY_LOGS.map((q) => (
                <tr key={q.id} className="hover:bg-slate-900/50">
                  <td className="p-3.5 font-mono text-slate-400">{q.time}</td>
                  <td className="p-3.5 font-bold text-white">{q.farmer}</td>
                  <td className="p-3.5">{q.query}</td>
                  <td className="p-3.5 font-mono text-xs text-blue-400">{q.model}</td>
                  <td className="p-3.5 text-right">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-extrabold">
                      <CheckCircle2 className="h-3 w-3" /> {q.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
