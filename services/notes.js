/* eslint-disable space-before-function-paren */
const Note = require('../models/User');

class NotesServices {
  async getNotes() {
    const notes = await Note.find({});
    return notes;
  }

  async getNote(id) {
    const note = await Note.findById(id);
    return note || {};
  }

  async createNote(note) {
    const newNote = new Note(note);
    const noteCreated = await newNote.save();
    return noteCreated || {};
  }

  async updateNote(id, note) {
    const noteUpdated = await Note.findOneAndUpdate({ _id: id }, note, {
      new: true
    });
    return noteUpdated;
  }

  async deleteNote(id) {
    const noteDelete = await Note.findOneAndDelete({ _id: id });
    return noteDelete;
  }
}

module.exports = NotesServices;
