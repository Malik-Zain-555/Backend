const server = require("./app");
const dbConnection = require("./config/db");


const PORT = process.env.PORT || 6000;

dbConnection();

server.listen(PORT, () => {
  console.log("Server Started!");
});
