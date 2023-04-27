const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./auth/Auth");
const musicRoute = require("./routes/MusicRoute");

const app = express();
dotenv.config();

app.use(express.json());

app.use("/api/", authRoute);
app.use("/api/", musicRoute);

//Connecting database
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

//Starting the server
app.listen(process.env.PORT, () =>
  console.log(`Server is running at ${process.env.PORT}`)
);
