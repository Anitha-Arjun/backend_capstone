import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
//import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

//Connect to database
try {
  await mongoose.connect(process.env.MONGODB_URI);
} catch (error) {
  console.error(error);
}
//middleware
app.use(morgan("dev")); //logger
app.use(express.json()); //parse data to the body
app.use(express.urlencoded({ extended: true }));
// app.use(cors()); //allows backend to talk to frontend in the same machine

//Routes
app.get("/", (req, res) => {
  res.send("Backend For Capstone Project");
});

// app.use("/api/products", productsRouter);

//Error Middleware
app.use((e, req, res, next) => {
  console.error(e);
  res.status(500).json({ message: e.message, error: e });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
