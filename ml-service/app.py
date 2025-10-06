from flask import Flask, request, jsonify
from models.utils import load_close_series
from models.arima_model import forecast_arima
from models.lstm_model import forecast_lstm
import os

app = Flask(__name__)

@app.route("/health", methods=["GET"])
def health():
    """Simple health check route."""
    return jsonify({"status": "ok"})

@app.route("/forecast", methods=["POST"])
def forecast_endpoint():
    """Main forecasting route — takes ticker and horizon, returns ARIMA + LSTM predictions."""
    data = request.get_json()
    ticker = data.get("ticker")
    horizon = int(data.get("horizon", 1))

    if not ticker:
        return jsonify({"error": "ticker required"}), 400

    # build dataset path
    csv_path = os.path.join("data", f"{ticker}_dataset.csv")
    if not os.path.exists(csv_path):
        return jsonify({"error": f"data file not found: {csv_path}"}), 404

    # load close series
    try:
        close = load_close_series(csv_path)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    # Forecasts
    try:
        arima_pred = forecast_arima(close, steps=horizon)
        lstm_pred = forecast_lstm(close, steps=horizon, epochs=5)
    except Exception as e:
        return jsonify({"error": f"model error: {str(e)}"}), 500

    # return combined response
    return jsonify({
        "ticker": ticker,
        "arima_pred": arima_pred,
        "lstm_pred": lstm_pred
    })

if __name__ == '__main__':
    app.run(port=5001, host='0.0.0.0', debug=True)
