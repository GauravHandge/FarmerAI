"use client"

import React from "react"
import {
  X,
  User,
  Phone,
  MapPin,
  Wheat,
  LogOut,
  CheckCircle2,
  Sprout,
  ShieldCheck,
  TrendingUp,
  Activity
} from "lucide-react"
import { UserProfile } from "./auth-modal"

export function UserProfileModal({
  isOpen,
  onClose,
  profile,
  onLogout,
}: {
  isOpen: boolean
  onClose: () => void
  profile: UserProfile | null
  onLogout: () => void
}) {
  if (!isOpen) return null

  const farmerName = profile?.name || "Gaurav"
  const farmerPhone = profile?.phone || "+91 7709037059"
  const farmerState = profile?.state || "Maharashtra"
  const farmerDistrict = profile?.district || "Nashik"
  const farmerCrop = profile?.primaryCrop || "Red Onion (प्याज)"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in">
      <div className="relative w-full max-w-md rounded-3xl border border-emerald-500/30 bg-slate-900 p-6 sm:p-8 shadow-2xl overflow-hidden font-sans text-slate-100">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-slate-950 font-extrabold shadow-lg shadow-emerald-500/20">
              <User className="h-6 w-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg font-extrabold text-white">
                  {farmerName}
                </h3>
                <span className="flex items-center gap-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-extrabold">
                  <CheckCircle2 className="h-3 w-3" /> Verified Farmer
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">{farmerPhone}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Profile Details & Current Location */}
        <div className="mt-5 space-y-3">
          
          {/* Live Location Box */}
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/30 p-4 space-y-1">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 animate-bounce text-emerald-400" /> Current Live Location
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-mono">GPS Active</span>
            </div>
            <p className="font-serif text-sm font-extrabold text-white pl-5">
              {farmerDistrict} APMC Hub, {farmerState}, India
            </p>
          </div>

          {/* Primary Crop Box */}
          <div className="flex items-center justify-between rounded-2xl bg-slate-950 p-3.5 border border-slate-800">
            <div className="flex items-center gap-2.5">
              <Wheat className="h-4 w-4 text-amber-400" />
              <span className="text-xs font-bold text-slate-400">Primary Crop:</span>
            </div>
            <span className="text-xs font-extrabold text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              {farmerCrop}
            </span>
          </div>

          {/* Stats Box */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="rounded-2xl bg-slate-950 p-3 border border-slate-800 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase">AI Queries Used</span>
              <p className="font-serif font-extrabold text-lg text-emerald-400">14 Consultation Logs</p>
            </div>

            <div className="rounded-2xl bg-slate-950 p-3 border border-slate-800 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase">APMC Mandi Watch</span>
              <p className="font-serif font-extrabold text-lg text-yellow-400">Lasalgaon Hub</p>
            </div>
          </div>
        </div>

        {/* Prominent Logout Button at Bottom */}
        <div className="mt-6 pt-4 border-t border-slate-800 space-y-2">
          <button
            onClick={() => {
              onLogout()
              onClose()
            }}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold py-3.5 text-xs shadow-lg shadow-rose-600/20 transition-all border border-rose-400"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout Account (लॉगआउट करा / बाहर पड़ें)</span>
          </button>
        </div>

      </div>
    </div>
  )
}
