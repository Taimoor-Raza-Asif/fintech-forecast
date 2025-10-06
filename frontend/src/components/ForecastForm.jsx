// import React, { useState } from "react";

// export default function ForecastForm({
//   defaultTicker = "AAPL",
//   defaultHorizon = 5,
//   onForecast,
//   onTickerChange,
// }) {
//   const [ticker, setTicker] = useState(defaultTicker);
//   const [horizon, setHorizon] = useState(defaultHorizon);

//   function submit(e) {
//     e.preventDefault();
//     onTickerChange(ticker);
//     onForecast(ticker, parseInt(horizon));
//   }

//   return (
//     <form onSubmit={submit} className="forecast-form">
//       <label>
//         Ticker:
//         <input
//           value={ticker}
//           onChange={(e) => setTicker(e.target.value.toUpperCase())}
//         />
//       </label>
//       <label>
//         Horizon:
//         <input
//           type="number"
//           value={horizon}
//           onChange={(e) => setHorizon(e.target.value)}
//         />
//       </label>
//       <button type="submit">Forecast</button>
//     </form>
//   );
// }


import React, { useState } from "react";

export default function ForecastForm({
  defaultTicker = "AAPL",
  defaultHorizon = 5,
  onForecast,
  onTickerChange,
}) {
  const [ticker, setTicker] = useState(defaultTicker);
  const [horizon, setHorizon] = useState(defaultHorizon);

  // Available ticker options
  const tickers = ["AAPL", "MSFT", "BTC-USD"];

  function submit(e) {
    e.preventDefault();
    onTickerChange(ticker);
    onForecast(ticker, parseInt(horizon));
  }

  return (
    <form onSubmit={submit} className="forecast-form">
      <label>
        Ticker:&nbsp;
        <select
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
        >
          {tickers.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>

      <label>
        Horizon:&nbsp;
        <input
          type="number"
          value={horizon}
          onChange={(e) => setHorizon(e.target.value)}
        />
      </label>

      <button type="submit">Forecast</button>
    </form>
  );
}
