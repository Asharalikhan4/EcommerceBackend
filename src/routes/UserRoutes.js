import express from "express";
const router = express.Router();

import { deleteUser, getAllUsers, getSingleUser, signIn, signUp } from "../controllers/UserControllers.js";

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/all-users", getAllUsers);
router.delete("/delete-user/:userId", deleteUser);
router.get("/:_id", getSingleUser);
router.delete("/:_id", deleteUser);

export default router;