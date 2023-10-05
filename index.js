const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
require("dotenv").config();

const userRoutes = require("./routes/v1/userRoutes");
const linkRoutes = require("./routes/v1/linkRoutes");

app.use(cors());

app.use(express.json({ limit: "5mb", extended: true }));
app.use(
  express.urlencoded({ limit: "5mb", extended: true, parameterLimit: 50000 })
);

app.use("/api/v1", linkRoutes);
app.use("/api/v1", userRoutes);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("Listening!!");
    });
  })
  .catch((error) => {
    console.log("DB Error: ", error.message);
  });
