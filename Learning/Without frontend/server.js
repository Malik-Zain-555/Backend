const server = require("./app");
const env = require("dotenv");

env.config();

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log("Server Started at", PORT);
});
