var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mariadb_1 = __importDefault(require("mariadb"));
const pool = mariadb_1.default.createPool({
    host: 'localhost',
    port: 3305,
    user: 'root',
    password: 'root',
    database: 'notetaking',
    connectionLimit: 5
});
exports.default = {
    pool
};
