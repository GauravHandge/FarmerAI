"use client"

import { useState, useEffect, useRef } from "react"
import {
  X,
  Menu,
  ArrowLeft,
  Camera,
  Mic,
  Volume2,
  VolumeX,
  Search,
  Settings,
  History,
  Plus,
  Home,
  ChevronRight,
  Pencil,
  Zap,
  Info,
  User,
  Bot,
  Trash2,
  Clock,
  Sparkles
} from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface Message {
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
  dateGroup: string
  messages: Message[]
}

interface PaddiAgriAiDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function PaddiAgriAiDrawer({ isOpen, onClose }: PaddiAgriAiDrawerProps) {
  const [view, setView] = useState<"main" | "history" | "settings">("main")
  const [selectedAgent, setSelectedAgent] = useState("Agri Agent")
  const [agentMenuOpen, setAgentMenuOpen] = useState(false)

  // Chat State
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [speakingId, setSpeakingId] = useState<string | null>(null)
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  // History State
  const [chatHistory, setChatHistory] = useState<SavedChat[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  // Settings State
  const [realtimeLocation, setRealtimeLocation] = useState(true)
  const [followupSuggestions, setFollowupSuggestions] = useState(true)
  const [contextualMemory, setContextualMemory] = useState(true)
  const [userLocation, setUserLocation] = useState("Nashik APMC Hub, Maharashtra")
  const [editingLocation, setEditingLocation] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("kisan_paddi_chat_history")
    if (saved) {
      try {
        setChatHistory(JSON.parse(saved))
      } catch {}
    }
  }, [])

  // Auto scroll chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, loading])

  if (!isOpen) return null

  // Save session helper
  const saveSession = (msgs: Message[]) => {
    if (msgs.length === 0) return
    const firstUser = msgs.find((m) => m.role === "user")?.content || "Farming Advisory"
    const title = firstUser.slice(0, 35) + (firstUser.length > 35 ? "..." : "")
    const chatId = currentChatId || Date.now().toString()
    if (!currentChatId) setCurrentChatId(chatId)

    const session: SavedChat = {
      id: chatId,
      title,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      dateGroup: new Date().toLocaleDateString([], { day: "numeric", month: "long", year: "numeric" }),
      messages: msgs,
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
      localStorage.setItem("kisan_paddi_chat_history", JSON.stringify(next))
      return next
    })
  }

  // Handle Send
  const handleSend = async (customText?: string) => {
    const queryText = customText || input
    if ((!queryText.trim() && !selectedImage) || loading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: queryText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      image: imagePreview || undefined,
    }

    const updated = [...messages, userMessage]
    setMessages(updated)
    if (!customText) setInput("")
    setSelectedImage(null)
    setImagePreview(null)
    setLoading(true)

    try {
      const payload: any = {
        messages: updated.map((m) => ({ role: m.role, content: m.content })),
        language: "auto",
      }
      if (imagePreview) {
        payload.image = imagePreview
      }

      const response = await fetch("/api/agri-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        const data = await response.json()
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.reply || "I am KisanMitra AI. How can I assist your crop today?",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }
        const finalMsgs = [...updated, assistantMessage]
        setMessages(finalMsgs)
        saveSession(finalMsgs)
      }
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Operating in fast advisory mode. Mandi prices and crop advisory ready.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      const finalMsgs = [...updated, errorMessage]
      setMessages(finalMsgs)
      saveSession(finalMsgs)
    } finally {
      setLoading(false)
    }
  }

  // Delete History item
  const deleteHistoryItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setChatHistory((prev) => {
      const next = prev.filter((s) => s.id !== id)
      localStorage.setItem("kisan_paddi_chat_history", JSON.stringify(next))
      return next
    })
    if (currentChatId === id) {
      setMessages([])
      setCurrentChatId(null)
    }
  }

  // Filtered History
  const filteredHistory = chatHistory.filter((s) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[440px] bg-white border-l border-slate-200 shadow-2xl flex flex-col font-sans text-slate-900 transition-all">
      
      {/* ---------------------------------------------------- */}
      {/* 1. SCREENSHOT 1: MAIN LANDING & CHAT VIEW            */}
      {/* ---------------------------------------------------- */}
      {view === "main" && (
        <div className="flex flex-col h-full bg-slate-50/50">
          
          {/* Top Header */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-white border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setView("history")}
                className="p-1.5 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-all cursor-pointer"
                title="Open Menu & History"
              >
                <Menu className="h-5 w-5" />
              </button>

              {/* Logo + Session Title during active chat */}
              {messages.length > 0 && (
                <div className="flex items-center gap-2 max-w-[180px] truncate">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white flex items-center justify-center font-bold text-[10px] shadow-sm shrink-0">
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 truncate">
                    {messages.find((m) => m.role === "user")?.content.slice(0, 20) || "Chat"}
                  </span>
                </div>
              )}
            </div>

            {/* Header Right Actions: Home, New Chat, Close */}
            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <>
                  <button
                    onClick={() => {
                      setMessages([])
                      setCurrentChatId(null)
                    }}
                    className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-all cursor-pointer"
                    title="Go to Home"
                  >
                    <Home className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => {
                      setMessages([])
                      setCurrentChatId(null)
                    }}
                    className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-all cursor-pointer"
                    title="New Chat"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                </>
              )}

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-all cursor-pointer"
                title="Close Drawer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
            
            {messages.length === 0 ? (
              <div className="flex flex-col items-center text-center pt-8 space-y-6">
                
                {/* Hero Gradient Title (Exact Screenshot 1 Typography) */}
                <div className="space-y-1">
                  <h2 className="text-3xl font-extrabold tracking-tight">
                    <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                      Howdy Farmer,
                    </span>
                  </h2>
                  <p className="text-2xl font-bold text-slate-400">
                    I can plan your next crop!
                  </p>
                </div>

                {/* Input Card Container (Exact Screenshot 1 Input Box) */}
                <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-md p-4 space-y-3 relative text-left">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSend()
                      }
                    }}
                    placeholder="Ask me anything..."
                    className="w-full bg-transparent resize-none outline-none text-sm text-slate-800 placeholder-slate-400 min-h-[70px]"
                  />

                  {/* Toolbar Row Inside Input Box */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    
                    <div className="flex items-center gap-2">
                      {/* Image Attachment Button */}
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-all cursor-pointer"
                        title="Upload Leaf/Crop Photo"
                      >
                        <Camera className="h-4 w-4" />
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            setSelectedImage(file)
                            const r = new FileReader()
                            r.onloadend = () => setImagePreview(r.result as string)
                            r.readAsDataURL(file)
                          }
                        }}
                      />

                      {/* Agent Dropdown Pill Button */}
                      <div className="relative">
                        <button
                          onClick={() => setAgentMenuOpen(!agentMenuOpen)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-all cursor-pointer"
                        >
                          <Zap className="h-3.5 w-3.5 text-blue-600 fill-blue-600" />
                          <span>{selectedAgent}</span>
                          <span className="text-[10px] text-slate-400">▼</span>
                        </button>

                        {/* Agent Selector Dropdown */}
                        {agentMenuOpen && (
                          <div className="absolute left-0 top-full mt-1.5 w-44 bg-white rounded-2xl shadow-xl border border-slate-200 p-1.5 z-20 space-y-1">
                            {["Agri Agent", "Leaf Doctor", "Mandi Analyst", "Soil Expert"].map((agent) => (
                              <button
                                key={agent}
                                onClick={() => {
                                  setSelectedAgent(agent)
                                  setAgentMenuOpen(false)
                                }}
                                className={`w-full text-left px-3 py-2 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                                  selectedAgent === agent
                                    ? "bg-blue-50 text-blue-600 font-bold"
                                    : "text-slate-600 hover:bg-slate-100"
                                }`}
                              >
                                {agent}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right Side: Mic & Gradient Audio Button */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSend("Describe current tomato disease treatment")}
                        className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-all cursor-pointer"
                        title="Voice Input"
                      >
                        <Mic className="h-4 w-4" />
                      </button>

                      {/* Dynamic Purple/Indigo Gradient Button */}
                      <button
                        onClick={() => handleSend()}
                        className="flex items-center justify-center h-9 w-9 rounded-2xl bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white shadow-md hover:opacity-90 transition-all cursor-pointer"
                        title="Send Message"
                      >
                        <Sparkles className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {imagePreview && (
                    <div className="pt-2">
                      <img src={imagePreview} alt="Selected" className="h-16 rounded-xl object-cover border border-slate-200" />
                    </div>
                  )}
                </div>

                {/* Terms Disclaimer */}
                <p className="text-[11px] text-slate-400">
                  By using KisanMitra AI, you agree to our{" "}
                  <span className="underline cursor-pointer hover:text-slate-600">Terms</span> and{" "}
                  <span className="underline cursor-pointer hover:text-slate-600">Privacy policy</span>.
                </p>

                {/* Quick Action Pill Buttons (Exact Screenshot 1) */}
                <div className="w-full space-y-2.5 pt-4">
                  <button
                    onClick={() => handleSend("What can KisanMitra AI do for my farm?")}
                    className="flex items-center gap-2.5 w-full bg-white border border-slate-200 rounded-full px-4 py-3 text-xs font-semibold text-slate-600 hover:border-slate-300 hover:bg-slate-100 shadow-sm transition-all text-left cursor-pointer"
                  >
                    <Info className="h-4 w-4 text-slate-400 shrink-0" />
                    <span>See what your KisanMitra can do for you</span>
                  </button>

                  <button
                    onClick={() => setView("history")}
                    className="flex items-center gap-2.5 w-full bg-white border border-slate-200 rounded-full px-4 py-3 text-xs font-semibold text-slate-600 hover:border-slate-300 hover:bg-slate-100 shadow-sm transition-all text-left cursor-pointer"
                  >
                    <History className="h-4 w-4 text-slate-400 shrink-0" />
                    <span>See your chat history</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Active Conversation Message List (Matching Latest User Screenshot) */
              <div ref={scrollRef} className="space-y-6 pt-2">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
                  >
                    {m.role === "user" ? (
                      /* User Message Bubble (ChatGPT Style Image & Bubble) */
                      <div className="space-y-1.5 max-w-[85%] text-right ml-auto">
                        {m.image && (
                          <div className="inline-block overflow-hidden rounded-2xl border border-slate-200 shadow-sm bg-slate-100 p-1">
                            <img src={m.image} alt="User Upload" className="max-h-60 max-w-full object-cover rounded-xl" />
                          </div>
                        )}
                        {m.content && (
                          <div>
                            <div className="inline-block bg-slate-100 text-slate-800 text-xs font-medium px-4 py-2.5 rounded-2xl rounded-tr-none shadow-xs">
                              {m.content}
                            </div>
                          </div>
                        )}
                        {/* Copy & Edit Action Icons under User Bubble */}
                        <div className="flex items-center justify-end gap-2 text-slate-400 text-[11px] pr-1">
                          <button
                            onClick={() => navigator.clipboard.writeText(m.content)}
                            className="hover:text-slate-600 p-0.5 cursor-pointer"
                            title="Copy text"
                          >
                            📋
                          </button>
                          <button
                            onClick={() => setInput(m.content)}
                            className="hover:text-slate-600 p-0.5 cursor-pointer"
                            title="Edit prompt"
                          >
                            ✏️
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Assistant Message Bubble with Gradient AI Icon */
                      <div className="flex items-start gap-3 max-w-[95%] w-full min-w-0">
                        <div className="h-7 w-7 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white flex items-center justify-center font-bold shadow-sm shrink-0 mt-0.5">
                          <Sparkles className="h-3.5 w-3.5" />
                        </div>
                        <div className="text-xs text-slate-800 leading-relaxed space-y-2 pt-0.5 flex-1 min-w-0 overflow-hidden">
                          {m.image && <img src={m.image} alt="User Upload" className="mb-2 rounded-2xl max-h-36 object-cover" />}
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              h1: ({ node, ...props }) => <h1 className="text-sm font-bold text-slate-900 mt-4 mb-2 pb-1 border-b border-slate-200" {...props} />,
                              h2: ({ node, ...props }) => <h2 className="text-xs font-bold text-slate-800 mt-3 mb-1.5" {...props} />,
                              h3: ({ node, ...props }) => <h3 className="text-xs font-semibold text-purple-700 mt-2.5 mb-1" {...props} />,
                              p: ({ node, ...props }) => <p className="mb-2.5 leading-relaxed text-slate-700" {...props} />,
                              ul: ({ node, ...props }) => <ul className="list-disc pl-4 space-y-1.5 mb-3 text-slate-700" {...props} />,
                              ol: ({ node, ...props }) => <ol className="list-decimal pl-4 space-y-1.5 mb-3 text-slate-700" {...props} />,
                              li: ({ node, ...props }) => <li className="leading-relaxed pl-0.5" {...props} />,
                              strong: ({ node, ...props }) => <strong className="font-semibold text-slate-900 bg-slate-100/90 px-1 py-0.5 rounded text-[11px]" {...props} />,
                              blockquote: ({ node, ...props }) => <blockquote className="border-l-3 border-purple-500 pl-3 py-1.5 my-2.5 text-slate-600 bg-purple-50/60 rounded-r-xl text-[11px]" {...props} />,
                              table: ({ node, ...props }) => (
                                <div className="overflow-x-auto max-w-full my-3 rounded-2xl border border-slate-200 shadow-xs bg-white">
                                  <table className="w-full divide-y divide-slate-200 text-xs text-left" {...props} />
                                </div>
                              ),
                              thead: ({ node, ...props }) => <thead className="bg-slate-100/90 text-slate-800 font-semibold" {...props} />,
                              th: ({ node, ...props }) => <th className="px-3 py-2 border-b border-slate-200 font-semibold text-slate-900" {...props} />,
                              td: ({ node, ...props }) => <td className="px-3 py-2 border-b border-slate-100 align-top text-slate-700 leading-normal" {...props} />,
                            }}
                          >
                            {m.content
                              .replaceAll("<br>", "\n")
                              .replaceAll("<br/>", "\n")
                              .replaceAll("<br />", "\n")
                              .replaceAll("| |", "\n\n")
                              .replaceAll("||", "\n\n")}
                          </ReactMarkdown>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {loading && (
                  <div className="flex items-center gap-2 text-xs text-slate-400 animate-pulse">
                    <Sparkles className="h-4 w-4 text-purple-600 animate-spin" />
                    <span>KisanMitra AI processing...</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bottom Sticky Input Card Box (Matches Latest Screenshot Input) */}
          {messages.length > 0 && (
            <div className="p-4 bg-white border-t border-slate-100">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-3 space-y-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSend()
                    }
                  }}
                  placeholder="Ask me anything..."
                  className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 outline-none"
                />

                <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 cursor-pointer"
                    >
                      <Camera className="h-4 w-4" />
                    </button>
                    <div className="relative">
                      <button
                        onClick={() => setAgentMenuOpen(!agentMenuOpen)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-semibold text-slate-700 hover:bg-slate-200 cursor-pointer"
                      >
                        <Zap className="h-3 w-3 text-blue-600 fill-blue-600" />
                        <span>{selectedAgent}</span>
                        <span className="text-[9px] text-slate-400">▼</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleSend()}
                      className="flex items-center justify-center h-8 w-8 rounded-2xl bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white shadow-md hover:opacity-90 cursor-pointer"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 2. SCREENSHOT 2: CHAT HISTORY & SEARCH VIEW         */}
      {/* ---------------------------------------------------- */}
      {view === "history" && (
        <div className="flex flex-col h-full bg-white">
          
          {/* Top Bar with Home & + New Chat Pill (Exact Screenshot 2) */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <button
              onClick={() => setView("main")}
              className="p-2 text-slate-500 hover:bg-slate-100 rounded-xl cursor-pointer"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            {/* Home Pill + New Chat Solid Blue Pill */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setView("main")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-600 text-xs font-bold hover:bg-blue-100 cursor-pointer"
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </button>

              <button
                onClick={() => {
                  setMessages([])
                  setCurrentChatId(null)
                  setView("main")
                }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-md cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>New chat</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:bg-slate-100 rounded-xl cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
            
            {/* Search Bar (Exact Screenshot 2) */}
            <div className="relative">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 shadow-sm"
              />
            </div>

            {/* Date Grouped History Sessions */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-2">
                29 July 2026 / Today
              </h4>

              {filteredHistory.length === 0 ? (
                <div className="py-8 text-center space-y-2">
                  <Clock className="h-8 w-8 text-slate-300 mx-auto" />
                  <p className="text-xs text-slate-400">No saved history sessions found.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredHistory.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => {
                        setMessages(s.messages)
                        setCurrentChatId(s.id)
                        setView("main")
                      }}
                      className="group flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all cursor-pointer"
                    >
                      <div className="truncate">
                        <p className="text-xs font-bold text-slate-800 truncate group-hover:text-blue-600">
                          {s.title}
                        </p>
                        <p className="text-[10px] text-slate-400">{s.timestamp}</p>
                      </div>

                      <button
                        onClick={(e) => deleteHistoryItem(s.id, e)}
                        className="text-slate-300 hover:text-rose-500 p-1 opacity-0 group-hover:opacity-100 transition-all"
                        title="Delete Chat"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bottom Settings Button Card (Exact Screenshot 2) */}
          <div className="p-4 bg-slate-50 border-t border-slate-100">
            <button
              onClick={() => setView("settings")}
              className="flex items-center gap-3 w-full bg-white border border-slate-200 rounded-2xl p-3.5 text-xs font-bold text-slate-700 hover:bg-slate-100 shadow-sm transition-all cursor-pointer"
            >
              <Settings className="h-4 w-4 text-slate-500" />
              <span>Settings</span>
            </button>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 3. SCREENSHOT 3: SETTINGS & CONTEXTUAL MEMORY VIEW   */}
      {/* ---------------------------------------------------- */}
      {view === "settings" && (
        <div className="flex flex-col h-full bg-slate-50/50">
          
          {/* Top Bar */}
          <div className="flex items-center justify-between px-5 py-4 bg-white border-b border-slate-100">
            <button
              onClick={() => setView("history")}
              className="p-2 text-slate-500 hover:bg-slate-100 rounded-xl cursor-pointer"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h3 className="text-sm font-bold text-slate-900">Settings</h3>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:bg-slate-100 rounded-xl cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Settings Options Body (Exact Screenshot 3 Cards) */}
          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
            
            {/* Section 1: Privacy & Location */}
            <div className="space-y-2">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
                Privacy & Location
              </h4>

              <div className="bg-white rounded-3xl border border-slate-200 p-4 space-y-4 shadow-sm">
                
                {/* Location Display */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <p className="text-xs font-bold text-slate-800">Location</p>
                    <p className="text-[11px] text-slate-400 truncate max-w-[240px]">{userLocation}</p>
                  </div>
                  <button
                    onClick={() => setEditingLocation(!editingLocation)}
                    className="p-1.5 text-slate-400 hover:text-blue-600 rounded-xl cursor-pointer"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Toggle: Use Real-Time Location Access */}
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5 pr-2">
                    <p className="text-xs font-bold text-slate-800">Use real-time location access</p>
                    <p className="text-[10px] text-slate-400 leading-normal">
                      Enable/disable sharing real-time device location.
                    </p>
                  </div>
                  <button
                    onClick={() => setRealtimeLocation(!realtimeLocation)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                      realtimeLocation ? "bg-blue-600" : "bg-slate-200"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        realtimeLocation ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Section 2: AI Preferences */}
            <div className="space-y-2">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
                AI Preferences
              </h4>

              <div className="bg-white rounded-3xl border border-slate-200 p-4 space-y-4 shadow-sm">
                
                {/* Toggle: Follow-up Suggestions */}
                <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                  <div className="space-y-0.5 pr-2">
                    <p className="text-xs font-bold text-slate-800">Follow-up suggestions</p>
                    <p className="text-[10px] text-slate-400 leading-normal">
                      Turn smart suggested follow-ups on/off.
                    </p>
                  </div>
                  <button
                    onClick={() => setFollowupSuggestions(!followupSuggestions)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                      followupSuggestions ? "bg-blue-600" : "bg-slate-200"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        followupSuggestions ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* Contextual Memory Settings Link */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 cursor-pointer group">
                  <div>
                    <p className="text-xs font-bold text-slate-800 group-hover:text-blue-600">
                      Contextual memory
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </div>

                {/* KisanMitra Tone & Style Link */}
                <div className="flex items-center justify-between cursor-pointer group">
                  <div>
                    <p className="text-xs font-bold text-slate-800 group-hover:text-blue-600">
                      KisanMitra AI tone & style
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </div>
              </div>
            </div>

            {/* Section 3: Legal & Transparency */}
            <div className="space-y-2">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
                Legal & Transparency
              </h4>

              <div className="bg-white rounded-3xl border border-slate-200 p-4 space-y-3 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 cursor-pointer group">
                  <p className="text-xs font-bold text-slate-800 group-hover:text-blue-600">Terms & conditions</p>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </div>
                <div className="flex items-center justify-between cursor-pointer group">
                  <p className="text-xs font-bold text-slate-800 group-hover:text-blue-600">Privacy policy</p>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
