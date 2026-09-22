"use client"

import { useState, useRef, useEffect } from "react"
import {
  Sprout,
  Send,
  Paperclip,
  Volume2,
  VolumeX,
  Stethoscope,
  Globe,
  Zap,
  Sparkles,
  ArrowRight,
  Bot,
  User,
  ShieldCheck,
  LayoutDashboard,
  X,
  MessageSquare,
  ShoppingBag,
  Award,
  Calculator,
  Search,
  MapPin,
  Plus,
  History,
  Trash2,
  Clock
} from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { LeftDashboard } from "./left-dashboard"
import { CropDiagModal } from "./crop-diag-modal"
import { VoiceRecorder } from "./voice-recorder"
import { AgriStateExplorer } from "./agri-state-explorer"
import { AgriMarketplace } from "./agri-marketplace"
import { FarmerGuestLanding } from "./farmer-guest-landing"
import { MandiRatesModal } from "./mandi-rates-modal"
import { AuthModal, UserProfile } from "./auth-modal"
import { UserProfileModal } from "./user-profile-modal"
import { AgriAdminDashboard } from "./agri-admin-dashboard"
import { PaddiAgriAiDrawer } from "./paddi-agri-ai-drawer"
import { LANGUAGES, Language } from "@/lib/i18n"
import { LanguageProvider, useLanguage } from "@/context/language-context"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
  image?: string
}

interface SavedChat {
  id: string
  title: string
  timestamp: string
  messages: Message[]
}

const SUGGESTIONS = [
  { emoji: "🌾", text: "My wheat crop leaves have yellow rust spots. What treatment should I apply?" },
  { emoji: "🌦️", text: "What is the best sowing window for Paddy & Basmati this season?" },
  { emoji: "💰", text: "When is the optimal time to sell my Tomato crop for maximum mandi profit?" },
  { emoji: "🐛", text: "How to control aphids and bollworms on cotton naturally?" },
]

