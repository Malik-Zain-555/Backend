const noteModle = require("../modle/notes");

exports.createNote = async (req, res) => {
  const { title, description } = req.body;
  await noteModle.create({
    title,
    description,
  });
  const allNotes = await noteModle.find();
  res.redirect("/notes/dashboard");
};

exports.editNote = async (req, res) => {
  const { _id } = req.body;
  const allNotes = await noteModle.findByIdAndUpdate({
    _id,
  },{
    
  });
  res.render("dashboard");
};
