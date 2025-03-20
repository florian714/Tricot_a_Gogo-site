const UserController = require('../controllers/AuthController');
const express = require('express');
const router = express.Router();

router.post("/register", UserController.register);

router.post("/login", UserController.login);

router.get("/", UserController.getAll);

router.delete("/:id", UserController.delUser);

router.get("/:id", UserController.finduser);

router.put("/:id", UserController.updateUser);
module.exports = router;