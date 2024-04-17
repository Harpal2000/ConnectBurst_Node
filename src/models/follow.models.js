import pool from "../db/index.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const getAllFollows = async (follower_id) => {
  try {
    const query = "SELECT * FROM Follows WHERE follower_id = $1";
    const values = [follower_id];
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    throw new Error(`Error fetching follows: ${error.message}`);
  }
};

const followUser = async (follower_id, following_id) => {
  try {
    const query =
      "INSERT INTO Follows (follower_id, following_id) VALUES ($1, $2) RETURNING *";
    const values = [follower_id, following_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error following user: ${error.message}`);
  }
};

const followBack = async (following_id) => {
  try {
    const query = "UPDATE Follows SET follow_back = $1 WHERE following_id = $2";
    const values = [following_id,following_id];
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    throw new Error(`Error while Follow Back: ${error.message}`);
  }
};


export { getAllFollows, followUser, followBack };
