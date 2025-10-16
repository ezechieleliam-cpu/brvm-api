import requests, os, json
from datetime import datetime

def get_cert_path():
    cert_path = os.environ.get("CERT_PATH", "certs/brvm_chain.pem")
    if not os.path.exists(cert_path):
        raise FileNotFoundError(f"❌ Certificat introuvable à {cert_path}")
    return cert_path

def verify_brvm_ssl():
    try:
        session = requests.Session()
        session.verify = get_cert_path()
        headers = {'User-Agent': 'Mozilla/5.0'}
        response = session.get("https://www.brvm.org", headers=headers, timeout=10)
        print(f"✅ Status: {response.status_code}, Taille: {len(response.content)} bytes")
        return {
            "success": True,
            "status_code": response.status_code,
            "content_length": len(response.content),
            "ssl_verified": True,
            "timestamp": datetime.now().isoformat()
        }
    except requests.exceptions.SSLError as e:
        return {"success": False, "error": f"SSL Error: {e}"}
    except Exception as e:
        return {"success": False, "error": str(e)}

if __name__ == "__main__":
    result = verify_brvm_ssl()
    print(json.dumps(result, indent=2, ensure_ascii=False))
    with open("brvm_ssl_result.json", "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)
    with open("brvm_log.txt", "a", encoding="utf-8") as log:
        log.write(f"[{datetime.now().isoformat()}] SSL Test: {json.dumps(result)}\n")
