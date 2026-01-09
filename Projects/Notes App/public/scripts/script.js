const createBtn = document.getElementById("createBtn");
const cancleBtn = document.getElementById("cancleBtn");
const confirmBtn = document.getElementById("confirmBtn");
const editBtn = document.querySelectorAll(".editBtn");
const newNoteForm = document.getElementById("newNoteForm");
const editNoteForm = document.getElementById("editNoteForm");
const createForm = document.getElementById("createForm");
const editForm = document.getElementById("editForm");
createBtn.addEventListener("click", () => {
  newNoteForm.style.display = "flex";
});
cancleBtn.addEventListener("click", () => {
  newNoteForm.style.display = "none";
});

newNoteForm.addEventListener("keypress", (key) => {
  if (key.key === "Enter") {
    console.log("Enter Pressed");
    createForm.submit();
  }
});

editBtn.forEach((note) => {
  note.addEventListener("click", () => {
    editNoteForm.style.display = "flex";
  });
});

newNoteForm.addEventListener("keypress", (key) => {
  if (key.key === "Enter") {
    console.log("Enter Pressed");
    editForm.submit();
  }
});

console.log("working");
