from statsmodels.tsa.arima.model import ARIMA
import numpy as np


def forecast_arima(series, steps=1, order=(5, 1, 0)):
    """
    Fit a simple ARIMA and forecast `steps` ahead.
    Returns a list of floats.
    """
    try:
        model = ARIMA(series, order=order)
        fit = model.fit()
        preds = fit.forecast(steps=steps)
        return [float(x) for x in preds]
    except Exception as e:
        # fallback: naive persistence (repeat last value)
        last = float(series[-1])
        return [last for _ in range(steps)]
