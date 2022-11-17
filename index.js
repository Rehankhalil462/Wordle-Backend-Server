import express from "express";
import mongoose from "mongoose";
// import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import wordRoutes from "./routes/wordsRoutes.js";
dotenv.config();

const app = express();

app.use(cors());
app.use("/words", wordRoutes);

app.get("/", (req, res) => {
  res.send("Hello to the Wordle React Native Server !");
});

const PORT = process.env.PORT || 5000;

//connect to db
mongoose
  .connect(
    "mongodb+srv://wordle:wordle46294359@cluster0.7690a.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running  at PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("error connecting db : ", err.message);
  });
