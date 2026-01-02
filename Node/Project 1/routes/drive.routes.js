const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.render("drive");
});

router.post("/upload-file",(req,res)=>{
    res.send("File Uploaded!")
})

module.exports = router;
