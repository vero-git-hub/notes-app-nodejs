import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import notes, { Note } from './notes';


const app = express();
const port = 3000;

let nextId = notes.length + 1;

app.use(bodyParser.json());

app.get('/notes', (req: Request, res: Response) => {
    res.json(notes);
});

app.post('/notes', (req: Request, res: Response) => {
    const { name, date, category, content } = req.body;

    if (!name || !date || !category || !content) {
        return res.status(400).json({ message: 'The fields name, date, category and content are required' });
    }

    const newNote: Note = {
        id: nextId,
        name,
        date,
        category,
        content,
    };

    notes.push(newNote);

    nextId++;

    res.status(201).json(newNote);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
