"""
Topic 18: Context Window
Description: Dynamic Sliding Context Window Token Trimmer.
"""

from typing import List, Dict, Any

class ContextWindowTrimmer:
    def __init__(self, max_tokens: int = 8000):
        self.max_tokens = max_tokens

    @staticmethod
    def _approx_tokens(text: str) -> int:
        return max(1, len(text) // 4)

    def fit_to_context_budget(self, messages: List[Dict[str, str]]) -> List[Dict[str, str]]:
        if not messages:
            return []

        # Always preserve system message at index 0
        system_msgs = [m for m in messages if m.get("role") == "system"]
        chat_msgs = [m for m in messages if m.get("role") != "system"]

        system_tokens = sum(self._approx_tokens(m.get("content", "")) for m in system_msgs)
        budget = self.max_tokens - system_tokens

        trimmed_chat = []
        current_tokens = 0

        # Iterate backwards from newest message to oldest
        for m in reversed(chat_msgs):
            t_cost = self._approx_tokens(m.get("content", ""))
            if current_tokens + t_cost <= budget:
                trimmed_chat.insert(0, m)
                current_tokens += t_cost
            else:
                break

        return system_msgs + trimmed_chat
