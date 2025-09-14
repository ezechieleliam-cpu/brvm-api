from fastapi import FastAPI
from scraper import scrape_brvm
import time

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
