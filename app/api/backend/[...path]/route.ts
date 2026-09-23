import { NextResponse } from "next/server"

const BACKEND_BASE = process.env.BACKEND_URL || "http://backend:8000"

export async function POST(
  req: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const resolvedParams = await params
    const pathStr = resolvedParams.path.join("/")
    const body = await req.json()

    // Try primary backend URL, fallback to localhost if direct local dev
    let response: Response
    try {
      response = await fetch(`${BACKEND_BASE}/api/${pathStr}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        cache: "no-store",
      })
    } catch {
      response = await fetch(`http://127.0.0.1:8000/api/${pathStr}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        cache: "no-store",
      })
    }

    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error: any) {
    return NextResponse.json(
      { reply: "Backend error connecting to Python engine." },
      { status: 500 }
    )
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const resolvedParams = await params
    const pathStr = resolvedParams.path.join("/")
    const url = new URL(req.url)

    let response: Response
    try {
      response = await fetch(`${BACKEND_BASE}/api/${pathStr}${url.search}`, {
        method: "GET",
        cache: "no-store",
      })
    } catch {
      response = await fetch(`http://127.0.0.1:8000/api/${pathStr}${url.search}`, {
        method: "GET",
        cache: "no-store",
      })
    }

    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error: any) {
    return NextResponse.json(
      { error: "Backend error connecting to Python engine." },
      { status: 500 }
    )
  }
}
