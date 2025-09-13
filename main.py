from fastapi import FastAPI
from scraper import scrape_brvm  # Assure-toi que scraper.py est bien présent

app = FastAPI()

@app.get("/")
def root():
    return {"status": "API BRVM opérationnelle"}

@app.get("/cours-actions")
def get_cours():
    return scrape_brvm()
