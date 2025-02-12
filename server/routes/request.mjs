export {Router} from "express";
import { Router } from "express";
import verifyToken from "../middleware/JWT.mjs"
import validID from "../middleware/validID.mjs";
import {sendApply,fetchApplications} from "../controllers/request.mjs"

const router = Router();

// Send Apply
router.post("/apply",verifyToken,validID,sendApply)
// Fetch applications
router.get("/fetchApplications",verifyToken,validID,fetchApplications)


export default router;