"use client"

import { useEffect, useState } from "react"
import { TrendingUp, TrendingDown, Minus, RefreshCw } from "lucide-react"

type MandiRate = {
  crop: string
  mandi: string
  min_price: number
  max_price: number
  modal_price: number
  trend: "up" | "down" | "stable"
}

export function MandiTicker() {
  const [rates, setRates] = useState<MandiRate[]>([])
  const [loading, setLoading] = useState(true)

  const fetchRates = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/backend/mandi-prices")
      if (res.ok) {
        const data = await res.json()
        setRates(data.rates || [])
      }
    } catch {
      // Fallback data if backend is starting
      setRates([
        { crop: "Wheat (Kanak)", mandi: "Khanna, PB", min_price: 2275, max_price: 2450, modal_price: 2380, trend: "up" },
        { crop: "Paddy (Basmati)", mandi: "Karnal, HR", min_price: 4200, max_price: 4850, modal_price: 4600, trend: "stable" },
        { crop: "Tomato", mandi: "Azadpur, DL", min_price: 1800, max_price: 2600, modal_price: 2200, trend: "up" },
        { crop: "Cotton", mandi: "Rajkot, GJ", min_price: 6800, max_price: 7400, modal_price: 7150, trend: "down" },
        { crop: "Mustard", mandi: "Bharatpur, RJ", min_price: 5300, max_price: 5750, modal_price: 5600, trend: "up" }
      ])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRates()
  }, [])

  return (
    <div className="w-full overflow-hidden border-y border-emerald-500/20 bg-emerald-950/40 backdrop-blur-md py-2 px-4 shadow-inner">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="flex items-center gap-2 shrink-0">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Live Mandi Prices
          </span>
        </div>

        <div className="flex flex-1 items-center gap-6 overflow-x-auto no-scrollbar py-1 text-xs">
          {loading ? (
            <span className="text-emerald-300/60 animate-pulse">Fetching mandi rates...</span>
          ) : (
            rates.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 shrink-0 rounded-lg bg-emerald-900/30 border border-emerald-500/10 px-3 py-1 text-emerald-100 hover:border-emerald-500/40 transition-colors"
              >
                <span className="font-semibold text-emerald-300">{item.crop}</span>
                <span className="text-emerald-400/80">₹{item.modal_price}/qtl</span>
                {item.trend === "up" && <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />}
                {item.trend === "down" && <TrendingDown className="h-3.5 w-3.5 text-rose-400" />}
                {item.trend === "stable" && <Minus className="h-3.5 w-3.5 text-amber-400" />}
              </div>
            ))
          )}
        </div>

        <button
          onClick={fetchRates}
          aria-label="Refresh mandi rates"
          className="text-emerald-400/60 hover:text-emerald-300 transition-colors shrink-0"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>
    </div>
  )
}
