import notes, {categories, Note} from '../repository/notes';
import {parseDatesFromString, isStringOnlyDigits} from "../helpers/utility_functions";
import * as Yup from 'yup';

let nextId = notes.length + 1;

const isValidCategory = (category: string): boolean => {
    return categories.includes(category);
};

const getAllNotes = (): Note[] => {
    return notes;
};

type ErrorResponse = {
    message: string;
    errors: string[];
};

const addNote = (newNote: Omit<Note, 'id'> & { archived: boolean }): Note | ErrorResponse | string  => {
    const { name, created, category, content } = newNote;

    if (isStringOnlyDigits(name) || isStringOnlyDigits(category) || isStringOnlyDigits(content)){
        return "Fields must be string ";
    }

    const schema = Yup.object().shape({
        name: Yup.string().required('The field "name" is required.'),
        category: Yup.string()
            .oneOf(categories, `Invalid category. Please provide one of the following categories: ${categories.join(', ')}`)
            .required('The field "category" is required.'),
        content: Yup.string().trim().required('The field "content" is required.'),
    });

    try {
        schema.validateSync(newNote, { abortEarly: false });
    } catch (error) {
        if (error instanceof Yup.ValidationError) {
            const errors: string[] = error.inner.map((err) => err.message);
            return {
                message: `${errors.length} errors occurred.`,
                errors,
            };
        }
        throw new Error('An unknown error occurred during validation.');
    }

    const noteWithId: Note = {
        id: nextId,
        ...newNote
    };
    notes.push(noteWithId);
    nextId++;
    return noteWithId;
};

const updateNote = (id: number, updatedFields: Partial<Note>): Note | string => {
    const noteToUpdate = notes.find((note) => note.id === id);

    if (!noteToUpdate) {
        return 'Note not found';
    }

    if (updatedFields.category !== undefined && !isValidCategory(updatedFields.category)) {
        if(!isStringOnlyDigits(updatedFields.category)) {
            return `Invalid category: ${updatedFields.category}. Please provide one of the following categories: ${categories.join(', ')}`;
        } else {
            return "Field category must be string ";
        }
    }

    if (updatedFields.name !== undefined) {
        if(!isStringOnlyDigits(updatedFields.name)) {
            noteToUpdate.name = updatedFields.name;
        } else {
            return "Field name must be string ";
        }
    }

    if (updatedFields.category !== undefined) {
        noteToUpdate.category = updatedFields.category;
    }

    if (updatedFields.content !== undefined) {
        if(!isStringOnlyDigits(updatedFields.content)) {
            noteToUpdate.content = updatedFields.content;
            noteToUpdate.dates = parseDatesFromString(updatedFields.content);
        } else {
            return "Field content must be string ";
        }
    }

    if (updatedFields.archived !== undefined) {
        if (typeof updatedFields.archived !== 'boolean') {
            return 'Invalid value for "archived" field. It should be a boolean.';
        }
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

const getStats = (): any[] => {
    const stats: any[] = [];

    for (const category of categories) {
        const lowerCaseCategory = category.toLowerCase();

        const archivedCount = notes.filter((note) => note.category.toLowerCase() === lowerCaseCategory && note.archived).length;
        const activeCount = notes.filter((note) => note.category.toLowerCase() === lowerCaseCategory && !note.archived).length;

        stats.push({
            category,
            archivedCount,
            activeCount,
        });
    }

    return stats;
};


export default {
    getAllNotes,
    addNote,
    updateNote,
    deleteNoteById,
    toggleArchived,
    getStats,
};
