import os
from groq import Groq

api_key = os.getenv("GROQ_API_KEY", "")
client = Groq(api_key=api_key)

models = [m.id for m in client.models.list().data]
print(f"Total models found: {len(models)}")

working_chat_models = []

for m in models:
    try:
        res = client.chat.completions.create(
            model=m,
            messages=[{"role": "user", "content": "hi"}],
            max_tokens=5
        )
        print(f"✅ WORKING CHAT MODEL: {m}")
        working_chat_models.append(m)
    except Exception as e:
        err_msg = str(e)
        if "404" not in err_msg and "model_not_found" not in err_msg:
            print(f"⚠️ MODEL {m} error: {err_msg[:100]}")

print("\n--- FINAL WORKING CHAT MODELS ---")
print(working_chat_models)
