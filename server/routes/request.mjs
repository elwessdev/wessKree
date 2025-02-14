export {Router} from "express";
import { Router } from "express";
import verifyToken from "../middleware/JWT.mjs"
import validID from "../middleware/validID.mjs";
import {
    sendApply,
    fetchApplications,
    chatDetails,
    changeApplyStatus,
    sendMsg
} from "../controllers/request.mjs"

const router = Router();

// Send Apply
router.post("/apply",verifyToken,validID,sendApply)
// Fetch applications
router.get("/fetchApplications/:type",verifyToken,validID,fetchApplications);
// Chat Details
router.get("/chatDetails/:id",verifyToken,validID,chatDetails);
// Apply Chat status
router.put("/changeApplyStatus",verifyToken,validID,changeApplyStatus);
// Send Message
router.post("/sendMsg",verifyToken,validID,sendMsg);


export default router;