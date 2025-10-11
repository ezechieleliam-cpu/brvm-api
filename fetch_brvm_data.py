
#!/usr/bin/env python3
"""
Script Python pour récupérer les données BRVM avec certificat SSL
Utilise le certificat DigiCert Global Root G2 pour sécuriser les connexions HTTPS
"""

import requests
import json
HEAD
import os
from datetime import datetime
from bs4 import BeautifulSoup

def get_cert_path():
    cert_path = os.environ.get("CERT_PATH", "certs/digicert_global_root_g2.pem")
    if not os.path.exists(cert_path):
        raise FileNotFoundError(f"❌ Certificat introuvable à {cert_path}")
    return cert_path

def get_brvm_stocks():
    url = "https://www.brvm.org/fr/cours-actions/0"
    headers = {
        'User-Agent': 'Mozilla/5.0',
        'Accept-Language': 'fr-FR,fr;q=0.9',
    }

    try:
        response = requests.get(url, headers=headers, timeout=10, verify=get_cert_path())
        soup = BeautifulSoup(response.text, "html.parser")
        rows = soup.select("table tbody tr")
        stocks = []

        for row in rows:
            cols = row.find_all("td")
            if len(cols) >= 7:
                variation_span = cols[6].find("span")
                variation = variation_span.text.strip() if variation_span else cols[6].text.strip()

                stocks.append({
                    "symbol": cols[0].text.strip(),
                    "name": cols[1].text.strip(),
                    "volume": cols[2].text.strip(),
                    "prev_close": cols[3].text.strip(),
                    "open": cols[4].text.strip(),
                    "close": cols[5].text.strip(),
                    "variation": variation
                })

        print(f"📦 {len(stocks)} actions extraites")
        return stocks

    except Exception as e:
        print(f"❌ Erreur lors du scraping : {e}")
        return [{"error": str(e)}]

