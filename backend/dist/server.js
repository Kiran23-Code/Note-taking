"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const noteRoutes_1 = __importDefault(require("./routes/noteRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); // parsing the incoming data 
app.use((0, cors_1.default)({ origin: 'http://localhost:3000' })); // Allow only specific origin
app.use('/api', noteRoutes_1.default); // Use notes router for '/api/notes'
app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});
