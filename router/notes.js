const express = require('express');
const NotesServices = require('../services/notes');
const boom = require('@hapi/boom');
const passport = require('passport');
const authErrorHandler = require('../middlewares/authHandler');

require('../utils/auth/strategies/jwt');
// eslint-disable-next-line space-before-function-paren
function apiNotes(app) {
  const router = express.Router();
  app.use('/api/notes', router);
  const notesService = new NotesServices();

  router.get('/', authErrorHandler, async (req, res, next) => {
    try {
      const notes = await notesService.getNotes();
      res.json({
        message: 'Notes listed',
        data: notes
      });
    } catch (error) {
      next(boom.badRequest());
    }
  });
  router.get(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
      const { id } = req.params;
      try {
        const note = await notesService.getNote(id);
        res.json({
          message: 'Note retrieved',
          data: note
        });
      } catch (error) {
        next(boom.badRequest(error));
      }
    }
  );
  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
      const note = req.body;
      try {
        const noteCreated = await notesService.createNote(note);
        res.status(201).json({
          message: 'note created',
          data: noteCreated
        });
      } catch (error) {
        next(boom.badRequest(error));
      }
    }
  );
  router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
      const { id } = req.params;
      const note = req.body;
      try {
        const noteUpdated = await notesService.updateNote(id, note);
        res.json({
          message: 'Nonte updated',
          data: noteUpdated
        });
      } catch (error) {
        next(boom.badRequest(error));
      }
    }
  );
  router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
      const { id } = req.params;
      try {
        const noteDeleted = await notesService.deleteNote(id);
        res.json({
          message: 'Note deleted',
          data: noteDeleted
        });
      } catch (error) {
        next(boom.badRequest(error));
      }
    }
  );
}

module.exports = apiNotes;
