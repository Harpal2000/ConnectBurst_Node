import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "connectburst",
  password: "developer@123",
  port: 5433,
});

const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log("\nPostgreSQL Connected to",`"`,client.database,`"`,"Database at PORT", client.port,"!!");
  } catch (error) {
    console.log("PostgreSQL Connection Failed", error);
  }
};

export default connectDB;
