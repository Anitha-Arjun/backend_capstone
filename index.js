import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import ordersRouter from "./routes/orders.js";
import productsRouter from "./routes/products.js";
import reviewsRouter from "./routes/reviews.js";
import usersRouter from "./routes/users.js";
import cors from "cors";

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
app.use(cors()); //allows backend to interact with frontend in the same machine

//Routes
app.get("/", (req, res) => {
  res.send("Backend For Capstone Project");
});

app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/users", usersRouter);

//Error Middleware
app.use((e, req, res, next) => {
  console.error(e);
  res.status(500).json({ message: e.message, error: e });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
