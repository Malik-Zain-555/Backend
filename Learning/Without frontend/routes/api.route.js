const express = require("express");
const router = express.Router();

router.get("/tasks", (req, res) => {
  res.json("all tasks are showed here.");
});

router.post("/create",(req,res)=>{

})

module.exports = router;
