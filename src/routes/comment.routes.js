import { Router } from "express";
import { handleAddComment, handleGetComments } from "../controllers/Comment.controllers.js";


const router = Router();

router.post("/add_comment", handleAddComment);
router.post("/get_comments", handleGetComments);

export default router;
