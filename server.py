from flask import Flask, jsonify
from flask_cors import CORS
from fetch_brvm_data import get_brvm_stocks, get_brvm_data_with_ssl
from flask import Flask, jsonify, render_template
import json
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/cours-actions")
def cours_actions_page():
    return render_template("cours_actions.html")

@app.route("/api/cours-actions/<symbol>")
def get_stock_by_symbol(symbol):
    from datetime import datetime
    print(f"🔎 Requête reçue pour {symbol} à {datetime.now().isoformat()}")
    all_stocks = get_brvm_stocks()
    filtered = [s for s in all_stocks if s["symbol"].lower() == symbol.lower()]
    if filtered:
        return jsonify(filtered[0])
    else:
        return jsonify({"error": f"Aucune entreprise trouvée pour le symbole '{symbol}'"}), 404



@app.route("/favicon.ico")
def favicon():
    return "", 204  # No Content


@app.route("/refresh-data")
def refresh_data():
    from datetime import datetime

    print(f"🔄 Requête reçue à /refresh-data à {datetime.now().isoformat()}")
    result = get_brvm_stocks()
    return jsonify(
        {
            "message": "✅ Données BRVM actualisées",
            "timestamp": datetime.now().isoformat(),
            "data": result,
        }
    )


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
    from datetime import datetime

    print(f"📥 Requête reçue à /market/stocks à {datetime.now().isoformat()}")
    return jsonify(get_brvm_stocks())


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))  # ✅ Compatible Render
    app.run(host="0.0.0.0", port=port)
