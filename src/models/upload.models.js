import pool from "../db/index.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const addPostDataToDB = async (imageKeys, caption, location, userid) => {
  try {
    const query =
      "INSERT INTO Posts (user_id,caption, image_keys, location) VALUES ($1, $2, $3,$4) RETURNING *";
    const values = [userid, caption, imageKeys, location];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error following user: ${error.message}`);
  }
};

const getUserPostData = async (userId) => {
  try {
    const query = "SELECT Users.fullName, Users.email, Users.username,Users.userid,Posts.* FROM Posts JOIN Users ON Posts.user_id = Users.userId WHERE Posts.user_id = $1";
    const values = [userId];
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    throw new Error(`Error following user: ${error.message}`);
  }
};
const getAllPostData = async () => {
  try {
    const query = "SELECT Users.fullName, Users.email, Users.username,Users.userid,Posts.* FROM Posts JOIN users ON Posts.user_id = Users.userid";
    // const values = [userId];
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    throw new Error(`Error getting user post data: ${error.message}`);
  }
};

export { addPostDataToDB, getUserPostData, getAllPostData };
