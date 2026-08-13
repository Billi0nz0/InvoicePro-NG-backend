import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import userIdGen from "../middlewares/userId.js";

const userSchema = new mongoose.Schema(
    {
        userId: {type: String, default: userIdGen, unique: true},
        fullName: {type: String, required:true, },
        businessName: {type: String, default: null, },
        businessLogo: { type: String, default: null},
        email: {type: String, required: true, unique: true,  match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]},
        role: {type: String, enum: ['user', 'admin', 'superAdmin'], default: 'user'},
        password: {type: String, required: true, minlength: 8},
        

        isVerified: { type: Boolean, default: false, },
        resetPasswordToken: { type: String },
        resetPasswordExpires: { type: Date },

    }, {timestamps: true}   
);

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model("User", userSchema);

export default User;
