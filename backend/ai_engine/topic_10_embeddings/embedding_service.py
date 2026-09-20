"""
Topic 10: Embeddings
Description: Hashing Vectorizer & Frequency Embedding Generator for Semantic Similarity.
"""

import math
import hashlib
from typing import List

class DenseEmbeddingService:
    def __init__(self, vector_dim: int = 64):
        self.vector_dim = vector_dim

    def generate_embedding(self, text: str) -> List[float]:
        """Generate normalized fixed-dimension float vector using md5 feature hashing."""
        words = text.lower().split()
        raw_vec = [0.0] * self.vector_dim
        for word in words:
            hash_val = int(hashlib.md5(word.encode("utf-8")).hexdigest(), 16)
            index = hash_val % self.vector_dim
            sign = 1.0 if (hash_val & 1) else -1.0
            raw_vec[index] += sign

        # L2 Norm Normalization
        norm = math.sqrt(sum(x * x for x in raw_vec))
        if norm == 0:
            return [0.0] * self.vector_dim
        return [round(x / norm, 4) for x in raw_vec]
