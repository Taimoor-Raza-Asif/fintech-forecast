import React from "react";
import Plot from "react-plotly.js";

export default function Chart({ prices = [], forecast = null, horizon = 5 }) {
  if (!prices.length) return <p>No data loaded yet.</p>;

  const dates = prices.map((p) => new Date(p.date));
  const open = prices.map((p) => p.open);
  const high = prices.map((p) => p.high);
  const low = prices.map((p) => p.low);
  const close = prices.map((p) => p.close);

  const lastDate = dates[dates.length - 1];
  const futureDates = [];
  for (let i = 1; i <= horizon; i++) {
    const d = new Date(lastDate);
    d.setDate(d.getDate() + i);
    futureDates.push(d);
  }

  const traces = [
    {
      x: dates,
      open,
      high,
      low,
      close,
      type: "candlestick",
      name: "Historical",
    },
  ];

 if (forecast?.arima_pred) {
  traces.push({
    x: futureDates,
    y: forecast.arima_pred,
    type: "scatter",
    mode: "lines+markers",
    name: "ARIMA Forecast",
  });
}

if (forecast?.lstm_pred) {
  traces.push({
    x: futureDates,
    y: forecast.lstm_pred,
    type: "scatter",
    mode: "lines+markers",
    name: "LSTM Forecast",
  });
}


  return (
    <Plot
      data={traces}
      layout={{
        title: "Stock Price & Forecast",
        xaxis: { title: "Date" },
        yaxis: { title: "Price" },
      }}
      style={{ width: "100%", height: "600px" }}
    />
  );
}
