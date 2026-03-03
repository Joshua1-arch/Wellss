import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "Please provide a first name"],
        },
        lastName: {
            type: String,
            required: [true, "Please provide a last name"],
        },
        email: {
            type: String,
            required: [true, "Please provide an email"],
            unique: true,
        },
        phoneNumber: {
            type: String,
            required: [true, "Please provide a phone number"],
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
        },
        pin: {
            type: String,
            required: [true, "Please provide a 6-digit PIN"],
        },
    },
    { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
