const fs = require("fs");

fs.writeFile("2.txt","second is what","utf8", (err)=>{
    if(err) console.log(err);
})

fs.readFile("./2.txt","utf8",(err,data)=>{
    if(err) console.log(err);
    console.log(data);
})
