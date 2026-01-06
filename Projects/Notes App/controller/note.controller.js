const noteModle = require("../modle/notes");

exports.createNote = async (req, res) => {
  const { title, description } = req.body;
  await noteModle.create({
    title,
    description,
  });
  const allNotes = await noteModle.find();
  res.render("dashboard", { allNotes });
};

// exports.editNote = async (req, res) => {
//   const { title, description } = req.body;
//   await noteModle.create({
//     title,
//     description,
//   });
//   const allNotes = await noteModle.find();
//   res.render("dashboard", { allNotes });
// };
