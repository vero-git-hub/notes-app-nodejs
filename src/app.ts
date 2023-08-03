import express from 'express';
import bodyParser from 'body-parser';
import notesRouter from './routes/notes';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/notes', notesRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
