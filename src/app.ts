import express, { Request, Response } from 'express';
import notes from './notes';

const app = express();
const port = 3000;

app.get('/notes', (req: Request, res: Response) => {
    res.json(notes);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
