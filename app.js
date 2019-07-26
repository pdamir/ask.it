let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
const cors = require("cors");
const errorHandler = require("./helpers/error-handler");

require("dotenv").config();

let authRouter = require("./routes/auth");
let usersRouter = require("./routes/users");
let questionsRouter = require("./routes/questions");
let answersRouter = require("./routes/answers");

let app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
}

app.use(express.static(path.join(__dirname, "public"), { redirect: false }));

// **ALLOW CORS**** WARN: NOT SECURE - Should pass an options object checking for whitelisted defined whitelisted domains
app.use(cors());

app.use("/api", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/questions", questionsRouter);
app.use("/api/answers", answersRouter);

// serve React app from Express, just the production build
if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(errorHandler);

module.exports = app;
