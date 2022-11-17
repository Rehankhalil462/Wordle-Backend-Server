import mongoose from "mongoose";

const wordSchema = mongoose.Schema({
  word: String,
});

const word = mongoose.model("word", wordSchema);
export default word;
