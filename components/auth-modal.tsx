"use client"

import React, { useState } from "react"
import {
  X,
  User,
  Sprout,
  ArrowRight,
  Phone,
  ShieldCheck,
  CheckCircle2
} from "lucide-react"

export type UserProfile = {
  name: string
  phone: string
  role: "farmer"
  state: string
  district: string
  primaryCrop: string
}

export function AuthModal({
  isOpen,
  onClose,
  onLoginSuccess,
}: {
  isOpen: boolean
  onClose: () => void
  onLoginSuccess: (profile: UserProfile) => void
}) {
  const [farmerPhone, setFarmerPhone] = useState("")
  const [farmerName, setFarmerName] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  if (!isOpen) return null

  const handleFarmerSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!farmerPhone || farmerPhone.trim().length < 5) {
      setErrorMsg("कृपया वैध मोबाईल नंबर प्रविष्ट करा (Enter a valid mobile number)")
      return
    }
    const profile: UserProfile = {
      name: farmerName.trim() || "Gaurav Patil",
      phone: farmerPhone.trim().startsWith("+91") ? farmerPhone.trim() : `+91 ${farmerPhone.trim()}`,
      role: "farmer",
      state: "Maharashtra",
      district: "Nashik",
      primaryCrop: "Red Onion (प्याज)",
    }
    onLoginSuccess(profile)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 sm:p-9 shadow-2xl overflow-hidden font-sans text-slate-900">
        
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white font-extrabold shadow-lg shadow-blue-600/20">
              <Sprout className="h-6 w-6 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-extrabold text-slate-900 tracking-tight">
                Farmer Login
              </h3>
              <p className="text-xs text-slate-500 font-medium">शेतकरी साइन इन / साइन अप</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Feature Notice */}
        <div className="mt-5 rounded-2xl bg-blue-50/80 border border-blue-100 p-3.5 flex items-center gap-3 text-xs text-blue-900 font-medium">
          <ShieldCheck className="h-5 w-5 text-blue-600 shrink-0" />
          <span>Login to unlock AI Leaf Doctor, Real-Time Mandi Radar & personalized crop price alerts!</span>
        </div>

        {errorMsg && (
          <div className="mt-3 rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs font-bold text-rose-700 text-center">
            {errorMsg}
          </div>
        )}

        {/* Farmer Login Form */}
        <form onSubmit={handleFarmerSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Mobile Number (मोबाईल नंबर) <span className="text-rose-500">*</span>
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 flex items-center gap-1.5 text-xs font-extrabold text-slate-500 border-r border-slate-200 pr-2.5">
                <span>🇮🇳</span>
                <span>+91</span>
              </div>
              <input
                type="tel"
                value={farmerPhone}
                onChange={(e) => setFarmerPhone(e.target.value)}
                placeholder="77090 37059"
                className="w-full rounded-2xl border border-slate-300 bg-slate-50/50 pl-24 pr-4 py-3.5 text-sm text-slate-900 font-semibold focus:border-blue-600 focus:bg-white focus:outline-none transition-all shadow-sm"
                required
                autoFocus
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Farmer Name (नाव) <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={farmerName}
                onChange={(e) => setFarmerName(e.target.value)}
                placeholder="e.g. Gaurav Patil"
                className="w-full rounded-2xl border border-slate-300 bg-slate-50/50 pl-10 pr-4 py-3 text-xs text-slate-900 font-medium focus:border-blue-600 focus:bg-white focus:outline-none transition-all shadow-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 w-full flex items-center justify-center gap-2 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-extrabold py-4 text-sm shadow-xl shadow-blue-600/25 transition-all border border-blue-500"
          >
            <span>Login as Farmer (लॉगिन करा)</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-5 text-center">
          <p className="text-[11px] text-slate-400 font-medium flex items-center justify-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Government Agmarknet Verified Access
          </p>
        </div>

      </div>
    </div>
  )
}
