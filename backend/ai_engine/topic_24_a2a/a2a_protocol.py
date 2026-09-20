"""
Topic 24: Agent-to-Agent (A2A)
Description: Direct Agent-to-Agent messaging & handoff protocol.
"""

from typing import Dict, Any

class A2AProtocol:
    def send_agent_message(self, sender: str, recipient: str, message: Dict[str, Any]) -> Dict[str, Any]:
        return {
            "protocol": "A2A/v1.0",
            "sender": sender,
            "recipient": recipient,
            "payload": message,
            "delivered": True
        }
