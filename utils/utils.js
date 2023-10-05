const User = require("../models/userModel");
const Link = require("../models/linkModel");

const verifyLink = async (userId, link, platform) => {
  let userLink = await Link.findOne({ userId });

  if (userLink && (userLink.link === link || userLink.platform === platform)) {
    throw new Error("Link already exists. Cannot create two same links.");
  }
};

module.exports = { verifyLink };
