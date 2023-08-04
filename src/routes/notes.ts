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

    const newNote = notesService.addNote({ name, date, category, content, archived: false });
    res.status(201).json(newNote);
});

router.patch('/:id', (req: Request, res: Response) => {
    const idToUpdate = Number(req.params.id);
    const { name, category, content, archived } = req.body;

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
