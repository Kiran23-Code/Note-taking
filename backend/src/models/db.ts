import mariadb from 'mariadb';

const pool = mariadb.createPool({
  host: 'localhost',
  port: 3305,
  user: 'root',
  password: 'root',
  database: 'notetaking',
  connectionLimit: 5
});

export default{
  pool
}