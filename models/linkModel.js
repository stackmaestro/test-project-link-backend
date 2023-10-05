const mongoose = require("mongoose");

const linkModel = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    platform: {
      type: String,
      enum: ["YouTube", "LinkedIn", "GitHub", "Instagram", "Facebook"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Link", linkModel);
