from flask import Flask, jsonify
from fetch_brvm_data import get_brvm_stocks, get_brvm_data_with_ssl
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/brvm")
def brvm():
    result = get_brvm_data_with_ssl()
    return jsonify(get_brvm_data_with_ssl())

@app.route("/market/stocks")
def market_stocks():
    return jsonify(get_brvm_stocks())


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)

