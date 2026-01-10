const noteModle = require("../modle/notes");

exports.createNote = async (req, res) => {
  const { title, description } = req.body;
  await noteModle.create({
    title,
    description,
  });
  await noteModle.find();
  res.redirect("/notes/dashboard");
};

exports.editNote = async (req, res) => {
  const { title, description } = req.body;
  const _id = req.params._id;
  await noteModle.findByIdAndUpdate(
    {
      _id,
    },
    {
      title,
      description,
    }
  );

  console.log("Title ", title);
  console.log("description ", description);
  console.log("_id ", _id);

  res.redirect("/notes/dashboard");
};
