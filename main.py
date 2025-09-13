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
    if now - cache["last_update"] > 30:  # rafraîchit toutes les 30 secondes
        cache["data"] = scrape_brvm()
        cache["last_update"] = now
    return cache["data"]
