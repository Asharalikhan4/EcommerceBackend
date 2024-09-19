import express from "express";
import { signIn, signUp } from "../userControllers/UserControllers.js";
const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);

export default router;