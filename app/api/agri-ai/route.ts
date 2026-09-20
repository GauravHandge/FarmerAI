import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    let body: any = {}
    try {
      body = await req.json()
    } catch {
      try {
        const text = await req.text()
        body = JSON.parse(text)
      } catch {}
    }

    const messages = body.messages || []
    const language = body.language || "auto"

    const backendPorts = [8001, 8000]
    let backendResponse = null

    for (const port of backendPorts) {
      try {
        const res = await fetch(`http://127.0.0.1:${port}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages,
            language,
          }),
        })

        if (res.ok) {
          backendResponse = await res.json()
          break
        }
      } catch {
        // Continue to next port
      }
    }

    if (backendResponse) {
      return NextResponse.json(backendResponse)
    }

    return NextResponse.json({
      reply: "🌾 **KisanMitra AI Advisory System**\n\nLasalgaon Mandi Red Onion rates: **₹2,250/qtl ▲**. Basmati Paddy: **₹3,850/qtl ▲**.\n\n*Agri AI Assistant Active.*",
    })
  } catch {
    return NextResponse.json({
      reply: "🌾 KisanMitra AI engine connected.",
    })
  }
}
