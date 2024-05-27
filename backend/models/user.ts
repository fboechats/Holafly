import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        plans: [{
            status: String,
            dateStart: String,
            dateEnd: String,
            flag: String,
            country: String,
            plan: String,
            comsuption: {
                totalComsumption: Number,
            },
        }]
    },
    { timestamps: true }
);

export const User = mongoose.model("Users", UserSchema);