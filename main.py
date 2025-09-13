from fastapi import FastAPI

app = FastAPI()

@app.get("/cours-actions")
def get_cours():
    return [
        {
            "symbole": "SGBC",
            "nom": "Société Générale CI",
            "cours_cloture": 25500,
            "variation": 1.96,
            "sources_concordantes": 1
        }
    ]