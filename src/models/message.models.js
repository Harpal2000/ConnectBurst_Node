import pool from "../db/index.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});


const addMessage = async(sender_id, receiver_id, message)=>{
try {
    const query =
      "INSERT INTO messages (sender_id, receiver_id, message) VALUES ($1, $2, $3) RETURNING *";
    const values = [sender_id, receiver_id, message];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error following user: ${error.message}`);
  }
}

const getMessage = async(sender_id, receiver_id)=>{
try {
    const query = "SELECT * FROM messages WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1) ORDER BY created_at";
    const values = [sender_id, receiver_id];
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    throw new Error(`Error fetching follows: ${error.message}`);
  }
}

export {addMessage, getMessage}