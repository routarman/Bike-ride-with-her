from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return jsonify({
        "status": "Long Drive With Her backend is running ❤️"
    })

@app.route("/api/search")
def search():
    return jsonify({
        "message": "YouTube Music search will be connected here."
    })

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)