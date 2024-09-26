import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import SaveToken from "../utils/SaveToken.js";

const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(202).json({ message: "All fields are required" });
        };

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(202).json({ message: "User already exist, Please Login." });
        };

        const hashedPassword = await bcrypt.hash(password, salt);

        const token = jwt.sign({ userId: userExist._id, name: userExist.name, email: userExist.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const user = new User({
            name,
            email,
            password: hashedPassword,
            token,
        });
        await user.save();

        const { password: _, createdAt: __, updatedAt: ___, __v: ____, ...userData } = userExist.toObject();

        return res.status(200).json({ message: "User created successfully", user: userData, token: token });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", Error: error });
    }
};

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(202).json({ message: "All fields are required" });
        };

        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(202).json({ message: "User not found" });
        };

        const isPasswordValid = await bcrypt.compare(password, userExist?.password);
        if (!isPasswordValid) {
            return res.status(202).json({ message: "Invalid credentials" });
        };

        const token = jwt.sign({ userId: userExist._id, name: userExist.name, email: userExist.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        await SaveToken(userExist._id, token);

        const { password: _, createdAt: __, updatedAt: ___, __v: ____, ...userData } = userExist.toObject();

        return res.status(200).json({ message: "User logged in successfully", user: userData, token: token });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json({ message: "Latest users fetched successfully.", users: users });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndDelete({ userId });
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error });
    }
}

const getSingleUser = async (req, res) => {
    try {
        const { _id } = req.params;
        const user = await User.findById({ _id });
        return res.status(200).json({ message: "User fetched successfully", user: user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", error: error });
    }
};

const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, email, password } = req.body;
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error });
    };
}

export { signUp, signIn, getAllUsers, deleteUser, getSingleUser };