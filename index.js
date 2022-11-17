import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import wordRoutes from "./routes/wordsRoutes.js";

const app = express();
dotenv.config({ path: ".env" });

app.use(bodyParser.json({ limit: { word: "30mb" }, extended: true }));
app.use(bodyParser.urlencoded({ limit: { word: "30mb" }, extended: true }));
app.use(cors());
app.use("/words", wordRoutes);

app.get("/", (req, res) => {
  res.send("Hello to the Wordle React Native Server !");
});

const PORT = process.env.PORT || 5000;

//connect to db
mongoose
  .connect(process.env.DB_CONNECTION_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running  at PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("error connecting db : ", err.message);
  });
