import { NextResponse } from "next/server"

export async function POST(
  req: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const resolvedParams = await params
    const pathStr = resolvedParams.path.join("/")
    const body = await req.json()

    const response = await fetch(`http://127.0.0.1:8000/api/${pathStr}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    })

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

    const response = await fetch(`http://127.0.0.1:8000/api/${pathStr}${url.search}`, {
      method: "GET",
      cache: "no-store",
    })

    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error: any) {
    return NextResponse.json(
      { error: "Backend error connecting to Python engine." },
      { status: 500 }
    )
  }
}
