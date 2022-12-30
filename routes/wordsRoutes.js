import express from "express";
import {
  getWords,
  createWord,
  getWord,
  getRandomWords,
  wordExist,
} from "../controllers/wordsController.js";
const router = express.Router();

router.get("/", getWords);
router.post("/", createWord);
router.get("/word", getWord);
router.get("/randomWords", getRandomWords);
router.get("/exist", wordExist);

export default router;
