const server = require("./app");
const env = require("dotenv");
const dbConnection = require("./config/db")

dbConnection()

env.config();

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log("Server Started at", PORT);
});
