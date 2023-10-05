const User = require("../models/userModel");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dfxcinqzm",
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const saveUser = async (req, res) => {
  try {
    const { email, firstName, lastName, image } = req.body;
    let uploadResult = await cloudinary.uploader.upload(
      image,
      { folder: "users" },
      (error, result) => {
        if (error) {
          res.status(400).json({ error });
        }
      }
    );
    console.log(uploadResult);
    const newImage = {
      publid_id: uploadResult.public_id,
      url: uploadResult.url,
    };
    const user = new User({ email, firstName, lastName, image: newImage });
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { saveUser, getUsers, getUser };
