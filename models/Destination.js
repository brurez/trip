const mongoose = require("mongoose");
const { Schema } = mongoose;

const destinationSchema = new Schema({
  country: { type: String },
  city: { type: String },
  hotelAddress: { type: String },
  travellers: { type: String, default: 1 },
  budget: { type: String, default: 1 },
  startDate: { type: Date, default: new Date() },
  endDate: { type: Date, default: new Date() }
});

module.exports = destinationSchema;
