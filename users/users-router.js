const router = require("express").Router();
const Users = require("./users-model.js");

router.get("/", async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json({ users, message: "Here are your users." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: "It's not you.  It's me." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (user) {
      res.status(200).json({ user, message: "Here is your user." });
    } else {
      res.status(404).json({ message: "No user by that id." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: "It's not you.  It's me." });
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await Users.insert(req.body);
    if (user) {
      res
        .status(201)
        .json({ user, message: "You have successfully added an item!" });
    } else {
      res.status(400).json({ message: "please include all required content" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "Unable to add this item, its not you.. its me"
    });
  }
});

module.exports = router;
