import requests
from bs4 import BeautifulSoup

def scrape_brvm():
    url = "https://www.brvm.org/fr/cours-actions/0"
    try:
        response = requests.get(url, timeout=10, verify=False)  # ← ici
        soup = BeautifulSoup(response.text, "html.parser")
        rows = soup.select("table tbody tr")
        data = []
        for row in rows:
            cols = row.find_all("td")
            if len(cols) >= 5:
                symbole = cols[0].text.strip()
                nom = cols[1].text.strip()
                cours = float(cols[2].text.replace(" ", "").replace(",", "."))
                variation = float(cols[4].text.replace(",", ".").replace("%", ""))
                data.append({
                    "symbole": symbole,
                    "nom": nom,
                    "cours_cloture": cours,
                    "variation": variation,
                    "sources_concordantes": 1
                })
        return data
    except Exception as e:
        return [{"error": "Erreur scraping BRVM", "details": str(e)}]
