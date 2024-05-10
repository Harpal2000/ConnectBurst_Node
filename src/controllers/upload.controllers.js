import {
  uploadToS3,
  getImagesFromS3,
} from "../middlewares/upload.middlewares.js";
import { addPostDataToDB, getUserPostData } from "../models/upload.models.js";

const uploadFiles = async (req, res) => {
  let files = req.files || [];
  const { caption, location, userid } = req.body;

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

    const imageIds = [];

    for (const imageKey of imageKeys) {
      const imageId = await addPostDataToDB(imageKey, caption, location, userid);
      imageIds.push(imageId);
    }

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
    // const query = 'SELECT caption, image_url, location FROM Posts WHERE user_id = $1';
    // const { rows } = await pool.query(query, [userId]);

    // if (rows.length === 0) {
    //   return res.status(404).json({ message: 'No posts found for the specified user.' });
    // }

    // const posts = rows.map((row) => ({
    //   caption: row.caption,
    //   imageUrl: row.image_url,
    //   location: row.location,
    // }));

    res.status(200).json(postData);
  } catch (error) {
    console.error("Error fetching posts: ", error);
    res.status(500).json({ error: "Error fetching posts. Please try again." });
  }
};

export { uploadFiles, getPostsByUserId };
