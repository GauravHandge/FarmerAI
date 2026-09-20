"""
Topic 05: Tools and Tool Calling
Description: Agricultural tool definitions & schemas for Mandi, Weather & Diagnosis.
"""

from typing import Dict, Any, List

class AgriToolsRegistry:
    @staticmethod
    def get_registered_tools() -> List[Dict[str, Any]]:
        return [
            {
                "name": "fetch_mandi_prices",
                "description": "Fetch live commodity prices for any APMC Mandi",
                "parameters": {"location": "string"}
            },
            {
                "name": "analyze_leaf_disease",
                "description": "Analyze leaf photo symptom and return remedies",
                "parameters": {"crop": "string", "symptoms": "string"}
            },
            {
                "name": "calculate_npk_dosage",
                "description": "Calculate Urea, DAP & MOP per acre requirement",
                "parameters": {"crop": "string", "acres": "number"}
            }
        ]
