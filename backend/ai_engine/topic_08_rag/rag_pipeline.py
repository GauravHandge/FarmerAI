"""
Topic 08: RAG (Retrieval-Augmented Generation)
Description: Agri-knowledge retrieval augmented generation pipeline.
"""

from typing import List, Dict, Any

class AgriRAGPipeline:
    def __init__(self, vector_store=None):
        self.vector_store = vector_store

    def retrieve_context(self, query: str, top_k: int = 3) -> List[str]:
        return [
            "ICAR Advisory: Early Blight in Tomato is controlled by Mancozeb 75% WP spray @ 2.5g/L.",
            "Agmarknet Guidelines: Lasalgaon Mandi peak onion arrivals occur between October and March.",
            "Soil Science: Optimum soil moisture for Wheat germination is between 65% and 75%."
        ]
