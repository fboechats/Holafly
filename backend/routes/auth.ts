import { compare } from "bcrypt";
import express, { Handler } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

const app = express.Router();

export const authHandler: Handler = async (request, response) => {
    try {
        const user = request.body;

        const { email, password } = user;

        const isUserExist = await User.findOne({
            email: email,
        });

        if (!isUserExist) {
            response.status(404).json({
                status: 404,
                success: false,
                message: "User not found",
            });
            return;
        }

        const isPasswordMatched = await compare(password, isUserExist?.password);

        if (!isPasswordMatched) {
            response.status(400).json({
                status: 400,
                success: false,
                message: "wrong password",
            });
            return;
        }

        const token = jwt.sign(
            { userId: isUserExist?._id, email: isUserExist?.email },
            process.env.JWT_SECRET!,
            {
                expiresIn: "1d",
            }
        );

        response.status(200).json({
            status: 200,
            success: true,
            message: "login success",
            token: token,
        });
    } catch (error: any) {
        response.status(400).json({
            status: 400,
            message: error.message.toString(),
        });
    }
}

app.post("/auth/login", authHandler);

export default app;