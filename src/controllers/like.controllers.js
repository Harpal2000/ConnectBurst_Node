import {
    likePost, dislikePost, isPostLikedByUser
} from "../models/like.models.js";

const handleLikePost = async (req, res) => {
    const { userId, postId } = req.body;
    try {
        const isLiked = await isPostLikedByUser(userId, postId);

        if (isLiked) {
            await dislikePost(userId, postId);
            res.json({ message: 'Post disliked' });
        } else {
            await likePost(userId, postId);
            res.json({ message: 'Post liked' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};
const getPostLike = async (req, res) => {
    const { userId, postId } = req.body;
    try {
        const isLiked = await isPostLikedByUser(userId, postId);
        if (!isLiked) {
            res.json({ message: 'Post disliked' });
        } else {
            res.json({ message: 'Post liked' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};


export { handleLikePost, getPostLike };