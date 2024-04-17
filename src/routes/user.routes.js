import { Router } from "express";
import { registerUser,loginUser,getAllUsers,getUserById } from "../controllers/user.controllers.js";


const router = Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/all_users").get(getAllUsers)
router.route("/current_user").post(getUserById)

export default router;
