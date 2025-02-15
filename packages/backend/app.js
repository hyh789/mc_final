import cookieParser from "cookie-parser";
import express from "express";
import logger from "morgan";

import indexRouter from "./routes/index.js";

const app = express();

// disable etag
app.set("etag", false);

app.use((req, res, next) => {
  res.set("access-control-allow-origin", "*");
  res.set("access-control-allow-methods", "*");
  res.set("access-control-allow-headers", "*");
  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);

app.use((req, res, _next) => {
  res.status(404)
    .json({
      message: "404 error",
      url: req.url,
    });
});

// error handler
app.use((err, _req, res, _next) => {
  console.error("500 error", err);
  res.status(500)
    .json({ message: "error" });
});

export default app;
