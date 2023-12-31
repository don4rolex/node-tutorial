import chalk from "chalk";
import debug from "debug";
import express from "express";
import morgan from "morgan";
import path from "path";
import authRouter from "./src/routers/authRouter.js";
import adminRouter from "./src/routers/adminRouter.js";
import sessionsRouter from "./src/routers/sessionsRouter.js";
import {fileURLToPath} from "url";
import passport from "passport";
import cookieParser from "cookie-parser";
import session from "express-session";
import passportConfig from "./src/config/passport.js";

const d = debug("app");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

const app = express();
app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({secret: "globlomantics"}));

passportConfig(app);

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use("/admin", adminRouter);
app.use("/auth", authRouter);
app.use("/sessions", sessionsRouter);

app.get("/", (request, response) => {
  response.render("index", {
    title: "Welcome to Globomantics"
  })
})

app.listen(PORT, function () {
  d(`Listening to port ${chalk.green(PORT)}`);
})