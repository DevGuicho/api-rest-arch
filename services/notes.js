/* eslint-disable space-before-function-paren */
const Note = require('../models/Note');
const UsersService = require('./users');

class NotesServices {
  constructor() {
    this.userService = new UsersService();
  }

  async getNotes() {
    const notes = await Note.find({});
    return notes;
  }

  async getNote(id) {
    const note = await (await Note.findById(id)).populate('user');
    return note || {};
  }

  async createNote(note) {
    const user = await this.userService.getUser(note.user);

    const newNote = new Note({ ...note, date: new Date(), user: user._id });
    console.log(newNote);

    const noteCreated = await newNote.save();

    user.notes = user.notes.concat(noteCreated._id);
    await user.save();
    return noteCreated || {};
  }

  async updateNote(id, note) {
    const noteUpdated = await Note.findOneAndUpdate({ _id: id }, note, {
      new: true
    });
    return noteUpdated;
  }

  async deleteNote(id) {
    const noteDelete = await Note.findByIdAndDelete(id);
    const user = await this.userService.getUser(noteDelete.user);
    user.notes = user.notes.filter((note) => note.toString() !== id);
    await user.save();
    return noteDelete;
  }
}

module.exports = NotesServices;
