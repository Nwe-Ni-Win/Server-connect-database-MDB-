import express from "express";
import cors from "cors";
import router from "./routes/test.js";

const app = express();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use("/test", router);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

export { app };
