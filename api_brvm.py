from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/cours-actions")
def get_data():
    return [
        {
            "symbole": "SGBC",
            "nom": "Société Générale",
            "cours_moyen": 1450,
            "ecart_max": 2.5,
            "sources_concordantes": 3
        },
        {
            "symbole": "ECOC",
            "nom": "Ecobank",
            "cours_moyen": 1120,
            "ecart_max": 1.2,
            "sources_concordantes": 2
        }
    ]
