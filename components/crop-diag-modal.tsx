"use client"

import { useState } from "react"
import { Stethoscope, X, Loader2, Sparkles, RefreshCw, FileText, ArrowLeft } from "lucide-react"
import { MarkdownRenderer } from "@/components/markdown-renderer"

export function CropDiagModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [cropName, setCropName] = useState("")
  const [symptoms, setSymptoms] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  if (!isOpen) return null

  const handleAnalyze = async () => {
    if (!symptoms.trim()) return
    setLoading(true)
    setResult(null)

    try {
      const res = await fetch("/api/backend/analyze-crop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          crop_name: cropName || "General Crop",
          symptoms: symptoms,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        setResult(data.diagnosis)
      } else {
        setResult("Could not process diagnostic request. Please ensure the Python FastAPI backend is running.")
      }
    } catch {
      setResult("Diagnosis network error. Please verify backend connection.")
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setResult(null)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-2xl p-3 sm:p-6 animate-in fade-in">
      <div className="relative flex flex-col w-full max-w-4xl h-[88vh] rounded-3xl border border-emerald-500/30 bg-slate-950/95 text-emerald-50 shadow-2xl shadow-emerald-950/80 overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-emerald-500/20 px-6 py-4 bg-emerald-950/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-slate-950 shadow-lg shadow-emerald-500/30">
              <Stethoscope className="h-6 w-6 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-emerald-300">
                AI Crop & Leaf Doctor
              </h2>
              <p className="text-xs text-emerald-400/80">
                Powered by Groq 120B AI • Precision Plant Pathology & Remedy Engine
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {result && (
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-950/60 px-3.5 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-900/50 transition-all"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>New Diagnosis</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="rounded-full p-2 text-emerald-400 hover:bg-emerald-900/40 hover:text-emerald-200 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {!result ? (
            /* Input Form Mode */
            <div className="max-w-2xl mx-auto space-y-6 py-4">
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-4 text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
                🌾 <strong>How it works:</strong> Type your crop name and describe the leaf color, spots, or damage symptoms. Groq 120B AI will generate a complete diagnostic report with biological & chemical remedies in formatted tables.
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-emerald-300 mb-1.5">
                    Crop Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Tomato, Wheat, Paddy, Cotton, Mustard"
                    value={cropName}
                    onChange={(e) => setCropName(e.target.value)}
                    className="w-full rounded-2xl border border-emerald-500/30 bg-slate-900/80 px-4 py-3 text-sm text-emerald-100 placeholder-slate-500 focus:border-emerald-400 focus:outline-none shadow-inner"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-emerald-300 mb-1.5">
                    Symptom Description / Leaf Appearance *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="e.g. Yellow brown circular spots on lower leaves with concentric rings, edges curling, black powdery spots on underside..."
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="w-full resize-none rounded-2xl border border-emerald-500/30 bg-slate-900/80 px-4 py-3 text-sm text-emerald-100 placeholder-slate-500 focus:border-emerald-400 focus:outline-none shadow-inner"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleAnalyze}
                  disabled={loading || !symptoms.trim()}
                  className="flex items-center gap-2 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 px-6 py-3 text-sm font-bold text-slate-950 shadow-xl shadow-emerald-500/30 hover:brightness-110 disabled:opacity-40 transition-all"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Analyzing with Groq 120B AI...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      Generate Diagnostic Report
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* Full Report Display Mode */
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
                <div className="flex items-center gap-2 text-sm font-bold text-emerald-300">
                  <FileText className="h-5 w-5 text-emerald-400" />
                  <span>Diagnostic Report for: {cropName || "Agriculture Crop"}</span>
                </div>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-200 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Edit Symptoms
                </button>
              </div>

              {/* Full Width Report Card */}
              <div className="rounded-3xl border border-emerald-500/30 bg-slate-950/80 p-6 sm:p-8 shadow-2xl shadow-emerald-950/50">
                <MarkdownRenderer content={result} />
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-emerald-500/20 bg-slate-950/90 px-6 py-3 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <span>KisanMitra 3D Diagnostic Engine</span>
          <button
            onClick={onClose}
            className="rounded-xl border border-emerald-500/30 bg-emerald-950/40 px-4 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-900/50"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  )
}
