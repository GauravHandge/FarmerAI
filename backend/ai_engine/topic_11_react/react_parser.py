"""
Topic 11: ReAct (Reason + Act)
Description: Regex-based ReAct (Thought -> Action -> Action Input -> Observation) Parser.
"""

import re
from typing import Dict, Any, Optional

class ReActLoopParser:
    THOUGHT_PATTERN = re.compile(r"Thought:\s*(.*?)(?=\nAction:|\nFinal Answer:|$)", re.DOTALL)
    ACTION_PATTERN = re.compile(r"Action:\s*(.*?)(?=\nAction Input:|$)", re.DOTALL)
    ACTION_INPUT_PATTERN = re.compile(r"Action Input:\s*(.*?)(?=\nObservation:|$)", re.DOTALL)
    FINAL_ANSWER_PATTERN = re.compile(r"Final Answer:\s*(.*)", re.DOTALL)

    def parse_llm_output(self, raw_output: str) -> Dict[str, Any]:
        thought_match = self.THOUGHT_PATTERN.search(raw_output)
        action_match = self.ACTION_PATTERN.search(raw_output)
        action_input_match = self.ACTION_INPUT_PATTERN.search(raw_output)
        final_answer_match = self.FINAL_ANSWER_PATTERN.search(raw_output)

        if final_answer_match:
            return {
                "type": "final_answer",
                "thought": thought_match.group(1).strip() if thought_match else "",
                "final_answer": final_answer_match.group(1).strip()
            }

        return {
            "type": "tool_action",
            "thought": thought_match.group(1).strip() if thought_match else "Reasoning...",
            "action": action_match.group(1).strip() if action_match else "unknown_tool",
            "action_input": action_input_match.group(1).strip() if action_input_match else "{}"
        }
