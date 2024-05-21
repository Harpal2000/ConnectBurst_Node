import {
    addComment, getComments
} from "../models/comment.models.js";

const handleAddComment = async (req, res) => {
    const { userId, postId, comment } = req.body;
    try {
        await addComment(userId, postId, comment);
        res.json({ message: 'Comment added' });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

const handleGetComments = async (req, res) => {
    const { postId } = req.body;

    try {
        const comments = await getComments(postId);
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

export { handleAddComment, handleGetComments }