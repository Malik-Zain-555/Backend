const server = require("./app");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 3000;
const dbConnection = require("./config/db");
dotenv.config();
dbConnection();

server.listen(PORT, () => {
  console.log("Server Started at ", PORT);
});