def get_brvm_data_with_ssl():
    try:
        session = requests.Session()
        session.verify = get_cert_path()

        headers = {
            'User-Agent': 'Mozilla/5.0',

import ssl
import urllib3
from datetime import datetime
from bs4 import BeautifulSoup

def get_brvm_stocks():
    url = "https://www.brvm.org/fr/cours-actions/0"
    headers = {
        'User-Agent': 'Mozilla/5.0',
        'Accept-Language': 'fr-FR,fr;q=0.9',
    }

    try:
        response = requests.get(url, headers=headers, timeout=10)
        soup = BeautifulSoup(response.text, "html.parser")

        rows = soup.select("table tbody tr")
        stocks = []

        for row in rows:
            cols = row.find_all("td")
            if len(cols) >= 7:
                stocks.append({
                    "symbol": cols[0].text.strip(),
                    "name": cols[1].text.strip(),
                    "volume": cols[2].text.strip(),
                    "prev_close": cols[3].text.strip(),
                    "open": cols[4].text.strip(),
                    "close": cols[5].text.strip(),
                    "variation": cols[6].text.strip()
                })

        return stocks

    except Exception as e:
        return [{"error": str(e)}]


# Configuration SSL
def get_brvm_data_with_ssl():
    """
    Récupère les données BRVM avec vérification SSL
    Utilise le certificat DigiCert Global Root G2
    """
    try:
        # Configuration de la session avec certificat SSL
        session = requests.Session()
        
        # Chemin vers le certificat SSL (à ajuster selon votre structure)
        cert_path = "certs/digicert_global_root_g2.pem"
        
        # Configuration SSL
        session.verify = cert_path
        
        # Headers pour simuler un navigateur réel
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
             31634db (Initial BRVM API)
            'Accept': 'application/json, text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'fr-FR,fr;q=0.9,en;q=0.8',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
        }
          HEAD

        print("🔐 Connexion SSL initialisée")
        response = session.get("https://www.brvm.org", headers=headers, timeout=10)

        print(f"✅ Status: {response.status_code}, Taille: {len(response.content)} bytes")


        
        print("🔐 Connexion sécurisée SSL initialisée")
        print(f"📜 Certificat utilisé: {cert_path}")
        print("🔗 Tentative de connexion à BRVM...")
        
        # Test de connexion principale
        response = session.get("https://www.brvm.org", headers=headers, timeout=10)
        
        print(f"✅ Connexion réussie! Status: {response.status_code}")
        print(f"📊 Taille de la réponse: {len(response.content)} bytes")
        
        # Affichage d'un extrait de la réponse
        content_preview = response.text[:500] if response.text else "Contenu vide"
        print(f"📄 Aperçu du contenu:")
        print("-" * 50)
        print(content_preview)
        print("-" * 50)
        
        # Informations SSL
        print(f"🔒 Connexion SSL vérifiée avec succès")
        print(f"📅 Timestamp: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        
          31634db (Initial BRVM API)
        return {
            "success": True,
            "status_code": response.status_code,
            "content_length": len(response.content),
            "ssl_verified": True,
            "timestamp": datetime.now().isoformat()
        }
          HEAD

    except requests.exceptions.SSLError as e:
        return {"success": False, "error": f"SSL Error: {e}"}
    except requests.exceptions.Timeout as e:
        return {"success": False, "error": f"Timeout: {e}"}
    except requests.exceptions.RequestException as e:
        return {"success": False, "error": f"Request Error: {e}"}
    except Exception as e:
        return {"success": False, "error": f"Unexpected Error: {e}"}

def test_alternative_endpoints():

        
    except requests.exceptions.SSLError as e:
        print(f"❌ Erreur SSL: {e}")
        return {"success": False, "error": f"SSL Error: {e}"}
        
    except requests.exceptions.Timeout as e:
        print(f"⏰ Timeout: {e}")
        return {"success": False, "error": f"Timeout: {e}"}
        
    except requests.exceptions.RequestException as e:
        print(f"🚫 Erreur de requête: {e}")
        return {"success": False, "error": f"Request Error: {e}"}
        
    except Exception as e:
        print(f"💥 Erreur inattendue: {e}")
        return {"success": False, "error": f"Unexpected Error: {e}"}

def test_alternative_endpoints():
    """
    Teste des endpoints alternatifs pour les données BRVM
    """
        31634db (Initial BRVM API)
    endpoints = [
        "https://www.brvm.org/fr/cotations",
        "https://www.brvm.org/fr/marche/actions",
        "https://brvm-api-1.onrender.com/market/stocks"
    ]
        HEAD

    for endpoint in endpoints:
        print(f"\n🧪 Test de: {endpoint}")
        try:
            response = requests.get(endpoint, timeout=5, verify=get_cert_path())

    
    for endpoint in endpoints:
        print(f"\n🧪 Test de: {endpoint}")
        try:
            response = requests.get(endpoint, timeout=5, verify="certs/digicert_global_root_g2.pem")
          31634db (Initial BRVM API)
            print(f"✅ {endpoint} - Status: {response.status_code}")
        except Exception as e:
            print(f"❌ {endpoint} - Erreur: {e}")

if __name__ == "__main__":
<<<<<<< HEAD
          HEAD
    print("📦 Test de récupération des actions BRVM")
    data = get_brvm_stocks()
    print(json.dumps(data[:5], indent=2, ensure_ascii=False))

    print("🚀 Test SSL BRVM")
    result = get_brvm_data_with_ssl()

    try:
        with open("brvm_ssl_result.json", "w", encoding="utf-8") as f:
            json.dump(result, f, indent=2, ensure_ascii=False)
        print("💾 Résultat SSL sauvegardé")
    except Exception as e:
        print(f"❌ Erreur sauvegarde JSON : {e}")

    try:
        with open("brvm_log.txt", "a", encoding="utf-8") as log:
            log.write(f"[{datetime.now().isoformat()}] SSL Test: {json.dumps(result)}\n")
        print("📝 Log horodaté ajouté")
    except Exception as e:
        print(f"❌ Erreur écriture log : {e}")

    print("\n📊 Résumé :")
    if result.get("success"):
        print(f"- Status HTTP : {result['status_code']}")
        print(f"- SSL vérifié : {result['ssl_verified']}")
    else:
        print(f"- Échec : {result.get('error', 'Erreur inconnue')}")

    print("\n✨ Tests alternatifs")
    test_alternative_endpoints()
    print("\n✅ Script terminé")

=======
        print("📦 Test de récupération des actions BRVM")
    data = get_brvm_stocks()
    print(json.dumps(data[:5], indent=2, ensure_ascii=False))  # Affiche les 5 premières
>>>>>>> d901e9f (Initial BRVM API)
    print("🚀 BRVM SSL Data Fetcher")
    print("=" * 50)
    
    # Test principal
    result = get_brvm_data_with_ssl()

# ✅ Sauvegarde dans un fichier JSON
try:
    with open("brvm_ssl_result.json", "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)
    print("💾 Résultat SSL sauvegardé dans brvm_ssl_result.json")
except Exception as e:
    print(f"❌ Erreur lors de la sauvegarde JSON : {e}")

# ✅ Log horodaté dans un fichier texte
try:
    with open("brvm_log.txt", "a", encoding="utf-8") as log:
        log.write(f"[{datetime.now().isoformat()}] SSL Test: {json.dumps(result)}\n")
    print("📝 Log horodaté ajouté dans brvm_log.txt")
except Exception as e:
    print(f"❌ Erreur lors de l’écriture du log : {e}")

# ✅ Résumé visuel
if result.get("success"):
    print(f"\n📊 Résumé : {result['status_code']} - SSL OK: {result['ssl_verified']}")
else:
    print(f"\n📊 Résumé : Échec - {result.get('error', 'Erreur inconnue')}")

    
    print("\n" + "=" * 50)
    
    # Tests d'endpoints alternatifs
    test_alternative_endpoints()
    
    print("\n✨ Script terminé")
<<<<<<< HEAD
      31634db (Initial BRVM API)
=======
>>>>>>> d901e9f (Initial BRVM API)
