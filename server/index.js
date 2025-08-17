require("dotenv").config();
const express = require("express");
const connection = require("./db");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoute = require("./routes/auth");
const hotelsRoute = require("./routes/hotels");
const userRoute = require("./routes/user");
const roomsRoute = require("./routes/rooms");

const app = express();

// connect to DB
connection();

// middlewares
app.use(cookieParser());
app.use(express.json());

// CORS configuration
const allowedOrigins = ["http://localhost:5173", "http://localhost:3000" , "https://stay-buddy-56h7.vercel.app" , "https://stay-buddy-peach.vercel.app"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // if you need cookies/auth headers
  })
);

// test route
app.get("/", (req, res) => {
  res.send("hello first request");
});

// API routes
app.use("/auth", authRoute);
app.use("/hotels", hotelsRoute);
app.use("/users", userRoute);
app.use("/rooms", roomsRoute);

// error handler
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const port = process.env.PORT || 8800;
app.listen(port, () => console.log(`Listening on port ${port}...`));
