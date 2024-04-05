import { throwError,sendSuccess } from "../utils/requestHandler.js";
import jwt from "jsonwebtoken";
import pool from "../db/index.js";

const verifyJWT = async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const userId = decodedToken.userId;

        const query = `SELECT * FROM users WHERE user_id = $1`;
        const result = await pool.query(query, [userId]);
        const user = result.rows[0];

        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error.message || "Invalid access token");
    }
};

export { verifyJWT };
