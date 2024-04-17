import { throwError, sendSuccess } from "../utils/requestHandler.js";
import {
  findUserExist,
  createUser,
  updateRefreshToken,
  fetchAllUsers,
  fetchUserById,
} from "../models/user.models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateAccessAndRefreshTokens = async (
  userId,
  username,
  email,
  fullname
) => {
  try {
    const tokenData = {
      userId: userId,
      username: username,
      email: email,
      fullname: fullname,
    };
    const accessToken = jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
    const refreshToken = jwt.sign(
      { userId },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    );

    const storeRefreshToken = await updateRefreshToken(refreshToken, userId);
    if (!storeRefreshToken) {
      catchError(500, "Unable to store refresh token!");
    }
    return { accessToken, refreshToken };
  } catch (error) {
    catchError(
      500,
      "Something went wrong while generating refresh and access tokens"
    );
  }
};

const registerUser = async (req, res) => {
  const { email, fullname, username, password } = req.body;

  if (!email || email.trim() === "") {
    throwError(res, 400, "ValidationError", "Email field is required");
    return;
  }

  if (!fullname || !username || !password) {
    throwError(res, 400, "ValidationError", "All fields are required");
    return;
  }

  if (password.length < 6) {
    throwError(res, 400, "Password must be at least 6 characters!");
    return;
  }

  try {
    const userExist = await findUserExist(username, email);
    if (userExist.rowCount > 0) {
      throwError(
        res,
        409,
        "conflict",
        "User with this email or username already exists"
      );
      return;
    }

    const userData = await createUser({
      email,
      fullname,
      username,
      password,
    });
    return sendSuccess(res, "User registered successfully", userData, 200);
  } catch (error) {
    throwError(
      res,
      500,
      "ServerError",
      "Internal Server Error While Registering"
    );
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserExist(null, email);

    if (user.rowCount === 0) {
      throwError(
        res,
        401,
        "Unauthorized",
        "Unable to find this user with this username or email!"
      );
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!passwordMatch) {
      throwError(res, 401, "Unauthorized", "Invalid email or password");
      return;
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user.rows[0].userid,
      user.rows[0].username,
      user.rows[0].email,
      user.rows[0].fullname
    );

    const data = {
      userId: user.rows[0].userid,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };

    return sendSuccess(res, "User logged in successfully", data, 200);
  } catch (error) {
    throwError(res, 500, "ServerError", "Internal Server Error While Login!");
  }
};

const getAllUsers = async (req, res) => {
  const allUsers = await fetchAllUsers();
  return sendSuccess(res, "All Users Fetch Successfully", allUsers.rows, 200);
};

const getUserById = async (req, res) => {
  try {
    const { userid } = req.body;
    const userData = await fetchUserById(userid);
    return sendSuccess(res, "User data Fetch Successfully", userData.rows, 200);
  } catch (err) {
    console.log("Error! while fetch user data by Id", err);
  }
};

export { registerUser, loginUser, getAllUsers, getUserById };
