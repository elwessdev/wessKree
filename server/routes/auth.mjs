import {Router} from "express";
import {signup,getUser,setupProfile,logout,signin} from "../controllers/auth.mjs"
import verifyToken from "../middleware/JWT.mjs"

const router = Router();


// Signup
router.post("/signup",signup)
// Get user details
router.get("/getUser",verifyToken,getUser)
// Setup profile
router.put("/setupProfile",verifyToken,setupProfile)
// Logout
router.get("/logout",verifyToken,logout)
// Signin
router.post("/signin",signin)




export default router;