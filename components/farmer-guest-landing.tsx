"use client"

import React from "react"
import {
  Sprout,
  ShieldCheck,
  Zap,
  Stethoscope,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Lock,
  Globe,
  Radio
} from "lucide-react"

export function FarmerGuestLanding({
  onOpenLogin,
  onOpenLeafDoctor,
}: {
  onOpenLogin: () => void
  onOpenLeafDoctor: () => void
}) {
  return (
    <div className="w-full min-h-screen bg-slate-900 text-slate-100 font-sans p-4 sm:p-8 space-y-8">
      
      {/* 🚀 Hero Welcome Banner for Pre-Login Guests */}
      <div className="relative overflow-hidden rounded-3xl border border-blue-500/30 bg-gradient-to-br from-blue-950 via-slate-900 to-emerald-950 p-8 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-emerald-500/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-yellow-400/20 text-yellow-300 border border-yellow-400/30 px-3.5 py-1 text-xs font-extrabold backdrop-blur-md">
            <Sparkles className="h-4 w-4" /> INDIA'S #1 AI FARMER ADVISORY & APMC RADAR
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Empowering Every Farmer with <span className="text-yellow-400">Real-Time Mandi Intelligence</span> & 120B AI Vision
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
            Welcome to KisanMitra. Access verified Agmarknet APMC rates, diagnose crop diseases instantly with AI vision, and get expert advisory in Marathi, Hindi, English, Punjabi & Gujarati.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-2 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-extrabold px-6 py-4 text-sm shadow-xl shadow-yellow-400/20 transition-all border border-yellow-300 scale-105 hover:scale-110"
            >
              <span>🔑 Login / Register as Farmer (शेतकरी लॉगिन)</span>
              <ArrowRight className="h-5 w-5" />
            </button>

            <button
              onClick={onOpenLeafDoctor}
              className="flex items-center gap-2 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold px-6 py-4 text-sm shadow-xl shadow-rose-600/20 transition-all border border-rose-400"
            >
              <Stethoscope className="h-5 w-5" />
              <span>Free Crop Disease Diagnosis (पाने डॉक्टर)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 📊 3 Core Platform Capabilities for Guests */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 space-y-3 shadow-xl hover:border-yellow-400/50 transition-all">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400/20 text-yellow-400 border border-yellow-400/30">
            <TrendingUp className="h-6 w-6" />
          </div>
          <h3 className="font-serif font-extrabold text-lg text-white">Live APMC Mandi Rates</h3>
          <p className="text-xs text-slate-400">
            Real-time daily modal prices from Lasalgaon, Unjha, Kolar, Khanna, and 50+ national APMC mandis.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 space-y-3 shadow-xl hover:border-rose-500/50 transition-all">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
            <Stethoscope className="h-6 w-6" />
          </div>
          <h3 className="font-serif font-extrabold text-lg text-white">AI Crop Leaf Diagnostics</h3>
          <p className="text-xs text-slate-400">
            Upload leaf photo to detect fungal infections, leaf curl, yellow vein virus & get instant remedy.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 space-y-3 shadow-xl hover:border-blue-500/50 transition-all">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
            <Globe className="h-6 w-6" />
          </div>
          <h3 className="font-serif font-extrabold text-lg text-white">Multi-Language Voice & Text</h3>
          <p className="text-xs text-slate-400">
            Communicate in Marathi, Hindi, English, Gujarati, or Punjabi with regional dialect AI models.
          </p>
        </div>

      </div>

      {/* Login Prompt Banner at Bottom */}
      <div className="rounded-3xl border border-emerald-500/30 bg-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Radio className="h-6 w-6 animate-pulse" />
          </div>
          <div>
            <h4 className="font-serif font-extrabold text-base text-white">Ready to personalize your Mandi Advisory?</h4>
            <p className="text-xs text-slate-400">Login with your mobile number to get custom price alerts for your state & crop.</p>
          </div>
        </div>

        <button
          onClick={onOpenLogin}
          className="shrink-0 flex items-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-5 py-3 text-xs shadow-lg transition-all"
        >
          <span>Login to Unlock Full Dashboard</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

    </div>
  )
}
