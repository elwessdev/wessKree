import {Router} from "express";
import verifyToken from "../middleware/JWT.mjs"
import validID from "../middleware/validID.mjs"
import {
    getUser,
    userInfos,
    userProperties,
    checkPwd,
    checkUsername,
    checkEmail,
    updateProfile,
    addFavorite,
    favoriteList,
    deleteFavorite
} from "../controllers/user.mjs";
import {deleteCloudImg } from "../controllers/cloudinary.mjs";

const router = Router();

// Get after login details
router.get("/getUser",verifyToken,validID,getUser)

// User infos for profile
router.get("/info/:username",userInfos);
// User Properties
router.get("/userProperties/:username",userProperties);
// List Favorite
router.get("/favorite",verifyToken,validID,favoriteList);
// Add to favorite
router.post("/favorite",verifyToken,validID,addFavorite);
// Remove from favorite
router.delete("/deleteFavorite/:id",verifyToken,validID,deleteFavorite)

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