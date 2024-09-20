import bcrypt from "bcrypt";
import User from "../models/UserModel.js";

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

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });
        await user.save();

        const { password: _, createdAt: __, updatedAt: ___, __v: ____, ...userData } = userExist.toObject();

        return res.status(200).json({ message: "User created successfully", User: userData });
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

        const { password: _, createdAt: __, updatedAt: ___, __v: ____, ...userData } = userExist.toObject();

        return res.status(200).json({ message: "User logged in successfully", user: userData });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

export { signUp, signIn };