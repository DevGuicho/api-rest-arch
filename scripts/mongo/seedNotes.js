/* eslint-disable space-before-function-paren */
// DEBUG=app:* node scripts/mongo/seedUsers.js
require('../../lib/mongoose');
const chalk = require('chalk');
const debug = require('debug')('app:scripts:users');
const NotesServices = require('../../services/notes');

const notes = [
  {
    content: 'Hola mundo en JS',
    user: '606c9cb905e4502108379250',
    important: true
  },
  {
    content: 'Hacer maquetado de CV en HTML',
    user: '606c9cb905e4502108379250',
    important: false
  },
  {
    content: 'Bucar empleo como Frontend JR',
    user: '606c9cb905e450210837924f',
    important: true
  },
  {
    content: 'Aprender una nuevo idioma',
    user: '606c9cb905e450210837924f',
    important: false
  }
];

const noteService = new NotesServices();

async function seedNotes() {
  try {
    let notesCreated = [];
    notesCreated = [...notesCreated, await noteService.createNote(notes[0])];
    notesCreated = [...notesCreated, await noteService.createNote(notes[1])];
    notesCreated = [...notesCreated, await noteService.createNote(notes[2])];
    notesCreated = [...notesCreated, await noteService.createNote(notes[3])];

    debug(
      chalk.green(`${notesCreated.length} movies have been created succesfully`)
    );
    return process.exit(0);
  } catch (error) {
    debug(chalk.red(error));
    process.exit(1);
  }
}

seedNotes();
