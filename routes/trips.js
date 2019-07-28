const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Trip = mongoose.model('trips');

router.get('/', function(req, res, next) {
  Trip.find({}, function (err, trips) {
    res.send(trips);
  })
});

router.post('/', function(req, res, next) {
  const trip = new Trip(req.body);
  trip.save();
  res.send(trip);
});

module.exports = router;
