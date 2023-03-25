const express = require("express");
const server = express();
const { logger } = require("./projects/projects-middleware");
// Sunucunuzu yapılandırın
// Eylem routerınızı /api/actions/actions-router.js içinde oluşturun
// Proje roterlarınızı /api/projects/projects-router.js içinde oluşturun
// Bu dosyanın içinde `server.listen()` YAPMAYIN!

server.use(express.json());

const projectsRouter = require("./projects/projects-router");
const actionsRouter = require("./actions/actions-router");

server.use(logger);

server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

module.exports = server;
