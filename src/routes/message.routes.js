import { Router } from "express";
import { addUserMessages,getUserMessages} from "../controllers/message.controllers.js";


const router = Router();

router.route("/get_messages").post(getUserMessages)
router.route("/add_message").post(addUserMessages)

export default router;
