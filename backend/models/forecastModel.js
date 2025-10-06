import mongoose from 'mongoose';

const forecastSchema = new mongoose.Schema({
ticker: String,
horizon: Number,
predictions: Object,
meta: Object,
createdAt: { type: Date, default: Date.now }
});


export default mongoose.model('Forecast', forecastSchema);