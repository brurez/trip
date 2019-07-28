const destinationSchema = require("./Destination");

const mongoose = require('mongoose');
const { Schema } = mongoose;

const tripSchema = new Schema({
  name: { type: String },
  destinations: [ destinationSchema ],
  createdAt: { type: Date, default: new Date() }
});

mongoose.model('trips', tripSchema);
