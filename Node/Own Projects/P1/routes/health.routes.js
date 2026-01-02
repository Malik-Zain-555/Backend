const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Inside health stuff.\n Folder construction done.");
});

module.exports = router;
