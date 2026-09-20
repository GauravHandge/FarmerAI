"""
Topic 17: Orchestrator
Description: Intent-Based Dynamic Router Orchestrator for KisanMitra.
"""

from typing import Dict, Any

class IntentWorkflowOrchestrator:
    INTENT_KEYWORDS = {
        "mandi_price": ["mandi", "price", "rate", "bhav", "bazaar", "market", "quintal"],
        "leaf_doctor": ["leaf", "yellow", "blight", "spot", "disease", "pest", "insect", "fungus"],
        "weather_radar": ["rain", "weather", "temperature", "humidity", "monsoon", "wind"],
        "npk_dosage": ["fertilizer", "urea", "dap", "mop", "npk", "soil", "dosage"]
    }

    def classify_and_route(self, prompt: str) -> Dict[str, Any]:
        prompt_lower = prompt.lower()
        matched_intents = []
        for intent, keywords in self.INTENT_KEYWORDS.items():
            if any(kw in prompt_lower for kw in keywords):
                matched_intents.append(intent)

        primary_intent = matched_intents[0] if matched_intents else "general_agri_llm"
        return {
            "prompt": prompt,
            "primary_intent": primary_intent,
            "secondary_intents": matched_intents[1:],
            "target_subroutine": f"execute_{primary_intent}"
        }
