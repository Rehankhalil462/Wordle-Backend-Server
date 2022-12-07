import express from "express";
import {
  getWords,
  createWord,
  getWord,
} from "../controllers/wordsController.js";
const router = express.Router();

router.get("/", getWords);
router.post("/", createWord);
router.get("/word", getWord);

export default router;
