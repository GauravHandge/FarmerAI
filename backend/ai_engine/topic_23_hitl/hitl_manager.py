"""
Topic 23: Human-in-the-Loop (HITL)
Description: Interactive Human Approval Gate & Confirmation Queue for High-Risk Actions.
"""

from typing import Dict, Any, List

class HITLApprovalQueue:
    def __init__(self):
        self.pending_approvals: Dict[str, Dict[str, Any]] = {}

    def create_approval_request(self, request_id: str, action_type: str, details: Dict[str, Any]) -> Dict[str, Any]:
        req = {
            "request_id": request_id,
            "action_type": action_type,
            "details": details,
            "status": "AWAITING_HUMAN_APPROVAL"
        }
        self.pending_approvals[request_id] = req
        return req

    def process_human_decision(self, request_id: str, approved: bool, user_note: str = "") -> Dict[str, Any]:
        if request_id not in self.pending_approvals:
            return {"error": "Request ID not found"}
        
        req = self.pending_approvals.pop(request_id)
        req["status"] = "APPROVED" if approved else "REJECTED"
        req["user_note"] = user_note
        return req
