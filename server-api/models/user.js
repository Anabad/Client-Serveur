'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = Schema({
  name : {type: String, required:true},
  vehicles: [{ type: ObjectId, ref: 'Vehicle' }],
  trips: [{type: ObjectId, ref: 'Trip'}]
});

module.exports = {
  schema: userSchema,
  model: mongoose.model('User', userSchema),
  registry: {
    urlTemplates: {
      "self": "http://127.0.0.1:3000/api/users/{id}",
      "relationship": "http://127.0.0.1:3000/api/users/{ownerId}/relationships/{path}"
    }
  }
};
