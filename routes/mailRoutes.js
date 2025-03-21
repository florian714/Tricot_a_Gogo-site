const express = require('express');
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const mailControler = require("../controllers/mailControler")

router.post('/', auth, mailControler.sendEmail);

module.exports = router;

