require("dotenv").config();

const http = require("http");
const app = require("./app");

const server = http.createServer(app);

const port = process.env.PORT ?? 2000;

server.listen(port);

server.on("listening", () => {
  console.log(`Server is listening on port ${port}`);
});
