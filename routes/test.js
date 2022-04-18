const express = require("express");

const router = express.Router();
const test_controller = require("../controllers/test_controller");

router.get("/", (req, res) => test_controller.get_test(req, res));

module.exports = router;
