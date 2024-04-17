import { Router } from "express";
import { allFollows, followingUser,followBackUser} from "../controllers/follow.controllers.js";


const router = Router();

router.route("/all_followers").post(allFollows)
router.route("/follow_user").post(followingUser)
router.route("/follow_back").post(followBackUser)

export default router;
