import express, { Request, Response } from 'express';
import notesService from '../services/notesService';
import {getCurrentFormattedDate, parseDatesFromString} from "../helpers/utility_functions";
import {allowedFields} from "../repository/notes";

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    const notes = notesService.getAllNotes();
    res.json(notes);
});

router.post('/', (req: Request, res: Response) => {
    const unknownFields = Object.keys(req.body).filter(field => !allowedFields.includes(field));
    if (unknownFields.length > 0) {
        return res.status(400).json({ message: `Unknown fields: ${unknownFields.join(', ')}` });
    }

    const { name, category, content } = req.body;

    const created = getCurrentFormattedDate();
    const dates = parseDatesFromString(content);

    const newNote = notesService.addNote({ name, created, category, content, dates, archived: false });
    if (typeof newNote === 'string') {
        return res.status(400).json({ message: newNote });
    }
    res.status(201).json(newNote);
});

router.patch('/:id', (req: Request, res: Response) => {
    const idToUpdate = Number(req.params.id);
    const { name, category, content, archived } = req.body;

    const unknownFields = Object.keys(req.body).filter(field => !allowedFields.includes(field));
    if (unknownFields.length > 0) {
        return res.status(400).json({ message: `Unknown fields: ${unknownFields.join(', ')}` });
    }

    const updatedNote = notesService.updateNote(idToUpdate, { name, category, content, archived });
    if (!updatedNote) {
        return res.status(404).json({ message: 'Note not found' });
    }

    res.json(updatedNote);
});

router.delete('/:id', (req: Request, res: Response) => {
    const idToDelete = Number(req.params.id);

    const deletedNote = notesService.deleteNoteById(idToDelete);

    if (!deletedNote) {
        return res.status(404).json({ message: 'Note not found' });
    }

    res.json(deletedNote);
});

router.get('/stats', (req: Request, res: Response) => {
    const stats = notesService.getStats();
    res.json(stats);
});

router.get('/:id', (req: Request, res: Response) => {
    const idToUpdate = Number(req.params.id);

    const updatedNote = notesService.toggleArchived(idToUpdate);

    if (!updatedNote) {
        return res.status(404).json({ message: 'Note not found or archived is already false' });
    }

    res.json(updatedNote);
});

export default router;
