const http = require("http")
const server = http.createServer((req,res)=>{
    if( req.url == "/"){
        res.end("Home Page")
    }
    if( req.url == "/profile"){
        res.end("Profile Page")
    }
    if( req.url == "/about"){
        res.end("About Us Page")
    }
})

const PORT = 3000

server.listen(PORT,()=>{
  console.log("Port Started at", PORT);
})