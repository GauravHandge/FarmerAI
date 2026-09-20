"""
Topic 14: LangChain
Description: LangChain RunnableSequence & PromptTemplate Compatibility Adapter.
"""

from typing import Dict, Any, Callable

class RunnableSequence:
    def __init__(self, steps: list):
        self.steps = steps

    def invoke(self, input_data: Any) -> Any:
        curr = input_data
        for step in self.steps:
            if callable(step):
                curr = step(curr)
            elif hasattr(step, "invoke"):
                curr = step.invoke(curr)
        return curr

class LangChainRunnableAdapter:
    @staticmethod
    def create_agri_chain(prompt_fn: Callable, llm_fn: Callable) -> RunnableSequence:
        return RunnableSequence([prompt_fn, llm_fn])
