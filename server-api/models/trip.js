'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const tripSchema = Schema({
  startPosition : {type: String, required:true},
  endPosition: {type: String, required:true},
  vehicles: [{ type: ObjectId, ref: 'Vehicle' }],
  user: {type: ObjectId, ref: 'User'}
});

module.exports = {
  schema: tripSchema,
  model: mongoose.model('Trip', tripSchema),
  registry: {
    urlTemplates: {
      "self": "http://127.0.0.1:3000/api/trips/{id}",
      "relationship": "http://127.0.0.1:3000/api/trips/{ownerId}/relationships/{path}"
    }
  }
};
