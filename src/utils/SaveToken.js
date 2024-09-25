import User from "../models/UserModel.js";

const SaveToken = async (userId, token) => {
    try {
      await User.updateOne({ _id: userId }, { $set: { token } });
    } catch (error) {
      throw new Error('Failed to save token');
    }
};

export default SaveToken;