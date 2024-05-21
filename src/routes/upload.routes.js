import { Router } from "express";
import { uploadFiles, getPostsByUserId, getPosts } from "../controllers/upload.controllers.js";
import multer from 'multer'

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


const router = Router();

router.post("/upload", upload.array("files"), uploadFiles);
router.post("/get-post", getPostsByUserId);
router.post("/get-all-post", getPosts);

export default router;
