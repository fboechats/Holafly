import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
import mongoose from "mongoose";
import authRoutes from './routes/auth';
import userRoutes from './routes/user';

const app: Application = express();

let client: typeof mongoose;

app.use(cors());

dotenv.config();

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true,
    })
);

const PORT: number = 8000;

app.listen(PORT, async () => {
    console.log(`Server Fire on http:localhost//${PORT}`);

    try {
        client = await mongoose.connect(
            process.env.DATABASE_URL as string
        );

        console.log("Connected To Database");
    } catch (error) {
        console.log("Error to connect Database");
    }
});

app.use('/', [userRoutes, authRoutes])
