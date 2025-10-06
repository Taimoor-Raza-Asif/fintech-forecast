import axios from 'axios';
import Forecast from '../models/forecastModel.js';
import Price from '../models/priceModel.js';


const ML_URL = process.env.ML_SERVICE_URL || 'http://localhost:5001';


export async function createForecast(req, res) {
try {
const { ticker, horizon } = req.body;
if (!ticker) return res.status(400).json({ error: 'ticker required' });


// call ML service
const resp = await axios.post(`${ML_URL}/forecast`, { ticker, horizon });
const data = resp.data;


// save to DB
const record = await Forecast.create({ ticker, horizon, predictions: data, meta: { source: 'ml-service' } });


return res.json(record);
} catch (err) {
console.error(err.message);
return res.status(500).json({ error: err.message });
}
}


export async function listForecasts(req, res) {
const all = await Forecast.find().sort({ createdAt: -1 }).limit(50);
res.json(all);
}


export async function getPrices(req, res) {
const { ticker, limit } = req.query;
if (!ticker) return res.status(400).json({ error: 'ticker required' });
const q = { ticker };
const docs = await Price.find(q).sort({ date: 1 }).limit(parseInt(limit || '1000'));
res.json(docs);
}