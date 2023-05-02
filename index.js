const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoute = require("./routes/AuthRoute");
const musicRoute = require("./routes/MusicRoute");
const errorHandler = require("./middleware/errorHandler");

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

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

//Error middleware
app.use(errorHandler);
