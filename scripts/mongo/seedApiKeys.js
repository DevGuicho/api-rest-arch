/* eslint-disable space-before-function-paren */
// DEBUG=app:* node scripts/mongo/seedApiKeys.js
require('../../lib/mongoose');
const chalk = require('chalk');
const crypto = require('crypto');
const ApiKey = require('../../models/ApiKey');
const debug = require('debug')('app:scripts:api-keys');

const adminScopes = [
  'signin:auth',
  'signup:auth',
  'read:notes',
  'create:notes',
  'update:notes',
  'delete:notes',
  'create:users',
  'update:users',
  'delete:users',
  'read:users'
];

const publicScopes = [
  'signin:auth',
  'signup:auth',
  'read:movies',
  'read:notes',
  'create:notes',
  'delete:notes'
];

const apiKeys = [
  {
    token: generateRandomToken(),
    scopes: [...adminScopes]
  },
  {
    token: generateRandomToken(),
    scopes: [...publicScopes]
  }
];

function generateRandomToken() {
  const buffer = crypto.randomBytes(32);
  return buffer.toString('hex');
}

async function seedApiKeys() {
  try {
    const promises = apiKeys.map(async (apiKey) => {
      const newApiKey = new ApiKey(apiKey);
      await newApiKey.save();
    });

    await Promise.all(promises);
    debug(chalk.green(`${promises.length} api keys have been created succesfully`)); // prettier-ignore
    return process.exit(0);
  } catch (error) {
    debug(chalk.red(error));
    process.exit(1);
  }
}

seedApiKeys();
