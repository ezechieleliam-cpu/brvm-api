import requests
import time
from datetime import datetime

API_URL = "https://brvm-api-1.onrender.com/refresh-data"

while True:
    try:
        response = requests.get(API_URL)
        if response.status_code == 200:
            print(f"✅ Mise à jour envoyée à {datetime.now().strftime('%H:%M:%S')}")
        else:
            print(f"⚠️ Réponse inattendue : {response.status_code}")
    except Exception as e:
        print(f"❌ Erreur réseau : {e}")
    
    time.sleep(900)  # Attendre 15 minutes
