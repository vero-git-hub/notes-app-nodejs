import notes, { Note } from '../repository/notes';

let nextId = notes.length + 1;

const getAllNotes = (): Note[] => {
    return notes;
};

const addNote = (newNote: Omit<Note, 'id'> & { archived: boolean }): Note => {
    const noteWithId: Note = { id: nextId, ...newNote };
    notes.push(noteWithId);
    nextId++;
    return noteWithId;
};

const deleteNoteById = (id: number): Note | null => {
    const noteIndex = notes.findIndex((note) => note.id === id);

    if (noteIndex === -1) {
        return null;
    }

    const deletedNote = notes.splice(noteIndex, 1)[0];
    return deletedNote;
};


export default {
    getAllNotes,
    addNote,
    deleteNoteById,
};
