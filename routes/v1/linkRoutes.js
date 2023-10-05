const express = require("express");
const router = express.Router();
const {
  addLink,
  addLinks,
  getLinks,
  removeLink,
  updateLink,
} = require("../../controllers/linkController");

router.get("/links/:userId", getLinks);
//router.post("/link", addLink);
router.post("/links", addLinks);
router.patch("/link/:id", updateLink);
router.delete("/link/:id", removeLink);

module.exports = router;
