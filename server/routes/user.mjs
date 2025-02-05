import {Router} from "express";
import verifyToken from "../middleware/JWT.mjs"
import validID from "../middleware/validID.mjs"
import {
    getUser,
    userInfos,
    myInfo,
    checkPwd,
    checkUsername,
    checkEmail,
    updateProfile
} from "../controllers/user.mjs";
import {deleteCloudImg } from "../controllers/cloudinary.mjs";

const router = Router();

// Get user details
router.get("/getUser",verifyToken,validID,getUser)
// User infos for profile
router.get("/info/:username",userInfos);
// My infos
router.get("/myInfo",verifyToken,myInfo);
// Check Password
router.post("/checkPwd",verifyToken,validID,checkPwd);
// Check Username
router.post("/checkUsername",checkUsername);
// Check Email
router.post("/checkEmail",checkEmail);
// Delete PFP
router.delete("/deleteCloudImg/:id",verifyToken,validID,deleteCloudImg);
// Update profile
router.put("/update",verifyToken,validID,updateProfile);

export default router;