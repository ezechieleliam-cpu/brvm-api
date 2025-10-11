HEAD
from flask import Flask, jsonify, render_template
from flask_cors import CORS
from fetch_brvm_data import get_brvm_stocks, get_brvm_data_with_ssl
from datetime import datetime
import json
import os

# ✅ Fonction de log
def log_request(route):
    try:
        with open("brvm_log.txt", "a", encoding="utf-8") as log:
            log.write(f"[{datetime.now().isoformat()}] Route appelée: {route}\n")
    except Exception as e:
        print(f"❌ Erreur lors du log: {e}")

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# 🌐 Page HTML principale
@app.route("/cours-actions")
def cours_actions_page():
    return render_template("cours_actions.html")

# 🔎 API filtrée par symbole
@app.route("/api/cours-actions/<symbol>")
def get_stock_by_symbol(symbol):
    log_request(f"/api/cours-actions/{symbol}")
    print(f"🔎 Requête reçue pour {symbol} à {datetime.now().isoformat()}")
    all_stocks = get_brvm_stocks()
    filtered = [s for s in all_stocks if s["symbol"].lower() == symbol.lower()]
    if filtered:
        return jsonify(filtered[0])
    else:
        return jsonify({"error": f"Aucune entreprise trouvée pour le symbole '{symbol}'"}), 404

# 🔄 Actualisation des données BRVM
@app.route("/refresh-data")
def refresh_data():
    log_request("/refresh-data")
    try:
        result = get_brvm_stocks()
        print("📦 Résultat brut du scraping :", result)  # ✅ Ce log doit être dans le try
        if isinstance(result, list) and result and "error" not in result[0]:
            return jsonify({
                "message": "✅ Données BRVM actualisées",
                "timestamp": datetime.now().isoformat(),
                "data": result
            })
        else:
            return jsonify({
                "message": "⚠️ Erreur lors du scraping",
                "timestamp": datetime.now().isoformat(),
                "data": [],
                "error": result[0].get("error", "Erreur inconnue")
            }), 500
    except Exception as e:
        print(f"❌ Exception dans /refresh-data : {e}")
        return jsonify({"error": str(e)}), 500


# 🔐 Test SSL avec certificat
from flask import Flask, jsonify
from fetch_brvm_data import get_brvm_data_with_ssl

app = Flask(__name__)

31634db (Initial BRVM API)
@app.route("/api/brvm")
def brvm():
    result = get_brvm_data_with_ssl()
    return jsonify(result)

HEAD
# 📜 Lecture du dernier log SSL
@app.route("/logs/ssl")
def ssl_log():
    try:
        with open("brvm_ssl_result.json", "r", encoding="utf-8") as f:
            return jsonify(json.load(f))
    except Exception as e:
        return jsonify({"error": str(e)})

# 🏠 Page d’accueil
@app.route("/")
def home():
    return jsonify({"message": "✅ BRVM API is running"})

# 📊 Route alternative pour les actions
@app.route("/market/stocks")
def market_stocks():
    log_request("/market/stocks")
    print(f"📥 Requête reçue à /market/stocks à {datetime.now().isoformat()}")
    return jsonify(get_brvm_stocks())

# 🖼️ Favicon
@app.route("/favicon.ico")
def favicon():
    return "", 204  # No Content

# 🚀 Lancement du serveur
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))  # ✅ Compatible Render
    app.run(host="0.0.0.0", port=port)

if __name__ == "__main__":
    app.run(debug=True)
    31634db (Initial BRVM API)
