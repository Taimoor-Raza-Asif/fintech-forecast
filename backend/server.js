import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import forecastRoutes from './routes/forecastRoutes.js';


dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/finforecast';


const app = express();
app.use(cors());
app.use(bodyParser.json());


// connect mongo
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> console.log('MongoDB connected'))
.catch(err => console.error('Mongo connect err', err));


app.use('/api', forecastRoutes);


app.get('/', (req, res)=> res.json({ok:true, version:'finforecast-backend'}));


app.listen(PORT, ()=> console.log(`Backend running on port ${PORT}`));