function Kisan3DAppContent() {
  const { lang, setLang, t } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [language, setLanguage] = useState("Hindi / English")
  const [diagModalOpen, setDiagModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"marketplace" | "split" | "explorer">("marketplace")
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false)
  const [mandiModalOpen, setMandiModalOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [profileModalOpen, setProfileModalOpen] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)

  // 📜 Persistent Chat History & Memory Window State
  const [historyOpen, setHistoryOpen] = useState(false)
  const [chatHistory, setChatHistory] = useState<SavedChat[]>([])
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)

  const scrollRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const saved = localStorage.getItem("kisan_chat_history")
    if (saved) {
      try {
        setChatHistory(JSON.parse(saved))
      } catch {}
    }
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, loading])

  const saveActiveSession = (updatedMsgs: Message[], forceId?: string) => {
    if (updatedMsgs.length === 0) return
    const firstUserMsg = updatedMsgs.find((m) => m.role === "user")?.content || "Agri Advisory Chat"
    const title = firstUserMsg.slice(0, 40) + (firstUserMsg.length > 40 ? "..." : "")
    const chatId = forceId || currentChatId || Date.now().toString()
    if (!currentChatId) setCurrentChatId(chatId)

    const session: SavedChat = {
      id: chatId,
      title,
      timestamp: new Date().toLocaleDateString([], { month: "short", day: "numeric" }) + " • " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      messages: updatedMsgs,
    }

    setChatHistory((prev) => {
      const idx = prev.findIndex((s) => s.id === chatId)
      let next: SavedChat[]
      if (idx >= 0) {
        next = [...prev]
        next[idx] = session
      } else {
        next = [session, ...prev]
      }
      localStorage.setItem("kisan_chat_history", JSON.stringify(next))
      return next
    })
  }

  const deleteSavedChat = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setChatHistory((prev) => {
      const next = prev.filter((s) => s.id !== id)
      localStorage.setItem("kisan_chat_history", JSON.stringify(next))
      return next
    })
    if (currentChatId === id) {
      setMessages([])
      setCurrentChatId(null)
    }
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSend = async (customText?: string) => {
    const queryText = customText || input
    if ((!queryText.trim() && !selectedImage) || loading) return

    setAiDrawerOpen(true) // Open slide-over AI assistant drawer automatically

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: queryText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      image: imagePreview || undefined,
    }

    setMessages((prev) => [...prev, userMessage])
    if (!customText) setInput("")
    setSelectedImage(null)
    setImagePreview(null)
    setLoading(true)

    try {
      const response = await fetch("/api/backend/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          language,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.reply || "Sorry, I couldn't generate a response. Please try again.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }
        const updated = [...messages, userMessage, assistantMessage]
        setMessages(updated)
        saveActiveSession(updated)
      } else {
        throw new Error("API Error")
      }
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Network or Server issue. Operating in offline advisory mode: Lasalgaon Onion is ₹2,250/qtl ▲, Unjha Cumin is ₹27,500/qtl ▲.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      const updated = [...messages, userMessage, errorMessage]
      setMessages(updated)
      saveActiveSession(updated)
    } finally {
      setLoading(false)
    }
  }

  const toggleTTS = (id: string, text: string) => {
    if (speakingMsgId === id) {
      window.speechSynthesis.cancel()
      setSpeakingMsgId(null)
    } else {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text.replace(/[*#]/g, ""))
      utterance.rate = 0.95
      utterance.onend = () => setSpeakingMsgId(null)
      window.speechSynthesis.speak(utterance)
      setSpeakingMsgId(id)
    }
  }

  const requireAuth = (action: () => void) => {
    if (userProfile) {
      action()
    } else {
      setAuthModalOpen(true)
    }
  }

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-slate-900 text-slate-100 font-sans selection:bg-yellow-400 selection:text-slate-950">
      
      {/* Top Header Bar */}
      <header className="relative z-40 flex items-center justify-between border-b border-blue-600/30 bg-blue-600 px-4 py-2.5 shadow-xl text-white">
        
        {/* Brand Title */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-400 text-slate-950 font-extrabold shadow-md">
            <Sprout className="h-5 w-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-xl font-extrabold tracking-tight text-white drop-shadow-sm">
                Kisan<span className="text-yellow-300">Mitra</span>
              </h1>
              <button
                onClick={() => requireAuth(() => setMandiModalOpen(true))}
                className="hidden md:flex items-center gap-1 rounded-full bg-yellow-400 text-slate-950 px-2.5 py-0.5 text-[10px] font-extrabold hover:bg-yellow-300 transition-all shadow-sm"
              >
                <Zap className="h-3 w-3 fill-slate-950" /> Agmarknet Live
              </button>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Language Selector */}
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="appearance-none rounded-xl border border-blue-500 bg-blue-700/80 px-3 py-1.5 pr-7 text-xs font-bold text-white shadow-sm focus:border-yellow-400 focus:outline-none cursor-pointer"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.name} className="bg-slate-900 text-white">
                  {lang.flag} {lang.name} ({lang.nativeName})
                </option>
              ))}
            </select>
            <Globe className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-blue-200" />
          </div>

          {/* View Mode Switches */}
          <div className="hidden sm:flex items-center gap-1 rounded-xl bg-blue-800/80 p-1 border border-blue-500/50">
            <button
              onClick={() => setViewMode("marketplace")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all ${
                viewMode === "marketplace"
                  ? "bg-yellow-400 text-slate-950 font-extrabold shadow-md"
                  : "text-blue-100 hover:text-white"
              }`}
            >
              <ShoppingBag className="h-3.5 w-3.5" /> {t("marketPortal")}
            </button>
            <button
              onClick={() => setViewMode("split")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all ${
                viewMode === "split"
                  ? "bg-yellow-400 text-slate-950 font-extrabold shadow-md"
                  : "text-blue-100 hover:text-white"
              }`}
            >
              <LayoutDashboard className="h-3.5 w-3.5" /> {t("workbench")}
            </button>
            <button
              onClick={() => setViewMode("explorer")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all ${
                viewMode === "explorer"
                  ? "bg-yellow-400 text-slate-950 font-extrabold shadow-md"
                  : "text-blue-100 hover:text-white"
              }`}
            >
              <Award className="h-3.5 w-3.5" /> {t("stateCrops")}
            </button>
          </div>

          {/* User Auth Login / Profile Button */}
          {userProfile ? (
            <button
              onClick={() => setProfileModalOpen(true)}
              className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 border border-emerald-400 px-3.5 py-1.5 text-xs font-extrabold text-white transition-all shadow-md cursor-pointer"
            >
              <User className="h-4 w-4 text-yellow-300" />
              <span>{userProfile.name.split(" ")[0]}</span>
            </button>
          ) : (
            <button
              onClick={() => setAuthModalOpen(true)}
              className="flex items-center gap-1.5 rounded-xl bg-blue-700 hover:bg-blue-800 border border-blue-500 px-3 py-1.5 text-xs font-extrabold text-white transition-all shadow-sm cursor-pointer"
            >
              <User className="h-4 w-4 text-yellow-300" />
              <span className="hidden sm:inline">Login (लॉगिन)</span>
            </button>
          )}

          {/* AI Leaf Doctor Trigger (Requires Auth) */}
          <button
            onClick={() => requireAuth(() => setDiagModalOpen(true))}
            className="flex items-center gap-1.5 rounded-xl bg-rose-600 px-3 py-1.5 text-xs font-extrabold text-white hover:bg-rose-700 transition-all shadow-md cursor-pointer"
          >
            <Stethoscope className="h-4 w-4" />
            <span className="hidden sm:inline">{t("leafDoctor")}</span>
          </button>

          {/* Floating AI Assistant Drawer Toggle (Requires Auth) */}
          <button
            onClick={() => requireAuth(() => setAiDrawerOpen(!aiDrawerOpen))}
            className="flex items-center gap-1.5 rounded-xl bg-yellow-400 px-3.5 py-1.5 text-xs font-extrabold text-slate-950 shadow-md hover:bg-yellow-300 transition-all cursor-pointer"
          >
            <Bot className="h-4 w-4" />
            <span>{t("aiAssistant")}</span>
          </button>
        </div>
      </header>

      {/* Main Canvas View */}
      <main className="relative z-10 flex-1 overflow-y-auto bg-slate-100">
        {viewMode === "split" ? (
          <div className="flex h-full p-4 gap-4 overflow-hidden">
            <aside className="w-full lg:w-[40%] h-full overflow-y-auto">
              <LeftDashboard
                onOpenLeafDoctor={() => setDiagModalOpen(true)}
                onQuickAsk={(text) => handleSend(text)}
              />
            </aside>
            <section className="hidden lg:block lg:w-[60%] h-full overflow-y-auto">
              <AgriStateExplorer
                onQuickAsk={(text) => handleSend(text)}
                onOpenLeafDoctor={() => setDiagModalOpen(true)}
              />
            </section>
          </div>
        ) : viewMode === "explorer" ? (
          <div className="p-4 max-w-7xl mx-auto">
            <AgriStateExplorer
              onQuickAsk={(text) => handleSend(text)}
              onOpenLeafDoctor={() => setDiagModalOpen(true)}
            />
          </div>
        ) : userProfile ? (
          <AgriMarketplace
            onAskAI={(prompt) => handleSend(prompt)}
            onOpenLeafDoctor={() => setDiagModalOpen(true)}
          />
        ) : (
          <FarmerGuestLanding
            onOpenLogin={() => setAuthModalOpen(true)}
            onOpenLeafDoctor={() => setDiagModalOpen(true)}
          />
        )}
      </main>

      {/* 🤖 Paddi AI Ultra-Modern Clean White Glass Assistant Drawer */}
      <PaddiAgriAiDrawer isOpen={aiDrawerOpen} onClose={() => setAiDrawerOpen(false)} />

      {/* 📈 Floating Mandi Radar Action Button at Bottom-Left Corner */}
      <button
        onClick={() => requireAuth(() => setMandiModalOpen(true))}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 px-5 py-3.5 text-white font-extrabold shadow-2xl hover:scale-105 transition-all border-2 border-yellow-400 cursor-pointer"
        title="Open Real-Time Mandi Rates & Analytics"
      >
        <Zap className="h-5 w-5 text-yellow-300 fill-yellow-300 animate-pulse" />
        <span className="text-xs tracking-wide">Real-Time Mandi Radar</span>
      </button>

      {/* 🤖 Floating Action Button (FAB) at Bottom-Right Corner */}
      {!aiDrawerOpen && (
        <button
          onClick={() => requireAuth(() => setAiDrawerOpen(true))}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 px-5 py-3.5 text-slate-950 font-extrabold shadow-2xl shadow-emerald-500/50 hover:scale-105 hover:brightness-110 transition-all border-2 border-emerald-300 animate-bounce cursor-pointer"
          title="Open KisanMitra AI Assistant"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-950"></span>
          </span>
          <Bot className="h-5 w-5" />
          <span className="text-xs tracking-wide">Ask KisanMitra AI</span>
        </button>
      )}

      {/* Diagnostic Modal */}
      <CropDiagModal isOpen={diagModalOpen} onClose={() => setDiagModalOpen(false)} />

      {/* Real-Time Agmarknet Mandi Rates Modal */}
      <MandiRatesModal
        isOpen={mandiModalOpen}
        onClose={() => setMandiModalOpen(false)}
        onAskAI={(prompt) => handleSend(prompt)}
      />

      {/* Farmer Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={(profile) => {
          setUserProfile(profile)
        }}
      />

      {/* Logged-In Farmer Profile & Logout Modal */}
      <UserProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        profile={userProfile}
        onLogout={() => {
          setUserProfile(null)
          setViewMode("marketplace")
        }}
      />
    </div>
  )
}

export function Kisan3DApp() {
  return (
    <LanguageProvider>
      <Kisan3DAppContent />
    </LanguageProvider>
  )
}

