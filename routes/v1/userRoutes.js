const express = require("express");
const router = express.Router();
const {
  saveUser,
  getUser,
  getUsers,
} = require("../../controllers/userController");

router.get("/user/:id", getUser);
router.get("/users", getUsers);
router.post("/user", saveUser);

module.exports = router;
