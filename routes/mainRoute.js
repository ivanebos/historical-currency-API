const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainController");

// Use all methods for the main route
router.all("/", mainController.getExtchangeRate);

module.exports = router;
