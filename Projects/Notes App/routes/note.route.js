const express = require("express");
const router = express.Router();
const {
  createNote,
  deleteNote,
  editNote,
} = require("../controller/note.controller");
const noteModle = require("../modle/notes");

router.get("/dashboard", async (req, res) => {
  const allNotes = await noteModle.find();
  res.render("dashboard", { allNotes });
});

router.post("/dashboard/create", createNote);

router.get("/dashboard/delete/:_id", async (req, res) => {
  await noteModle.findByIdAndDelete(req.params._id);
  res.redirect("dashboard");
});
// router.post("/dashboard/delete", editNote);

module.exports = router;
