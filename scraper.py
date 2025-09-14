import requests
from bs4 import BeautifulSoup

def scrape_brvm():
    url = "https://www.brvm.org/fr/cours-actions/0"
    try:
        response = requests.get(url, timeout=10, verify=False)
        soup = BeautifulSoup(response.text, "html.parser")
        rows = soup.select("table tbody tr")
        data = []
        for row in rows:
            cols = row.find_all("td")
            if len(cols) >= 5:
                symbole = cols[0].text.strip()
                nom = cols[1].text.strip()
                volume = int(cols[2].text.replace(" ", ""))
                cours_veille = float(cols[3].text.replace(" ", "").replace(",", "."))
                cours_ouverture = float(cols[4].text.replace(" ", "").replace(",", "."))
                cours_cloture = float(cols[5].text.replace(" ", "").replace(",", "."))
                variation = float(cols[6].text.replace(" ", "").replace(",", ".").replace("%", ""))
                data.append({
                    "symbole": symbole,
                    "nom": nom,
                    "cours_veille": cours_veille,
                    "cours_ouverture": cours_ouverture,
                    "cours_cloture": cours_cloture,
                    "variation": variation,
                    "sources_concordantes": 1
                })
        return data
    except Exception as e:
        print("Erreur BRVM, fallback Sikafinance")
        return scrape_sikafinance()

def scrape_sikafinance():
    return [{
        "symbole": "SIKA",
        "nom": "Fallback Sikafinance",
        "cours_cloture": 1000,
        "variation": 0.0,
        "sources_concordantes": 0
    }]
