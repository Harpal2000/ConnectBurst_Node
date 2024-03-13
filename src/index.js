import express from 'express';
import pg from 'pg';

const app = express();

const { Pool } = pg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'connectburst',
  password: 'developer@123',
  port: 5433,
});

(async () => {

  try {
    const client = await pool.connect();

    console.log('Connected to PostgreSQL database!');

    await client.release();

  } catch (err) {
    console.error('Error connecting to database:', err);
  } finally {
    await pool.end();
  }

})();


app.listen(3000,()=>{
    console.log("connect to the port")
})
