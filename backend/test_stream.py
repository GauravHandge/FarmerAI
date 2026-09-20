import asyncio
from backend.services.groq_service import groq_service

async def run():
    print("--- STARTING GROQ STREAM TEST ---")
    async for chunk in groq_service.stream_chat([{"role": "user", "content": "hii"}]):
        print(chunk, end="", flush=True)
    print("\n--- TEST COMPLETE ---")

if __name__ == "__main__":
    asyncio.run(run())
