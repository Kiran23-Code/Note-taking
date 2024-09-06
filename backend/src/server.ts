import express from "express";
import notesRouter from './routes/noteRoutes'
import cors from 'cors';

const app = express();

app.use(express.json()); // parsing the incoming data 

app.use(cors({ origin: 'http://localhost:3000' })); // Allow only specific origin

app.use('/api', notesRouter); // Use notes router for '/api/notes'

app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});

