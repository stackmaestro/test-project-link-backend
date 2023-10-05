const mongoose = require("mongoose");

const userModel = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      public_id: { type: String },
      url: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userModel);
