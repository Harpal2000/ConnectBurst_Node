import pool from "../db/index.js";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env",
});



const likePost = async (userId, postId) => {
    const query = 'INSERT INTO likes (user_id, post_id) VALUES ($1, $2)';
    await pool.query(query, [userId, postId]);
};

const dislikePost = async (userId, postId) => {
    const query = 'DELETE FROM likes WHERE user_id = $1 AND post_id = $2';
    await pool.query(query, [userId, postId]);
};

const isPostLikedByUser = async (userId, postId) => {
    const query = 'SELECT * FROM likes WHERE user_id = $1 AND post_id = $2';
    const res = await pool.query(query, [userId, postId]);
    return res.rows.length > 0;
};

const getLikeCount = async (postId) => {
    const query = 'SELECT COUNT(*) FROM likes WHERE post_id = $1';
    const res = await pool.query(query, [postId]);
    return parseInt(res.rows[0].count, 10);
};

export { likePost, dislikePost, isPostLikedByUser, getLikeCount };