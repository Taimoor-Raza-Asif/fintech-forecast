import mongoose from "mongoose";
import csv from "csvtojson";
import dotenv from "dotenv";
import Price from "./models/priceModel.js";

dotenv.config();

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/finforecast";

async function importData() {
  try {
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB");

    // delete old data
    await Price.deleteMany();
    console.log("🧹 Cleared existing price records");

    const tickers = ["AAPL", "MSFT", "BTC-USD"];

    for (const ticker of tickers) {
      const filePath = `../ml-service/data/${ticker}_dataset.csv`;
      console.log(`📥 Importing ${filePath} ...`);

      const jsonArray = await csv().fromFile(filePath);

      const docs = jsonArray.map((r) => ({
        ticker,
        date: new Date(r.Date),
        open: parseFloat(r.Open),
        high: parseFloat(r.High),
        low: parseFloat(r.Low),
        close: parseFloat(r.Close),
        volume: parseInt(r.Volume || 0),
      }));

      await Price.insertMany(docs);
      console.log(`✅ Imported ${docs.length} rows for ${ticker}`);
    }

    console.log("🌱 Database seeding complete!");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
}

importData();
