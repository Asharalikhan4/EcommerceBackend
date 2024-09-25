import jwt from "jsonwebtoken";

const GenerateToken = (userId, name, email) => {
    const payload = { userId, name, email };
    const options = { expiresIn: '1h' };

    if (process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    };

    return jwt.sign(payload, process.env.JWT_SECRET, options);
};

export default GenerateToken;