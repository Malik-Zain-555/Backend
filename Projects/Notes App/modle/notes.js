const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
  {
    title: { type: String, minlength: 3, required: true, trim: true },
    description: { type: String, minlength: 5, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", notesSchema);
