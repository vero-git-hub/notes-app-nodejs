import express, { Request, Response } from 'express';
import notesService from '../services/notesService';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    const notes = notesService.getAllNotes();
    res.json(notes);
});

router.post('/', (req: Request, res: Response) => {
    const { name, date, category, content } = req.body;

    if (!name || !date || !category || !content) {
        return res.status(400).json({ message: 'The fields name, date, category, and content are required' });
    }

    const newNote = notesService.addNote({ name, date, category, content });
    res.status(201).json(newNote);
});

router.delete('/:id', (req: Request, res: Response) => {
    const idToDelete = Number(req.params.id);

    const deletedNote = notesService.deleteNoteById(idToDelete);

    if (!deletedNote) {
        return res.status(404).json({ message: 'Note not found' });
    }

    res.json(deletedNote);
});

export default router;
