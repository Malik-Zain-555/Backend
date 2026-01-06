const createBtn = document.getElementById("createBtn");
const cancleBtn = document.getElementById("cancleBtn");
const confirmBtn = document.getElementById("confirmBtn");
const newNoteForm = document.getElementById("newNoteForm");
const createForm = document.getElementById("createForm");
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


console.log("working");