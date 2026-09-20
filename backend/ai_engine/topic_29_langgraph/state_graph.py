"""
Topic 29: LangGraph
Description: LangGraph State Machine with Conditional Node Transitions & State Memory.
"""

from typing import Dict, Any, Callable

class StateGraphEngine:
    def __init__(self):
        self.nodes: Dict[str, Callable] = {}
        self.edges: Dict[str, str] = {}

    def add_node(self, name: str, fn: Callable):
        self.nodes[name] = fn

    def add_edge(self, from_node: str, to_node: str):
        self.edges[from_node] = to_node

    def run_graph(self, initial_state: Dict[str, Any], start_node: str) -> Dict[str, Any]:
        current = start_node
        state = initial_state
        visited = []

        while current in self.nodes:
            visited.append(current)
            fn = self.nodes[current]
            state = fn(state)
            current = self.edges.get(current)

        state["visited_nodes"] = visited
        return state
