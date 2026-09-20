"""
Topic 19: Prompt Engineering
Description: Few-shot, zero-shot & chain-of-thought prompt templates manager.
"""

class PromptTemplateManager:
    @staticmethod
    def get_crop_diagnosis_prompt(crop: str, symptoms: str) -> str:
        return f"""You are an agricultural plant pathologist.
Analyze crop: {crop} with symptoms: {symptoms}.
Provide step-by-step diagnosis, cause, and organic/chemical remedies in markdown tables."""
