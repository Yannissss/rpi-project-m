const Router = require("express").Router();

const playerController = require('../controller/player');

Router.use("/", playerController.getPlayer);

module.exports = Router;