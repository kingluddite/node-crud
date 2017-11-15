const fs = require('fs');

const fetchNotes = () => {
  try {
    const notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
};

const saveNotes = notes => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

const addNote = (title, body) => {
  const notes = fetchNotes();
  const note = {
    title,
    body,
  };

  const duplicateNotes = notes.filter(note => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

const getAll = () => fetchNotes();

const getNote = title => {
  // fetch notes
  const notes = fetchNotes();
  // only return notes who's tite matches tite arg
  const filteredNotes = notes.filter(note => note.title === title);

  return filteredNotes[0];
};

const removeNote = title => {
  // fetch notes
  const notes = fetchNotes();
  // filter notes, removing the one with title of argument
  const filteredNotes = notes.filter(note => note.title !== title);
  // save new notes array
  saveNotes(filteredNotes);

  // if return true, a note was removed
  // if return false, no not was removed
  return notes.length !== filteredNotes.length;
};

const logNote = note => {
  console.log('-xxx-');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote,
};
