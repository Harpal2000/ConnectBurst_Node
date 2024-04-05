import bcrypt from "bcrypt";
import { catchError } from "../utils/requestHandler.js";
import pool from "../db/index.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const createUser = async ({ fullname, email, username, password }) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `INSERT INTO users (fullName, email, username, password) VALUES ($1, $2, $3, $4) RETURNING userId`;
    const values = [fullname, email, username, hashedPassword];
    const result = await pool.query(query, values);
    const userData = {
      userId: result?.rows[0]?.userid,
      fullname: fullname,
      email: email,
      username: username,
    };
    return userData;
  } catch (error) {
    catchError(500, "Error! While registering user");
  }
};

const findUserExist = async (username, email) => {
  if (username & email) {
    try {
      const query = `SELECT * FROM users WHERE username = $1 OR email = $2`;
      const values = [username, email];
      const result = await pool.query(query, values);
      return result;
    } catch (error) {
      catchError(500, "OOPS! User Already Exist");
    }
  } else if (email) {
    try {
      const query = `SELECT * FROM users WHERE email = $1`;
      const values = [email];
      const result = await pool.query(query, values);
      return result;
    } catch (error) {
      catchError(500, "OOPS! User Already Exist");
    }
  } else {
    try {
      const query = `SELECT * FROM users WHERE username = $1`;
      const values = [username];
      const result = await pool.query(query, values);
      return result;
    } catch (error) {
      catchError(500, "OOPS! User Already Exist");
    }
  }
};

const updateRefreshToken = async (refreshToken, userId) => {
  try {
    const query = `UPDATE users SET refreshtoken = $1 WHERE userid = $2`;
    await pool.query(query, [refreshToken, userId]);
    return { refreshToken };
  } catch (error) {
    catchError(500, "Error! While storing refresh token");
  }
};

export { createUser, findUserExist, updateRefreshToken };
