const express = require('express')

const router = express.Router()

const { stripePay } = require('./../controllers/stripeControllers')

router.post('/pay', stripePay);


module.exports = router;