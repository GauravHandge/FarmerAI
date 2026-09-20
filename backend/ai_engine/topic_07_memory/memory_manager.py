"""
Topic 07: Memory
Description: Session Memory Manager with Time-To-Live (TTL) & Token Budget Pruning.
"""

import time
from typing import List, Dict, Any, Optional

class ChatTurn:
    def __init__(self, role: str, content: str, tokens: int = 0):
        self.role = role
        self.content = content
        self.tokens = tokens or max(1, len(content) // 4)
        self.timestamp = time.time()

class SessionMemoryManager:
    def __init__(self, session_id: str, max_token_budget: int = 4000, ttl_seconds: int = 3600):
        self.session_id = session_id
        self.max_token_budget = max_token_budget
        self.ttl_seconds = ttl_seconds
        self.turns: List[ChatTurn] = []

    def add_turn(self, role: str, content: str):
        self.turns.append(ChatTurn(role=role, content=content))
        self._prune_memory()

    def _prune_memory(self):
        # Prune expired turns by TTL
        now = time.time()
        self.turns = [t for t in self.turns if now - t.timestamp < self.ttl_seconds]

        # Prune oldest turns if exceeding token budget
        total_tokens = sum(t.tokens for t in self.turns)
        while total_tokens > self.max_token_budget and len(self.turns) > 2:
            removed = self.turns.pop(0)
            total_tokens -= removed.tokens

    def get_messages(self) -> List[Dict[str, str]]:
        return [{"role": t.role, "content": t.content} for t in self.turns]
