const Link = require("../models/linkModel");
const { verifyLink } = require("../utils/utils");

const addLinks = async (req, res) => {
  try {
    let { userId, links } = req.body;
    console.log(userId, links);
    let deleted = await Link.deleteMany({ userId });
    console.log("deleted: ", deleted);

    // for (let i = 0; i < links.length; i++) {
    //   delete links[i]._id;
    //   if (links[i].userId === undefined) {
    //     links[i].userId = userId;
    //   }
    //   console.log("what?", i);
    //   let savedLink = new Link(links[i]);
    //   await savedLink.save();
    // }
    // console.log("links: ", links);

    let savedLinks = await Link.insertMany(links);
    res.status(200).json([...savedLinks]);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const addLink = async (req, res) => {
  const { userId, link, platform } = req.body;
  try {
    await verifyLink(userId, link, platform);
    const linkObj = new Link({ link, platform, userId });
    await linkObj.save();
    res.status(200).json({ linkObj });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const removeLink = async (req, res) => {
  const { id } = req.params;
  try {
    await Link.findOneAndDelete({ _id: id });
    res.status(200).json({ status: "Successfully deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateLink = async (req, res) => {
  const { id } = req.params;
  const { link, platform } = req.body;
  try {
    const newLink = await Link.findOneAndUpdate(
      { _id: id },
      { link, platform },
      { new: true }
    );
    res.status(200).json({ link: newLink });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getLinks = async (req, res) => {
  const { userId } = req.params;
  try {
    const links = await Link.find({ userId });
    res.status(200).json(links);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { addLink, getLinks, removeLink, updateLink, addLinks };
