"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../models/db")); // Import DB connection
const router = (0, express_1.Router)();
router.get("/notes", async (req, res) => {
    try {
        const result = await db_1.default.pool.query("Select * from notes");
        res.send(result);
    }
    catch (err) {
        throw err;
    }
});
BigInt.prototype.toJSON = function () {
    return this.toString(); // Convert BigInt to string
};
router.post("/notes", async (req, res) => {
    const { content } = req.body;
    if (!content) {
        return res.status(400).send('Content is required');
    }
    try {
        const sql = "INSERT INTO notes (content) VALUES (?)";
        const result = await db_1.default.pool.query(sql, [content]);
        res.json({ message: 'Note added', insertId: result.insertId });
    }
    catch (err) {
        console.error('Error adding note:', err);
        res.status(500).send('Error adding note');
    }
});
router.delete("/notes/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        return res.status(400).send('Invalid ID');
    }
    try {
        const sql = "DELETE FROM notes WHERE id = ?";
        const result = await db_1.default.pool.query(sql, [id]); // Pass the ID as an array
        res.json({ message: 'Note deleted', affectedRows: result.affectedRows });
    }
    catch (err) {
        console.error('Error deleting note:', err);
        res.status(500).send('Error deleting note');
    }
});
exports.default = router;
