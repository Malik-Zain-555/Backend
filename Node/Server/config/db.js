const mongooes = require("mongoose")

const dbConnection = mongooes.connect("mongodb://0.0.0.0/learning").then(()=>{
    console.log("Database Connected!");
})

module.exports = dbConnection