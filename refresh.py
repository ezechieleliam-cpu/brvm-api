import requests
import time

while True:
    try:
        r = requests.get("https://brvm-api-1.onrender.com/refresh-data")
        print("✅ Mise à jour envoyée :", r.json())
    except Exception as e:
        print("❌ Erreur :", e)
    time.sleep(900)  # toutes les 15 minutes
