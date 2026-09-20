"""
Topic 13: Transformer
Description: Transformer Attention & Token Budget Estimator.
"""

import re
from typing import Dict, Any

class TransformerTokenEstimator:
    @staticmethod
    def count_tokens(text: str) -> int:
        """Estimate BPE tokens using word + punctuation regex splits."""
        tokens = re.findall(r"\w+|[^\w\s]", text, re.UNICODE)
        return len(tokens)

    @staticmethod
    def compute_attention_mask_tokens(messages: list, max_window: int = 128000) -> Dict[str, Any]:
        total = sum(TransformerTokenEstimator.count_tokens(m.get("content", "")) for m in messages)
        return {
            "prompt_tokens": total,
            "context_window_limit": max_window,
            "remaining_token_space": max_window - total,
            "attention_occupancy_ratio": round(total / max_window, 4)
        }
