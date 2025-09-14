from fastapi import FastAPI
from scraper import scrape_brvm
import time 

from datetime import datetime, timedelta

last_data = []
last_update = datetime.min


app = FastAPI()
cache = {"data": [], "last_update": 0}

@app.get("/")
def root():
    return {"status": "API BRVM opérationnelle"}

@app.get("/cours-actions")
def get_cours():
    now = time.time()
    if now - cache["last_update"] > 30:
        cache["data"] = scrape_brvm()
        cache["last_update"] = now
    return cache["data"]

@app.get("/alerts")
def alerts():
    seuil = 5.0
    now = time.time()
    if now - cache["last_update"] > 30:
        cache["data"] = scrape_brvm()
        cache["last_update"] = now
    alertes = [a for a in cache["data"] if abs(a["variation"]) >= seuil]
    return alertes

@app.get("/status")
def status():
    return {
        "last_update": cache["last_update"],
        "timestamp": time.time(),
        "delay": round(time.time() - cache["last_update"], 2),
        "source": "BRVM" if cache["data"][0]["sources_concordantes"] == 1 else "Sikafinance"
    }

@app.get("/brvm-news")
def brvm_news():
    return scrape_brvm_news()

@app.get("/richbourse-news")
def rich_news():
    return scrape_richbourse_news()

@app.get("/sikafinance-news")
def sika_news():
    return scrape_sikafinance_news()

@app.get("/indicateurs")
def indicateurs():
    return scrape_brvm_indicateurs()

@app.get("/rapports-societes")
def rapports():
    return scrape_rapports_societes()

@app.get("/dividendes")
def dividendes():
    return scrape_dividendes()

@app.get("/indicateurs")
def indicateurs():
    return scrape_brvm_indicateurs()

@app.get("/rapports-societes")
def rapports():
    return scrape_rapports_societes()

@app.get("/actualites")
def actualites():
    return (
        scrape_brvm_news() +
        scrape_richbourse_news() +
        scrape_sikafinance_news()
    )

@app.get("/stats")
def stats():
    return scrape_stats()

@app.get("/top-mouvements")
def top_mouvements():
    return scrape_top_mouvements()

@app.get("/alerte")
def alerte():
    data = scrape_top_mouvements()
    for action in data["hausses"]:
        if action["variation"] > 8:
            send_telegram_alert(f"📈 {action['symbole']} +{action['variation']}%")
    for action in data["baisses"]:
        if action["variation"] < -8:
            send_telegram_alert(f"📉 {action['symbole']} {action['variation']}%")
    return {"status": "alertes envoyées"}

@app.get("/actions")
def actions():
    global last_data, last_update
    if datetime.now() - last_update > timedelta(minutes=15):
        try:
            last_data = scrape_brvm()
        except:
            last_data = scrape_richbourse()
        last_update = datetime.now()
    return last_data

@app.get("/refresh-data")
def refresh_data():
    global last_data, last_update
    try:
        last_data = scrape_brvm()
        last_update = datetime.now()
        return {"status": "OK", "updated": last_update.strftime("%H:%M")}
    except:
        return {"status": "Erreur scraping"}

