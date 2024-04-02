import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { catchError } from "../utils/requestHandler.js";
import pool from "../db/index.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
    const refreshToken = jwt.sign(
      { userId },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    );
    const query = `UPDATE users SET refreshtoken = $1 WHERE userid = $2`;
    await pool.query(query, [refreshToken, userId]);
    return { accessToken, refreshToken };
  } catch (error) {
    catchError(
      500,
      "Something went wrong while generating refresh and access tokens"
    );
  }
};

const createUser = async ({ fullName, email, username, password }) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `INSERT INTO users (fullName, email, username, password) VALUES ($1, $2, $3, $4) RETURNING userId`;
    const values = [fullName, email, username, hashedPassword];
    const result = await pool.query(query, values);
    const userId = result.rows[0].userid;

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      userId
    );

    return { userId, accessToken, refreshToken };
  } catch (error) {
    catchError(
      500,
      "Error! While registering user"
    );
  }
};

const findUserExist = async (username, email) => {
  try{
    const query = `SELECT * FROM users WHERE username = $1 OR email = $2`;
    const values = [username, email];
    const result = await pool.query(query, values);
    return result;
  }catch(error){
    catchError(
      500,
      "OOPS! User Already Exist"
    );
  }
};

export { createUser, findUserExist };
