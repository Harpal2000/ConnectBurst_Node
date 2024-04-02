import pg from "pg";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
const { Pool } = pg;

const db_config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

const pool = new Pool(db_config);

const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log(
      "\nPostgreSQL Connected to",
      `"`,
      client.database,
      `"`,
      "Database at PORT",
      client.port,
      "!!"
    );
    return pool;
  } catch (error) {
    console.log("PostgreSQL Connection Failed", error);
    throw error;
  }
};

export default pool;

export { connectDB };
