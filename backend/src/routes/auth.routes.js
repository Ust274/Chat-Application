import { Router } from "express";
import { signup,login, checkUser,logout,updateProfilePic} from "../controllers/auth.controllers.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/check",protectRoute,checkUser);
router.put("/getProfile",protectRoute,updateProfilePic)
router.post("/logout",logout)


export default router;