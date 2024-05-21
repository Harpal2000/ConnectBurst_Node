import pool from "../db/index.js";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env",
});


const addComment = async (userId, postId, comment) => {
    const query = 'INSERT INTO comments (user_id, post_id, comment_text) VALUES ($1, $2, $3)';
    await pool.query(query, [userId, postId, comment]);
};

const getComments = async (postId) => {
    const query = 'SELECT c.comment_id, c.comment_text, c.created_at, u.userid, u.email, u.fullname, u.username FROM  Comments c JOIN Users u ON c.user_id = u.userid WHERE c.post_id = $1 ORDER BY c.created_at DESC';
    const res = await pool.query(query, [postId]);
    return res.rows;
};

export { addComment, getComments };