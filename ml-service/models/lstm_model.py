import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
from sklearn.preprocessing import MinMaxScaler


def forecast_lstm(series, steps=1, window=10, epochs=5):
    """
    Train a small LSTM on the series and recursively predict `steps` ahead.
    This is intentionally simple for assignment purposes.
    """
    if len(series) < window + 1:
        # not enough data, fallback to repeating last value
        return [float(series[-1]) for _ in range(steps)]

    # Normalize data
    scaler = MinMaxScaler()
    scaled = scaler.fit_transform(series.reshape(-1, 1))

    # Prepare training sequences
    X, y = [], []
    for i in range(len(scaled) - window):
        X.append(scaled[i:i + window])
        y.append(scaled[i + window])
    X, y = np.array(X), np.array(y)

    # Define LSTM model
    model = Sequential([
        LSTM(64, input_shape=(window, 1)),
        Dense(1)
    ])
    model.compile(optimizer='adam', loss='mse')
    model.fit(X, y, epochs=epochs, batch_size=16, verbose=0)

    # Recursive forecast
    last_seq = scaled[-window:]
    preds = []
    for _ in range(steps):
        x = last_seq.reshape((1, window, 1))
        p = model.predict(x, verbose=0)[0][0]
        preds.append(float(scaler.inverse_transform([[p]])[0][0]))
        # append new prediction and slide window
        last_seq = np.vstack([last_seq[1:], [[p]]])

    return preds
