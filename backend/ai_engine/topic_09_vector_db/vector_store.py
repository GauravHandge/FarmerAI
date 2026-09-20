"""
Topic 09: Vector Database
Description: Mathematical Cosine Similarity Vector Store for Agricultural Knowledge Retrieval.
"""

import math
from typing import List, Dict, Any, Tuple

class VectorStoreEngine:
    def __init__(self):
        self.vectors: List[Tuple[str, str, List[float]]] = [] # (doc_id, text, vector)

    @staticmethod
    def cosine_similarity(v1: List[float], v2: List[float]) -> float:
        """Calculate dot product over Euclidean norms."""
        if len(v1) != len(v2) or not v1:
            return 0.0
        dot_prod = sum(a * b for a, b in zip(v1, v2))
        norm_a = math.sqrt(sum(a * a for a in v1))
        norm_b = math.sqrt(sum(b * b for b in v2))
        if norm_a == 0 or norm_b == 0:
            return 0.0
        return dot_prod / (norm_a * norm_b)

    def add_vector(self, doc_id: str, text: str, vector: List[float]):
        self.vectors.append((doc_id, text, vector))

    def search_similar(self, query_vector: List[float], top_k: int = 3) -> List[Dict[str, Any]]:
        results = []
        for doc_id, text, vec in self.vectors:
            score = self.cosine_similarity(query_vector, vec)
            results.append({"doc_id": doc_id, "text": text, "similarity": round(score, 4)})
        
        # Sort descending by cosine similarity score
        results.sort(key=lambda x: x["similarity"], reverse=True)
        return results[:top_k]
