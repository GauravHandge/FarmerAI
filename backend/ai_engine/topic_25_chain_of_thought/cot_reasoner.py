"""
Topic 25: Chain of Thought (CoT)
Description: Multi-Step Reasoning Tree Builder & Step-by-Step Step Extractor.
"""

import re
from typing import List, Dict, Any

class ChainOfThoughtExtractor:
    STEP_REGEX = re.compile(r"Step\s+(\d+)[:\.\-]\s*(.*?)(?=\nStep\s+\d+|Final Answer:|$)", re.DOTALL | re.IGNORECASE)

    def extract_reasoning_steps(self, llm_raw_text: str) -> List[Dict[str, Any]]:
        matches = self.STEP_REGEX.findall(llm_raw_text)
        steps = []
        for step_num, step_content in matches:
            steps.append({
                "step": int(step_num),
                "reasoning": step_content.strip()
            })
        return steps
