"""
Topic 21: Hallucination Mitigation
Description: Grounding Verifier & Factual N-Gram Overlap Validator.
"""

from typing import Dict, Any, List

class GroundingVerifierEngine:
    @staticmethod
    def calculate_n_gram_overlap(candidate_text: str, reference_docs: List[str], n: int = 2) -> float:
        """Calculate n-gram precision overlap against trusted reference documents."""
        cand_words = candidate_text.lower().split()
        if len(cand_words) < n:
            return 1.0

        cand_ngrams = set(tuple(cand_words[i:i+n]) for i in range(len(cand_words)-n+1))
        
        ref_ngrams = set()
        for doc in reference_docs:
            doc_words = doc.lower().split()
            for i in range(len(doc_words)-n+1):
                ref_ngrams.add(tuple(doc_words[i:i+n]))

        if not cand_ngrams:
            return 1.0

        overlap = cand_ngrams.intersection(ref_ngrams)
        return round(len(overlap) / len(cand_ngrams), 4)

    def verify_grounding(self, llm_response: str, reference_docs: List[str]) -> Dict[str, Any]:
        precision = self.calculate_n_gram_overlap(llm_response, reference_docs)
        is_grounded = precision >= 0.25
        return {
            "grounding_precision": precision,
            "is_grounded": is_grounded,
            "status": "PASS — Factual Grounding Verified" if is_grounded else "WARNING — Potential Hallucination Detected"
        }
