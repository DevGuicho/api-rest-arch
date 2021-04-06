/* eslint-disable space-before-function-paren */
// DEBUG=app:* node scripts/mongo/seedUsers.js
require('../../lib/mongoose');
const bcrypt = require('bcryptjs');
const chalk = require('chalk');
const debug = require('debug')('app:scripts:users');
const User = require('../../models/User');
const { config } = require('../../config/index');

const users = [
  {
    email: 'root@undefined.sh',
    name: 'ROOT',
    password: config.defaultAdminPassword,
    isAdmin: true
  },
  {
    email: 'jose@undefined.sh',
    name: 'Jose Maria',
    password: config.defaultUserPassword,
    isAdmin: false
  },
  {
    email: 'maria@undefined.sh',
    name: 'Maria Jose',
    password: config.defaultUserPassword,
    isAdmin: false
  }
];

async function createUser(user) {
  const { name, email, password, isAdmin } = user;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    isAdmin: Boolean(isAdmin)
  });
  await newUser.save();
  return newUser._id;
}

async function seedUsers() {
  try {
    const promises = users.map(async (user) => {
      const userId = await createUser(user);
      debug(chalk.green('User created with id:', userId));
    });

    await Promise.all(promises);
    return process.exit(0);
  } catch (error) {
    debug(chalk.red(error));
    process.exit(1);
  }
}

seedUsers();
