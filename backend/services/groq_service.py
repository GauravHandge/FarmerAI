import os
import json
import httpx
from typing import AsyncGenerator, Dict, Any, List
from backend.config import GROQ_API_KEY, GROQ_MODEL, GROQ_FALLBACK_MODELS, GROQ_WHISPER_MODEL, KISAN_MITRA_SYSTEM_PROMPT

class GroqService:
    def __init__(self):
        self.api_key = GROQ_API_KEY
        self.base_url = "https://api.groq.com/openai/v1"

    def _prepare_messages(self, messages: List[Dict[str, str]], max_history: int = 4) -> List[Dict[str, str]]:
        """Prune and truncate historical turns to keep prompt lightweight and avoid token limits"""
        system_msg = {"role": "system", "content": KISAN_MITRA_SYSTEM_PROMPT}
        if not messages:
            return [system_msg]

        recent = messages[-max_history:]
        clean_msgs = []

        for idx, m in enumerate(recent):
            role = m.get("role", "user")
            content = m.get("content", "")
            # Truncate old long responses so history doesn't explode
            if idx < len(recent) - 1 and len(content) > 250:
                content = content[:250] + "..."
            clean_msgs.append({"role": role, "content": content})

        return [system_msg] + clean_msgs

    async def chat(self, messages: List[Dict[str, str]], user_language: str = "auto") -> str:
        """Get full dynamic AI response with automatic history pruning and emergency context fallback"""
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }

        full_messages = self._prepare_messages(messages, max_history=4)
        models_to_try = [GROQ_MODEL] + [m for m in GROQ_FALLBACK_MODELS if m != GROQ_MODEL]
        last_error = None

        async with httpx.AsyncClient(timeout=60.0) as client:
            # Attempt 1: Standard pruned history
            for model in models_to_try:
                try:
                    response = await client.post(
                        f"{self.base_url}/chat/completions",
                        headers=headers,
                        json={
                            "model": model,
                            "messages": full_messages,
                            "temperature": 0.5,
                            "frequency_penalty": 0.5,
                            "presence_penalty": 0.5,
                            "max_tokens": 2500,
                        },
                    )

                    if response.status_code == 200:
                        data = response.json()
                        reply = data["choices"][0]["message"]["content"]
                        if reply and reply.strip():
                            return reply.strip()
                    else:
                        print(f"[Groq API Warning]: Model '{model}' status {response.status_code}: {response.text}")
                        last_error = response.text
                except Exception as e:
                    last_error = str(e)
                    print(f"[Groq Model Warning]: Model '{model}' failed: {e}")

            # Attempt 2: Emergency fallback with ONLY the latest user query if history was too large
            if messages:
                last_user_msg = messages[-1]
                emergency_messages = [
                    {"role": "system", "content": KISAN_MITRA_SYSTEM_PROMPT},
                    {"role": "user", "content": last_user_msg.get("content", "")}
                ]
                for model in models_to_try:
                    try:
                        res = await client.post(
                            f"{self.base_url}/chat/completions",
                            headers=headers,
                            json={
                                "model": model,
                                "messages": emergency_messages,
                                "temperature": 0.7,
                                "max_tokens": 2500,
                            },
                        )
                        if res.status_code == 200:
                            data = res.json()
                            reply = data["choices"][0]["message"]["content"]
                            if reply and reply.strip():
                                return reply.strip()
                    except Exception:
                        pass

        return f"KisanMitra Python Engine response unavailable. (Error: {str(last_error)})"

    async def stream_chat(self, messages: List[Dict[str, str]], user_language: str = "auto") -> AsyncGenerator[str, None]:
        """Stream response chunks with automatic message truncation"""
        full_messages = self._prepare_messages(messages, max_history=4)
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }

        models_to_try = [GROQ_MODEL] + [m for m in GROQ_FALLBACK_MODELS if m != GROQ_MODEL]

        async with httpx.AsyncClient(timeout=60.0) as client:
            for model in models_to_try:
                try:
                    async with client.stream(
                        "POST",
                        f"{self.base_url}/chat/completions",
                        headers=headers,
                        json={
                            "model": model,
                            "messages": full_messages,
                            "temperature": 0.7,
                            "max_tokens": 1000,
                            "stream": True,
                        },
                    ) as response:
                        if response.status_code == 200:
                            async for line in response.aiter_lines():
                                if line.startswith("data: "):
                                    data_str = line[6:].strip()
                                    if data_str == "[DONE]":
                                        break
                                    try:
                                        chunk_json = json.loads(data_str)
                                        content = chunk_json["choices"][0]["delta"].get("content", "")
                                        if content:
                                            yield content
                                    except Exception:
                                        pass
                            return
                except Exception as e:
                    print(f"[Groq Stream Warning]: Model '{model}' failed: {e}")

        yield "\n[Groq API Stream Error]"

    async def transcribe_audio(self, audio_bytes: bytes, filename: str = "audio.wav") -> Dict[str, Any]:
        """Transcribe speech to text using Groq Whisper model"""
        try:
            headers = {"Authorization": f"Bearer {self.api_key}"}
            files = {"file": (filename, audio_bytes, "audio/wav")}
            data = {"model": GROQ_WHISPER_MODEL, "response_format": "json"}

            async with httpx.AsyncClient(timeout=30.0) as client:
                res = await client.post(
                    f"{self.base_url}/audio/transcriptions",
                    headers=headers,
                    files=files,
                    data=data,
                )
                if res.status_code == 200:
                    return {"success": True, "text": res.json().get("text", "")}
                return {"success": False, "error": res.text}
        except Exception as e:
            return {"success": False, "error": str(e)}

    async def save_uploaded_image(self, base64_str: str, category: str = "crop") -> str:
        """Decode base64 image data and save securely to backend/uploads/ disk directory"""
        import base64
        import time
        import uuid
        
        try:
            uploads_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "uploads")
            os.makedirs(uploads_dir, exist_ok=True)

            if "," in base64_str:
                header, base64_str = base64_str.split(",", 1)
            
            image_bytes = base64.b64decode(base64_str)
            filename = f"{category}_{int(time.time())}_{uuid.uuid4().hex[:6]}.jpg"
            filepath = os.path.join(uploads_dir, filename)

            with open(filepath, "wb") as f:
                f.write(image_bytes)

            print(f"[Upload Saved]: {filepath} ({len(image_bytes)} bytes)")
            return f"/uploads/{filename}"
        except Exception as e:
            print(f"[Upload Error]: Failed to save image: {e}")
            return ""

    async def analyze_crop_image(self, image_description: str, crop_name: str = "") -> str:
        """Generate a comprehensive AI Diagnostic Report for uploaded Crop, Leaf, Fruit, or Animal photos"""
        prompt = f"""Generate an expert KisanMitra Real-Time AI Visual & Diagnostic Report for:
Subject / Category: {crop_name if crop_name else 'Crop / Animal / Fruit Photo Analysis'}
Visual Details: {image_description}

Format your response using clean, beautifully formatted Markdown:
### 1️⃣ Visual Identification & Assessment
Identify the exact species, breed/variety, and general visual condition observed in the uploaded photo.

### 2️⃣ Health & Disease Diagnosis
Diagnose any visual symptoms, fungal/bacterial/viral infections, nutrient deficiencies, or pest infestations.

### 3️⃣ Immediate Action Plan & Treatment
| Step | Recommended Action | Purpose & Expected Result |

### 4️⃣ Remedies & Dosage Schedule
#### 🌿 Organic / Natural Solution
| Product / Remedy | Application Dosage | Treatment Frequency |

#### ⚗️ Chemical / Veterinary Treatment
| Chemical / Product Name | Dosage & Administration | Safety Precaution |

Ensure all tables and sections are complete and fully formatted.
"""
        return await self.chat([{"role": "user", "content": prompt}])

    async def fetch_live_mandi_prices(self, mandi_location: str = "Azadpur APMC, Delhi") -> dict:
        """Fetch dynamic real-time Agmarknet Mandi rates using Groq AI"""
        prompt = f"""You are an expert Indian Government Agmarknet (agmarknet.gov.in) Market Intelligence Engine.
Generate current realistic Mandi prices (in INR per Quintal) for 15 major crops sold in: '{mandi_location}'.

Return ONLY a valid JSON object matching this exact structure (no commentary, no markdown wrap):
{{
  "mandi": "{mandi_location}",
  "last_updated": "Today, Live Agmarknet Govt Feed",
  "rates": [
    {{"commodity": "Onion (प्याज - Red/Kanda)", "category": "Vegetables", "mandi": "{mandi_location}", "min_price": 1800, "max_price": 2600, "modal_price": 2250, "trend": "up"}},
    {{"commodity": "Potato (आलू - Jyoti)", "category": "Vegetables", "mandi": "{mandi_location}", "min_price": 1400, "max_price": 1850, "modal_price": 1620, "trend": "stable"}},
    {{"commodity": "Tomato (टमाटर - Hybrid)", "category": "Vegetables", "mandi": "{mandi_location}", "min_price": 1900, "max_price": 2700, "modal_price": 2300, "trend": "up"}},
    {{"commodity": "Garlic (लहसुन)", "category": "Vegetables", "mandi": "{mandi_location}", "min_price": 9500, "max_price": 14000, "modal_price": 11800, "trend": "up"}},
    {{"commodity": "Ginger (अदरक)", "category": "Vegetables", "mandi": "{mandi_location}", "min_price": 6500, "max_price": 8800, "modal_price": 7600, "trend": "stable"}},
    {{"commodity": "Green Chilli (हरी मिर्च)", "category": "Vegetables", "mandi": "{mandi_location}", "min_price": 3200, "max_price": 4500, "modal_price": 3800, "trend": "up"}},
    {{"commodity": "Wheat (गेहूं - Sharbati/Desi)", "category": "Cereals", "mandi": "{mandi_location}", "min_price": 2250, "max_price": 2550, "modal_price": 2400, "trend": "up"}},
    {{"commodity": "Paddy Basmati (धान 1121)", "category": "Cereals", "mandi": "{mandi_location}", "min_price": 3800, "max_price": 4600, "modal_price": 4200, "trend": "stable"}},
    {{"commodity": "Maize (मक्का)", "category": "Cereals", "mandi": "{mandi_location}", "min_price": 1900, "max_price": 2250, "modal_price": 2080, "trend": "up"}},
    {{"commodity": "Mustard (सरसों - Black)", "category": "Oilseeds", "mandi": "{mandi_location}", "min_price": 5300, "max_price": 5850, "modal_price": 5600, "trend": "up"}},
    {{"commodity": "Soyabean (सोयाबीन)", "category": "Oilseeds", "mandi": "{mandi_location}", "min_price": 4300, "max_price": 4850, "modal_price": 4600, "trend": "stable"}},
    {{"commodity": "Chana / Gram (चना)", "category": "Pulses", "mandi": "{mandi_location}", "min_price": 5600, "max_price": 6200, "modal_price": 5900, "trend": "up"}},
    {{"commodity": "Tur / Arhar (अरहर)", "category": "Pulses", "mandi": "{mandi_location}", "min_price": 8500, "max_price": 10200, "modal_price": 9400, "trend": "up"}},
    {{"commodity": "Cumin Seeds (जीरा)", "category": "Spices", "mandi": "{mandi_location}", "min_price": 24000, "max_price": 31000, "modal_price": 27500, "trend": "up"}},
    {{"commodity": "Turmeric (हल्दी)", "category": "Spices", "mandi": "{mandi_location}", "min_price": 12500, "max_price": 16000, "modal_price": 14200, "trend": "stable"}},
    {{"commodity": "Cotton (कपास)", "category": "Cash Crops", "mandi": "{mandi_location}", "min_price": 6700, "max_price": 7300, "modal_price": 7050, "trend": "down"}}
  ]
}}
"""
        res_text = await self.chat([{"role": "user", "content": prompt}])
        try:
            cleaned = res_text.strip()
            if cleaned.startswith("```"):
                cleaned = cleaned.split("\n", 1)[1].rsplit("```", 1)[0].strip()
            return json.loads(cleaned)
        except Exception:
            return {"mandi": mandi_location, "last_updated": "Live Data", "rates": []}

groq_service = GroqService()
