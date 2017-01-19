'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const vehicleSchema = Schema({
  license : {type: String, required:true},
  origin: {type: String, required:true},
  destination: {type: String, required:true},
  duration: {type: Number, required:true},
  startTime: {type: Number, required:true},
  user: { type: ObjectId, ref: 'User' }
});

module.exports = {
  schema: vehicleSchema,
  model: mongoose.model('Vehicle', vehicleSchema),
  registry: {
    urlTemplates: {
      "self": "http://127.0.0.1:3000/api/vehicles/{id}",
      "relationship": "http://127.0.0.1:3000/api/vehicles/{ownerId}/relationships/{path}"
    }
  }
};
