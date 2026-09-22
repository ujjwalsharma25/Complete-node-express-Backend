const express = require('express');
const router = express.Router();
const storeControllers = require('../Controllers/storecontrollers');

router.get('/', storeControllers.getIndex);
router.get('/homes', storeControllers.getHomes);
router.get('/bookings', storeControllers.getBookings);
router.get('/favourites', storeControllers.getFavouriteList);

module.exports = router;