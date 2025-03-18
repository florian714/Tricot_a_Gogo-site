const UserController = require('../controllers/AuthController');
const express = require('express');
const router = express.Router();

router.post("/register", UserController.register);

router.post("/login", UserController.login);

router.get("/", UserController.getAll);

router.delete("/:id", UserController.delUser);
module.exports = router;