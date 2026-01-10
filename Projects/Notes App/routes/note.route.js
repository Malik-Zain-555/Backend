const express = require("express");
const router = express.Router();
const { createNote, editNote } = require("../controller/note.controller");
const noteModle = require("../modle/notes");
const { body, validationResult } = require("express-validator");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get("/dashboard", async (req, res) => {
  const allNotes = await noteModle.find();
  res.render("dashboard", { allNotes });
});

router.post("/dashboard/create", createNote);

router.get("/dashboard/delete/:_id", async (req, res) => {
  await noteModle.findByIdAndDelete(req.params._id);
  res.redirect("/notes/dashboard");
});
router.post(
  "/dashboard/edit/:_id",
  [
    body("title").trim().isLength({ min: 3 }),
    body("description").trim().isLength({ min: 5 }),
  ],
  editNote
);

module.exports = router;
