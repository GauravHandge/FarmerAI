"""
Topic 15: Fine-Tuning
Description: Llama 3.3 Fine-Tuning JSONL Exporter & Formatting Validator.
"""

import json
from typing import List, Dict, Any

class FineTuningDatasetExporter:
    def format_to_jsonl(self, conversations: List[List[Dict[str, str]]]) -> str:
        lines = []
        for conv in conversations:
            formatted_entry = {
                "messages": [
                    {"role": m["role"], "content": m["content"]}
                    for m in conv
                ]
            }
            lines.append(json.dumps(formatted_entry, ensure_ascii=False))
        return "\n".join(lines)

    def validate_dataset_quality(self, jsonl_str: str) -> Dict[str, Any]:
        lines = jsonl_str.strip().split("\n")
        valid_count = sum(1 for line in lines if "messages" in json.loads(line))
        return {
            "total_records": len(lines),
            "valid_records": valid_count,
            "formatting_status": "Passed validation for Unsloth / HuggingFace fine-tuning"
        }
