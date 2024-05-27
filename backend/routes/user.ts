import express, { Handler } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { User } from "../models/user";

const app = express.Router();

const userHandler: Handler = async (request, response) => {
    const { id } = request.params;

    const user = await User.findOne({ _id: id }).exec();

    if (user === null) return response.status(404).json({
        status: 404,
        success: false,
        message: "User not found",
    });

    response.json(user.plans)
}

app.get("/plans", verifyToken, userHandler);

export default app;