import mongoose from "mongoose";
import Word from "../models/word.js";

//get all words

export const getWords = async (req, res) => {
  try {
    const words = await Word.find();
    res.status(200).json(words);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
//create one word

export const createWord = async (req, res) => {
  if (req?.body?.name === "") {
    res.status(400).json({ message: "No parameter." });
    return;
  } else if (req?.body?.name?.length > 5 || req?.body?.name?.length < 5) {
    res.status(400).json({ message: "Length of word should be exactly 5." });
    return;
  }
  const word = req.body.name;
  const newWord = new Word({ word: word });

  try {
    await newWord.save();
    res.status(201).json(newWord);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// get only one random word

export const getWord = async (req, res) => {
  try {
    Word.countDocuments().exec((err, count) => {
      var random = Math.floor(Math.random() * count);

      Word.findOne()
        .skip(random)
        .exec((err, result) => {
          res.status(200).json(result);
        });
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//random words with required number of records in the query param otherwise 100 records

export const getRandomWords = async (req, res) => {
  let wordsSize = req?.query?.wordsSize ? req?.query?.wordsSize : 100;

  try {
    const result = await Word.aggregate([
      { $sample: { size: Number(wordsSize) } },
    ]);

    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//check if word exists, then return the found word document and if not, then return error

export const wordExist = async (req, res) => {
  let word = req?.query?.word ? req?.query?.word : "";
  if (word === "") {
    res.status(400).json({ message: "No parameter." });
    return;
  }

  try {
    const result = await Word.exists({ word: word });
    if (result) {
      const found = await Word.findById(result._id);

      res.status(200).json({ found, message: "Wow. You Found It !" });
    } else {
      res.status(404).json({ message: "Word not found." });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
