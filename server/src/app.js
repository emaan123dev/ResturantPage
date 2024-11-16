import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // allow requests from this origin
    // origin: process.env.CORS_ORIGIN, // allow requests from this origin
    credentials: true, // allow sending cookies
  })
);

app.use(
  express.json({
    extended: true, // parse extended JSON payloads && TO Allow to add json data
    limit: "16kb",
  })
);

app.use(express.urlencoded({ extended: true, limit: "16kb" })); // parse application/x-www-form-urlencoded MEANS it reads data from url in encoded form


// Router
import orderRouter from "./routes/order.routes.js";
app.use("/api/v1/orders", orderRouter);

app.get("/", (req, res) => {
  res.send("<h1>Welcome!</h1>");
});

export { app };
