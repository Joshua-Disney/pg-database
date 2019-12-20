const router = require("express").Router();
const Messages = require("./messages-model.js");

router.get("/", async (req, res) => {
  try {
    const messages = await Messages.find();
    res.status(200).json({ messages, message: "Here are your messages." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: "It's not you.  It's me." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const message = await Messages.findById(req.params.id);
    if (message) {
      res.status(200).json({ message, message: "Here is your message." });
    } else {
      res.status(404).json({ message: "No message by that id." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: "It's not you.  It's me." });
  }
});

router.post("/", async (req, res) => {
  try {
    const message = await Messages.insert(req.body);
    if (message) {
      res
        .status(201)
        .json({ message, message: "You have successfully added an item!" });
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
