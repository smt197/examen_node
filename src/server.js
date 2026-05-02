import http from "http";
import app from "./app.js";

const appInstance = new app().getApp();

const server = http.createServer(appInstance);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
