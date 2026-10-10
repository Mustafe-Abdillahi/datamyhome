import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose"
import userRouter from "./routes/user.js";
import authorRouter from "./routes/authorization.js"
import taskRouter from "./routes/task.js";
import LoggerMW from "./Middleware/LoggerMW.js";
import notFound from "./Middleware/notFound.js";
import ErorrHandler from "./Middleware/ErorrHandler.js";
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './utils/swagger.js';
import  { limiter } from './Middleware/rateLimiter.js'




dotenv.config();
const app=express();
app.use(helmet());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());

//custom middleware;

app.use(LoggerMW);
app.use(limiter)// must put before the root.
app.use('/dashboard', authorRouter)
app.use('/user',userRouter)
app.use('/task', taskRouter);
app.use(notFound);

//ErorrHandler put last line to get all errors
app.use(ErorrHandler);

// app.get("/", (req, res) => {
//   res.send("Hello from my server");
// });
// app.get("/", (req, res) => {
  //   res.json(data);
  // });

// connect mongoose


// mongoose.connect(
//   process.env.NODE_ENV == "development"
//     ? process.env.MONGO_URL
//     : process.env.MONGO_URL_PRO
// )
//   .then(() => console.log("✅mongoDb is connectedd"))
//   .catch((error) => console.log("❌ mongoDb is not connect"));
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL_PRO);

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
  }
};

connectDB();

  const port = process.env.PORT || 3000;

console.log(port)
//put morgan here to read the route type
app.use(morgan('short'))
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
