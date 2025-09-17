from flask import Flask, jsonify
from fetch_brvm_data import get_brvm_data_with_ssl

app = Flask(__name__)

@app.route("/api/brvm")
def brvm():
    result = get_brvm_data_with_ssl()
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
