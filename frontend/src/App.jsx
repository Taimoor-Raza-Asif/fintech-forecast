import React, { useState, useEffect } from "react";
import ForecastForm from "./components/ForecastForm";
import Chart from "./components/Chart";
import api from "./services/api";

export default function App() {
  const [ticker, setTicker] = useState("AAPL");
  const [horizon, setHorizon] = useState(5);
  const [prices, setPrices] = useState([]);
  const [forecast, setForecast] = useState(null);

  // Fetch historical prices when ticker changes
  useEffect(() => {
    fetchPrices(ticker);
  }, [ticker]);

  async function fetchPrices(t) {
    try {
      const res = await api.get("/prices", { params: { ticker: t, limit: 200 } });
      setPrices(res.data);
    } catch (err) {
      console.error("Error loading prices:", err);
    }
  }

  async function handleForecast(t, h) {
    setTicker(t);
    setHorizon(h);
    try {
      const res = await api.post("/forecast", { ticker: t, horizon: h });
      console.log("Forecast API response:", res.data);

      // ✅ fix: actual forecast object is inside `res.data.predictions`
      setForecast(res.data.predictions);

      // Optionally refresh prices
      fetchPrices(t);
    } catch (err) {
      console.error("Forecast error:", err);
    }
  }

  return (
    <div className="app">
      <h1>📈 FinForecast</h1>
      <ForecastForm
        defaultTicker={ticker}
        defaultHorizon={horizon}
        onForecast={handleForecast}
        onTickerChange={setTicker}
      />
      <Chart prices={prices} forecast={forecast} horizon={horizon} />
    </div>
  );
}
