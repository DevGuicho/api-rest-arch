const express = require('express');
const boom = require('@hapi/boom');
const UsersService = require('../services/users');

// eslint-disable-next-line space-before-function-paren
function apiUsers(app) {
  const router = express.Router();
  app.use('/api/users', router);

  const userService = new UsersService();

  router.get('/', async (req, res, next) => {
    try {
      const users = await userService.getUsers();
      res.json({
        message: 'Users listed',
        data: users
      });
    } catch (error) {
      next(boom.badRequest(error));
    }
  });
  router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
      const user = await userService.getUser(id);
      res.json({
        message: 'User retrieved',
        data: user
      });
    } catch (error) {
      next(boom.badRequest(error));
    }
  });
  router.post('/', async (req, res, next) => {
    const user = req.body;
    try {
      const userCreated = await userService.createUser(user);
      res.status(201).json({
        message: 'User created',
        data: userCreated
      });
    } catch (error) {
      next(boom.badRequest(error));
    }
  });
  router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const user = req.body;
    try {
      const userUpdated = await userService.updateUser(id, user);
      res.json({
        message: 'User updated',
        data: userUpdated
      });
    } catch (error) {
      next(boom.badRequest(error));
    }
  });
  router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
      const userDeleted = await userService.deleteUser(id);
      res.json({
        message: 'User deleted',
        data: userDeleted
      });
    } catch (error) {
      next(boom.badRequest(error));
    }
  });
}

module.exports = apiUsers;
