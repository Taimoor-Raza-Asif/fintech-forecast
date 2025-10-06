import pandas as pd
from sklearn.metrics import mean_squared_error
from math import sqrt
from arima_model import forecast_arima
from lstm_model import forecast_lstm
from utils import load_close_series

# Load your CSV
series = load_close_series("../data/AAPL_dataset.csv")

# Use last few points as test data
train, test = series[:-5], series[-5:]

# Forecast 5 steps ahead
arima_preds = forecast_arima(train, steps=5)
lstm_preds = forecast_lstm(train, steps=5, epochs=3)

# Compute RMSE
arima_rmse = sqrt(mean_squared_error(test, arima_preds))
lstm_rmse = sqrt(mean_squared_error(test, lstm_preds))

print("ARIMA RMSE:", arima_rmse)
print("LSTM RMSE:", lstm_rmse)
