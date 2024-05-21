import { Router } from "express";
import { handleLikePost, getPostLike } from "../controllers/like.controllers.js";


const router = Router();

router.route("/like_post").post(handleLikePost)
router.route("/get_likes").post(getPostLike)

export default router;