from flask import Flask, jsonify
from flask_cors import CORS
from fetch_brvm_data import get_brvm_stocks, get_brvm_data_with_ssl
import json
import os

app = Flask(__name__)
CORS(app)

@app.route("/api/brvm")
def brvm():
    result = get_brvm_data_with_ssl()
    return jsonify(result)  # ✅ Corrigé : ne pas appeler deux fois

@app.route("/logs/ssl")
def ssl_log():
    try:
        with open("brvm_ssl_result.json", "r", encoding="utf-8") as f:
            return jsonify(json.load(f))
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route("/")
def home():
    return jsonify({"message": "✅ BRVM API is running"})


@app.route("/market/stocks")
def market_stocks():
print(f"📥 Requête reçue à /market/stocks à {datetime.now().isoformat()}")
    return jsonify(get_brvm_stocks())

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))  # ✅ Compatible Render
    app.run(host="0.0.0.0", port=port)
