"""
Topic 22: Guardrails
Description: Content Safety Guardrails, PII Anonymizer & Schema Enforcement.
"""

import re
from typing import Dict, Any, Tuple

class ContentSafetyGuardrails:
    PHONE_REGEX = re.compile(r"\b(?:\+91[\-\s]?)?[6-9]\d{9}\b")
    AADHAAR_REGEX = re.compile(r"\b\d{4}[\-\s]?\d{4}[\-\s]?\d{4}\b")
    INJECTION_KEYWORDS = ["ignore previous instructions", "system prompt", "drop database", "eval("]

    def sanitize_user_input(self, text: str) -> Tuple[str, Dict[str, Any]]:
        is_safe = True
        violations = []

        # Check prompt injection
        text_lower = text.lower()
        for kw in self.INJECTION_KEYWORDS:
            if kw in text_lower:
                is_safe = False
                violations.append(f"Prompt injection attempt: '{kw}'")

        # Anonymize PII (Phone numbers & Aadhaar)
        clean_text = self.PHONE_REGEX.sub("[PHONE_REDACTED]", text)
        clean_text = self.AADHAAR_REGEX.sub("[AADHAAR_REDACTED]", clean_text)

        return clean_text, {
            "is_safe": is_safe,
            "violations": violations,
            "pii_redacted": clean_text != text
        }
