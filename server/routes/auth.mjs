import {Router} from "express";
import {
    signup,
    setupProfile,
    logout,
    signin,
    sendCode,
    verifyOTP,
    changePwd,
    signWithGoogle
} from "../controllers/auth.mjs"
import verifyToken from "../middleware/JWT.mjs"
import validID from "../middleware/validID.mjs";

const router = Router();


// Signup
router.post("/signup",signup)
// Setup profile
router.put("/setupProfile",verifyToken,validID,setupProfile)
// Logout
router.get("/logout",verifyToken,validID,logout)
// Signin
router.post("/signin",signin)
// Signin with Google
router.post("/signWithGoogle",signWithGoogle)
// Send Code
router.post("/sendCode",sendCode);
// Verify Code
router.post("/verifyOTP",verifyOTP);
// Change Password
router.put("/changePwd",changePwd);


export default router;