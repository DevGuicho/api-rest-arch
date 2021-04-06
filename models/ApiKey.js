const { Schema, model } = require('mongoose');

const apiKeySchema = new Schema({
  token: String,
  scopes: [String]
});

apiKeySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const ApiKey = model('Api-Keys', apiKeySchema);

module.exports = ApiKey;
