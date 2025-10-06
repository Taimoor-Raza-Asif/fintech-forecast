import express from 'express';
import { createForecast, listForecasts, getPrices } from '../controllers/forecastController.js';


const router = express.Router();
router.post('/forecast', createForecast);
router.get('/forecasts', listForecasts);
router.get('/prices', getPrices);


export default router;