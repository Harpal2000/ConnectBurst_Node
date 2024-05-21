import {
  uploadToS3,
  getImagesFromS3,
} from "../middlewares/upload.middlewares.js";
import { addPostDataToDB, getUserPostData, getAllPostData } from "../models/upload.models.js";
import { isPostLikedByUser } from "../models/like.models.js";

const uploadFiles = async (req, res) => {
  let files = req.files || [];
  // console.log(files)
  const { caption, location, userid } = req.body;
  // console.log(req.body)

  if (files.length === 0 && !req.file) {
    return res.status(400).send("No files were uploaded.");
  }

  if (!caption && !location) {
    return res.status(404).send("No caption and location found!.");
  }

  try {
    if (!Array.isArray(files)) {
      files = [files];
    }

    const imageKeys = await uploadToS3(files);

    // console.log(imageKeys)

    const imageIds = [];
    const imageId = await addPostDataToDB(imageKeys, caption, location, userid);
    imageIds.push(imageId);

    res
      .status(200)
      .json({ message: "Files uploaded successfully with details", imageIds });
  } catch (error) {
    console.error("Error uploading files: ", error);
    res.status(500).json({ error: "Error uploading files. Please try again." });
  }
};


const getPostsByUserId = async (req, res) => {
  const { userId } = req.body;

  try {
    const postData = await getUserPostData(userId);

    for (const post of postData) {
      post.images = await getImagesFromS3(post.image_keys);
    }
    res.status(200).json(postData);
  } catch (error) {
    console.error("Error fetching posts: ", error);
    res.status(500).json({ error: "Error fetching posts. Please try again." });
  }
};
const getPosts = async (req, res) => {
  const { userId } = req.body;
  try {
    const postData = await getAllPostData();

    for (const post of postData) {
      post.images = await getImagesFromS3(post.image_keys);
      post.isPostLikedByUser = await isPostLikedByUser(userId, post.post_id);
    }
    res.status(200).json(postData);
  } catch (error) {
    console.error("Error fetching posts: ", error);
    res.status(500).json({ error: "Error fetching posts. Please try again." });
  }
};

export { uploadFiles, getPostsByUserId, getPosts };
