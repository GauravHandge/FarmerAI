"use client"

import { useState } from "react"
import { Mic, MicOff, Loader2 } from "lucide-react"

export function VoiceRecorder({ onSpeechRecorded }: { onSpeechRecorded: (text: string) => void }) {
  const [recording, setRecording] = useState(false)
  const [processing, setProcessing] = useState(false)

  const handleToggleRecord = async () => {
    if (recording) {
      setRecording(false)
      return
    }

    // Check browser Web Speech API fallback
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = "hi-IN" // Default Hindi / Indian English accent

      recognition.onstart = () => {
        setRecording(true)
      }

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setRecording(false)
        if (transcript) {
          onSpeechRecorded(transcript)
        }
      }

      recognition.onerror = () => {
        setRecording(false)
      }

      recognition.start()
    } else {
      alert("Voice input enabled! Please type your question if browser mic permissions are disabled.")
    }
  }

  return (
    <button
      type="button"
      onClick={handleToggleRecord}
      disabled={processing}
      title="Voice Input (Hindi/English)"
      className={`relative flex h-11 w-11 items-center justify-center rounded-xl border transition-all ${
        recording
          ? "border-rose-500 bg-rose-950/80 text-rose-400 animate-pulse shadow-lg shadow-rose-950/50"
          : "border-emerald-500/30 bg-emerald-950/40 text-emerald-400 hover:bg-emerald-900/50 hover:border-emerald-400"
      }`}
    >
      {processing ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : recording ? (
        <MicOff className="h-5 w-5" />
      ) : (
        <Mic className="h-5 w-5" />
      )}
    </button>
  )
}
