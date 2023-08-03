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

const updateNote = (id: number, updatedFields: Partial<Note>): Note | null => {
    const noteToUpdate = notes.find((note) => note.id === id);

    if (!noteToUpdate) {
        return null;
    }

    if (updatedFields.name !== undefined) {
        noteToUpdate.name = updatedFields.name;
    }

    if (updatedFields.date !== undefined) {
        noteToUpdate.date = updatedFields.date;
    }

    if (updatedFields.category !== undefined) {
        noteToUpdate.category = updatedFields.category;
    }

    if (updatedFields.content !== undefined) {
        noteToUpdate.content = updatedFields.content;
    }

    if (updatedFields.archived !== undefined) {
        noteToUpdate.archived = updatedFields.archived;
    }

    return noteToUpdate;
};

const deleteNoteById = (id: number): Note | null => {
    const noteIndex = notes.findIndex((note) => note.id === id);

    if (noteIndex === -1) {
        return null;
    }

    const deletedNote = notes.splice(noteIndex, 1)[0];
    return deletedNote;
};

const toggleArchived = (id: number): Note | null => {
    const noteToUpdate = notes.find((note) => note.id === id);

    if (!noteToUpdate || !noteToUpdate.archived) {
        return null;
    }

    noteToUpdate.archived = false;
    return noteToUpdate;
};

export default {
    getAllNotes,
    addNote,
    updateNote,
    deleteNoteById,
    toggleArchived,
};
