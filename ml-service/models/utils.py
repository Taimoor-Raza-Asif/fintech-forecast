import pandas as pd
import numpy as np

def load_close_series(csv_path):
    df = pd.read_csv(csv_path)
    # ensure 'Close' column exists
    if 'Close' not in df.columns:
        raise ValueError("CSV must contain a 'Close' column")
    # drop NaNs and return numpy array of floats
    series = df['Close'].dropna().astype(float).values
    return series