import { throwError,sendSuccess } from "../utils/requestHandler.js";
import {
  findUserExist,
  createUser,
} from "../models/user.models.js";

const registerUser = async (req, res) => {
  const { email, fullName, username, password } = req.body;

  if (!email || email.trim() === "") {
    throwError(res, 400, "ValidationError", "Email field is required");
    return;
  }

  if (!fullName || !username || !password) {
    throwError(res, 400, "ValidationError", "All fields are required");
  }

  try {
    const userExist = await findUserExist(username, email);
    if (userExist.rowCount > 0) {
      throwError(
        res,
        409,
        "conflict",
        "User with email or username already exists"
      );
    }

    const { userId, accessToken, refreshToken } = await createUser({
      email,
      fullName,
      username,
      password,
    });
    return sendSuccess(
      res,
      "User registered successfully",
      { userId, accessToken, refreshToken },
      200
    );
  } catch (error) {
    console.log(error);
  }
};

export { registerUser };
