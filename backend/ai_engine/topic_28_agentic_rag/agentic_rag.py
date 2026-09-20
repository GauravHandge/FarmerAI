"""
Topic 28: Agentic RAG
Description: Dynamic Agentic RAG decision engine with similarity confidence scoring.
"""

from typing import Dict, Any, List

class AgenticRAGEngine:
    RETRIEVAL_CONFIDENCE_THRESHOLD = 0.45

    def evaluate_retrieval_need(self, query: str, vector_top_score: float) -> Dict[str, Any]:
        """Dynamically decide whether to perform RAG, fallback to web search, or rely on internal parametric LLM memory."""
        if vector_top_score >= self.RETRIEVAL_CONFIDENCE_THRESHOLD:
            decision = "USE_VECTOR_RAG"
            reason = f"High similarity score ({vector_top_score:.2f}) found in local ICAR vector database."
        elif "price" in query.lower() or "mandi" in query.lower() or "today" in query.lower():
            decision = "TRIGGER_LIVE_API_TOOL"
            reason = "Live temporal query detected; triggering Agmarknet API tool."
        else:
            decision = "USE_PARAMETRIC_LLM"
            reason = "General agronomy query; using Groq Llama-3.3 parametric knowledge."

        return {
            "query": query,
            "top_similarity_score": vector_top_score,
            "decision": decision,
            "reason": reason
        }
