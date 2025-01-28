import {Router} from "express";
import {signin,signup,forgotpwd,settings,getUser} from "../controllers/auth.mjs"
import verifyToken from "../middleware/JWT.mjs"


const router = Router();

// Signin
router.get("/signin",signin)
// Get user data
router.get("/getUser",verifyToken,getUser)
// Signup
router.post("/signup",signup)
// Forgot Password
router.patch("/forgotpwd",forgotpwd)
// Settings
router.put("/settings",settings)


export default router;