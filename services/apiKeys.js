const ApiKey = require('../models/ApiKey');

class ApiKeysService {
  // eslint-disable-next-line space-before-function-paren
  async getApiKey(token) {
    const apiKey = await ApiKey.findOne({ token });
    return apiKey;
  }
}

module.exports = ApiKeysService;
