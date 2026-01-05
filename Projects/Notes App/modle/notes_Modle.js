const mongoose = require("mongoose");

const notesSchema = mongoose.Schema({
  title: {
    type: String,
    minLength: 3,
    required: true,
  },
  description: {
    type: String,
    minLength: 5,
    required: true,
  },
});

const Note = mongoose.model("Note", notesSchema);

module.exports = Note;
