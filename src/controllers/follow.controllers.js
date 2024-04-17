import { throwError, sendSuccess } from "../utils/requestHandler.js";
import {
  followBack,
  followUser,
  getAllFollows,
} from "../models/follow.models.js";

const allFollows = async (req, res) => {
  const { follower_id } = req.body;
  try {
    const follows = await getAllFollows(follower_id);
    return sendSuccess(res, "Followers Fetch Successfully", follows, 200);
  } catch (error) {
    throwError(
      res,
      500,
      "ServerError",
      "Internal Server Error While Fetching Followers!"
    );
  }
};

const followingUser = async (req, res) => {
  const { follower_id, following_id } = req.body;
  try {
    const newFollow = await followUser(follower_id, following_id);
    res.status(201).json({ success: true, data: newFollow });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const followBackUser = async (req, res) => {
   const {following_id } = req.body;
  try {
    const newFollow = await followBack( following_id);
    res.status(201).json({ success: true, data: newFollow });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export { allFollows, followingUser,followBackUser };
