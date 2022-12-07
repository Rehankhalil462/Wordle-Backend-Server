import mongoose from "mongoose";
import Word from "../models/word.js";

export const getWords = async (req, res) => {
  //   res.send("all words");
  try {
    const words = await Word.find();
    // console.log("words", words);
    res.status(200).json(words);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createWord = async (req, res) => {
  const word = req.body;
  const newWord = new Word(word);

  //   res.send("Word Creation");
  try {
    await newWord.save();
    res.status(201).json(newWord);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

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
