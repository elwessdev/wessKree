import {Router} from "express";
import verifyToken from "../middleware/JWT.mjs"
import validID from "../middleware/validID.mjs"
import { userInfos, myInfo, checkPwd } from "../controllers/user.mjs";

const router = Router();

// User infos
router.get("/info/:username",userInfos);
// My infos
router.get("/myInfo",verifyToken,myInfo);
// Check Password
router.post("/checkPwd",verifyToken,validID,checkPwd);

export default router;