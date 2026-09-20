"""
Topic 02: AI Agent
Description: Core KisanMitra AI Agent integrating tools, memory & LLM reasoning.
"""

from typing import Dict, Any

class KisanAIAgent:
    def __init__(self, name: str = "KisanMitra-Primary"):
        self.name = name
        self.version = "3.0-NextGen"

    def get_info(self) -> Dict[str, Any]:
        return {
            "agent_name": self.name,
            "version": self.version,
            "capabilities": ["Mandi Market Intelligence", "Leaf Disease Doctor", "Weather Radar", "NPK Dosage"]
        }
