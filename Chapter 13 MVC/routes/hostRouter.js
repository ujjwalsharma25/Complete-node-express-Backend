const express = require('express');
const router = express.Router();
const homeControllers = require("../Controllers/homecontrollers");

router.get('/add-home', homeControllers.getAddHome);
router.get('/host-home-list', homeControllers.getHostHomes);
router.post('/add-home', homeControllers.postAddHome);

module.exports = router;