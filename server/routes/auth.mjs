import {Router} from "express";
import {signup,getUser,setupProfile} from "../controllers/auth.mjs"
import verifyToken from "../middleware/JWT.mjs"

const router = Router();


// Signup
router.post("/signup",signup)
// Get user details
router.get("/getUser",verifyToken,getUser)
// Setup profile
router.put("/setupProfile",verifyToken,setupProfile)






export default router;