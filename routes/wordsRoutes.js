import express from "express";
import { getWords, createWord } from "../controllers/wordsController.js";
const router = express.Router();

router.get("/", getWords);
router.post("/", createWord);

export default router;
