import chalk from 'chalk';
import debug from 'debug';
import express from 'express';
import morgan from 'morgan';
import path from "path"
import sessionsRouter from "./src/routers/sessionsRouter.js";
import {fileURLToPath} from 'url';

const d = debug("app");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

const app = express();
app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, "public")));

app.set("views", "./src/views");
app.set("view engine", "ejs");


app.use("/sessions", sessionsRouter);

app.get("/", (request, response) => {
  response.render("index", {
    title: "Welcome to Globomantics"
  })
})

app.listen(PORT, function () {
  d(`Listening to port ${chalk.green(PORT)}`);
})