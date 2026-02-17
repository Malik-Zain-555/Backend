const server = require("./app");
const dotenv = require("dotenv");
const dbConnection = require("./config/db");

dotenv.config();
dbConnection();

server.listen(process.env.PORT, () => {
  console.log("Server started at ", process.env.PORT);
});
