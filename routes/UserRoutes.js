const express = require('express');
const UserController = require('../controllers/AuthController');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.post("/register", UserController.register);

router.post("/login", UserController.login);

router.get("/", UserController.getAll);

router.delete("/:id", UserController.delUser);
router.get("/trouveeee", auth, UserController.trouverutilisateur);

router.get("/:id", UserController.lala);    

router.put("/:id", UserController.updateUser);
module.exports = router;