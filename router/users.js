const express = require('express');

// eslint-disable-next-line space-before-function-paren
function apiUsers(app) {
  const router = express.Router();
  app.use('/api/users', router);

  router.get('/', (req, res) => {
    res.json({
      hola: 'mundo'
    });
  });
  router.get('/:id', (req, res) => {});
  router.post('/', (req, res) => {});
  router.put('/:id', (req, res) => {});
  router.delete('/:id', (req, res) => {});
}

module.exports = apiUsers;
