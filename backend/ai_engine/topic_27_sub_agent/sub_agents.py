"""
Topic 27: Sub-Agent
Description: Specialized task sub-agents for Mandi Pricing, Vision Doctor & Audio Speech.
"""

from typing import Dict, Any

class VisionSubAgent:
    def analyze_image(self, image_bytes: bytes) -> str:
        return "VisionSubAgent: Leaf symptoms evaluated."

class SpeechSubAgent:
    def synthesize_tts(self, text: str) -> str:
        return "SpeechSubAgent: Audio output generated."

class MandiSubAgent:
    def get_rates(self, location: str) -> Dict[str, Any]:
        return {"mandi": location, "status": "fetched"}
