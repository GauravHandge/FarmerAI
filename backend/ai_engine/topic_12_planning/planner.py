"""
Topic 12: Planning
Description: Task Planner with Directed Acyclic Graph (DAG) Sub-Goal Breakdown.
"""

from typing import List, Dict, Any

class ExecutionPlanNode:
    def __init__(self, step_id: int, title: str, tool_name: str, dependencies: List[int] = None):
        self.step_id = step_id
        self.title = title
        self.tool_name = tool_name
        self.dependencies = dependencies or []
        self.completed = False

class TaskPlannerDAG:
    def plan_agricultural_goal(self, goal: str) -> List[Dict[str, Any]]:
        nodes = [
            ExecutionPlanNode(1, "Parse Crop & Region", "parse_intent", []),
            ExecutionPlanNode(2, "Fetch Mandi Live Rates", "fetch_mandi_prices", [1]),
            ExecutionPlanNode(3, "Fetch Micro-Climate Weather", "fetch_weather", [1]),
            ExecutionPlanNode(4, "Synthesize Economic Advisory", "generate_advisory", [2, 3])
        ]
        return [{
            "step_id": n.step_id,
            "title": n.title,
            "tool": n.tool_name,
            "dependencies": n.dependencies
        } for n in nodes]
