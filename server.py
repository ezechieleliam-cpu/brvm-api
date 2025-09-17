from flask import Flask, jsonify
from fetch_brvm_data import get_brvm_data_with_ssl
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/brvm")
def brvm():
    result = get_brvm_data_with_ssl()
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
