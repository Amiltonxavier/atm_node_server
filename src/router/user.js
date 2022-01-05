import Express from "express";
import Auth from "../controller/Auth";
import User from "../controller/User";

const router = Express.Router();
router.post("/authentication", Auth.login);
router.post("/signup", User.createUserAccount);


export default router;
