import mongoose from "mongoose";

const priceSchema = new mongoose.Schema({
  ticker: String,
  date: Date,
  open: Number,
  high: Number,
  low: Number,
  close: Number,
  volume: Number,
});

export default mongoose.model("Price", priceSchema);
