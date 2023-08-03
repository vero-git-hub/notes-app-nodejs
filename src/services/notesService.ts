import notes, { Note } from '../repository/notes';

let nextId = notes.length + 1;

const getAllNotes = (): Note[] => {
    return notes;
};

const addNote = (newNote: Omit<Note, 'id'>): Note => {
    const noteWithId: Note = { id: nextId, ...newNote };
    notes.push(noteWithId);
    nextId++;
    return noteWithId;
};

export default {
    getAllNotes,
    addNote,
};
