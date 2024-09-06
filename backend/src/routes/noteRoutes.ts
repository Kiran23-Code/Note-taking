import { Router, Request, Response } from 'express';
import DB from '../models/db'; // Import DB connection

const router = Router();

router.get("/notes", async (req: Request, res: Response) => {
    try {
        const result = await DB.pool.query("Select * from notes");
        res.send(result);
    } catch (err) {
        throw err;
    }
});

(BigInt.prototype as any).toJSON = function() {
    return this.toString(); // Convert BigInt to string
};

router.post("/notes", async (req: Request, res: Response) => {

    const { content } = req.body;
    if (!content) {
        return res.status(400).send('Content is required');
    }

    try {
        const sql = "INSERT INTO notes (content) VALUES (?)";
        const result = await DB.pool.query(sql, [content]);
        res.json({ message: 'Note added', insertId: result.insertId });
    } catch (err) {
        console.error('Error adding note:', err);
        res.status(500).send('Error adding note');
    }
});


router.delete("/notes/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).send('Invalid ID');
    }

    try {
        const sql = "DELETE FROM notes WHERE id = ?";
        const result = await DB.pool.query(sql, [id]); // Pass the ID as an array
        res.json({ message: 'Note deleted', affectedRows: result.affectedRows });
    } catch (err) {
        console.error('Error deleting note:', err);
        res.status(500).send('Error deleting note');
    }
});


export default router;
