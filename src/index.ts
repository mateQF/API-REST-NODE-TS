import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from './router'
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello world!</h1>");
});

const server = http.createServer(app);
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}/`);
});

const MONGO_URL = process.env.MONGO_DB_URI;
mongoose.Promise = Promise;

mongoose.connect(MONGO_URL).then(() => console.log("Connected to MongoDB"))
mongoose.connection.on("error", (error: Error) => console.error(error))

app.use('/', router())