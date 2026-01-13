const server = require("./app");
const dbConnection = require("./config/database");

const PORT = process.env.PORT || 5000;

dbConnection();

server.listen(PORT, () => {
  console.log("Server is live at", PORT);
});
