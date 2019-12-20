const router = require("express").Router();
const Hubs = require("./hubs-model.js");

router.get("/", async (req, res) => {
  try {
    const hubs = await Hubs.find();
    res.status(200).json(hubs);
  } catch (error) {
    res
      .status(500)
      .json({ error, message: "Unable to get items, its not you.. its me" });
  }
});
// @desc     Get a single item by ID
// @route    GET /api/items/:id
// @access   Private
router.get("/:id", async (req, res) => {
  try {
    const hub = await Hubs.findById(req.params.id);
    if (hub) {
      res.status(200).json(hub);
    } else {
      res.status(404).json({ message: "That item cannot be found" });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Unable to find this item, its not you.. its me"
    });
  }
});

router.get("/:id/messages", async (req, res) => {
  try {
    const hubMessages = await Hubs.findHubMessages(req.params.id);
    if (hubMessages) {
      res
        .status(200)
        .json({
          hubMessages,
          message: `Here are your messages for this hub #${req.params.id}`
        });
    } else {
      res.status(404).json({ message: "No messages for that Hub." });
    }
  } catch (error) {
    console.log(error);
  }
});

// @desc     Post an item
// @route    POST /api/items
// @access   Private
router.post("/", async (req, res) => {
  try {
    const hub = await Hubs.insert(req.body);
    if (hub) {
      res
        .status(201)
        .json({ hub, message: "You have successfully added an item!" });
    } else {
      res.status(400).json({ message: "please include all required content" });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Unable to add this item, its not you.. its me"
    });
  }
});
// @desc     Edit an Item
// @route    PUT /api/items:id
// @access   Private
router.put("/:id", async (req, res) => {
  try {
    const hub = await Hubs.update(req.params.id, req.body);
    if (hub) {
      res.status(200).json({ hub, message: "Info updated!" });
    } else {
      res.status(404).json({ message: "Item could not be found!" });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Unable to edit this Item, its not you.. its me"
    });
  }
});
// @desc     Delete an Item
// @route    DELETE /api/items:id
// @access   Private
router.delete("/:id", async (req, res) => {
  try {
    const count = await Hubs.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "Deleted!" });
    } else {
      res.status(404).json({ message: "Item unable to be deleted!" });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Unable to delete this Item, its not you.. its me"
    });
  }
});

module.exports = router;
