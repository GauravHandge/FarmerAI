"use client"

import React, { useState, useEffect } from "react"
import {
  ShieldCheck,
  Lock,
  Mail,
  KeyRound,
  ArrowRight,
  Sprout,
  LogOut,
  Radio,
  CheckCircle2,
  AlertCircle
} from "lucide-react"
import { AgriAdminDashboard } from "@/components/agri-admin-dashboard"
import Link from "next/link"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState("admin@kisanmitra.gov.in")
  const [password, setPassword] = useState("admin123")
  const [errorMsg, setErrorMsg] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Check if session token exists
    const token = localStorage.getItem("kisan_admin_token")
    if (token === "authenticated_master_admin") {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg("")

    setTimeout(() => {
      if (email === "admin@kisanmitra.gov.in" && password === "admin123") {
        localStorage.setItem("kisan_admin_token", "authenticated_master_admin")
        setIsAuthenticated(true)
      } else {
        setErrorMsg("Invalid Credentials. Default Demo: admin@kisanmitra.gov.in / admin123")
      }
      setLoading(false)
    }, 600)
  }

  const handleLogout = () => {
    localStorage.removeItem("kisan_admin_token")
    setIsAuthenticated(false)
  }

  // 1. Authenticated Master Admin Command Center View
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
        {/* Admin Top Navigation Bar */}
        <header className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-800 bg-slate-950/90 backdrop-blur-md px-6 py-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400 text-slate-950 font-extrabold shadow-md">
              <Sprout className="h-6 w-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-lg font-extrabold text-white">
                  Kisan<span className="text-yellow-400">Mitra Admin OS</span>
                </h2>
                <span className="rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-extrabold flex items-center gap-1">
                  <Radio className="h-2.5 w-2.5 animate-pulse" /> Live System
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">National APMC & AI Advisory Control Center</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-bold text-slate-300 hover:bg-slate-700 transition-all"
            >
              🌐 Back to Farmer Portal
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-xl bg-rose-600/20 text-rose-300 border border-rose-500/30 px-3.5 py-2 text-xs font-bold hover:bg-rose-600 hover:text-white transition-all"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Main Dashboard Canvas */}
        <main className="flex-1 overflow-y-auto">
          <AgriAdminDashboard />
        </main>
      </div>
    )
  }

  // 2. Unauthenticated Dedicated Admin Portal Login Screen
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 font-sans text-slate-100">
      
      {/* Glow Effect Background Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-yellow-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/90 backdrop-blur-xl p-8 shadow-2xl space-y-6">
        
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400 text-slate-950 font-extrabold shadow-xl shadow-yellow-400/20">
            <ShieldCheck className="h-8 w-8 stroke-[2.5]" />
          </div>
          <h1 className="font-serif text-2xl font-extrabold text-white tracking-tight">
            KisanMitra Master Admin Portal
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            Ministry of Agriculture & Agmarknet APMC Command Center
          </p>
        </div>

        {/* Security Alert Note */}
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs text-amber-200 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-amber-300">
            <Lock className="h-4 w-4" /> Restricted Access System
          </div>
          <p className="text-[11px] opacity-90">
            Authorized APMC Officials & Agricultural Analysts only.
          </p>
        </div>

        {errorMsg && (
          <div className="flex items-center gap-2 rounded-xl bg-rose-500/20 border border-rose-500/40 p-3 text-xs font-bold text-rose-300">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Official Admin Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@kisanmitra.gov.in"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:border-yellow-400 focus:outline-none font-medium transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Security Password</label>
            <div className="relative">
              <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:border-yellow-400 focus:outline-none font-medium transition-all"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-extrabold py-3.5 text-xs shadow-lg shadow-yellow-400/20 transition-all border border-yellow-300"
          >
            <span>{loading ? "Authenticating..." : "Unlock Admin OS Command Center"}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Quick Demo Help */}
        <div className="pt-2 border-t border-slate-800 text-center">
          <p className="text-[11px] text-slate-500 font-mono">
            Demo Email: <span className="text-yellow-400">admin@kisanmitra.gov.in</span> | Pass: <span className="text-yellow-400">admin123</span>
          </p>
          <div className="mt-3">
            <Link href="/" className="text-xs text-blue-400 hover:underline font-bold">
              ← Return to KisanMitra Marketplace
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
