import express, {Router} from "express";
const { signup, signin } = require('../controllers/user.controller');

const router: Router = express.Router();

router.post("/signup", signup);
router.post("/login", signin);

module.exports = router;