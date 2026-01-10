const createBtn = document.getElementById("createBtn");
const cancleBtn = document.querySelectorAll(".cancleBtn");
const confirmBtn = document.querySelectorAll(".confirmBtn");
const editBtn = document.querySelectorAll(".editBtn");
const newNoteForm = document.getElementById("newNoteForm");
const editNoteForm = document.querySelectorAll(".editNoteForm");
const createForm = document.getElementById("createForm");
createBtn.addEventListener("click", () => {
  newNoteForm.style.display = "flex";
});
cancleBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.closest(".editNoteForm").style.display = "none";
    newNoteForm.style.display = "none";
  });
});


editBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const editFormWrapper = btn
      .closest(".noteCard")
      .nextElementSibling;

    editFormWrapper.style.display = "flex";
  });
});


newNoteForm.addEventListener("keypress", (key) => {
  if (key.key === "Enter") {
    console.log("Enter Pressed");
    editForm.submit();
  }
});

console.log("working");
