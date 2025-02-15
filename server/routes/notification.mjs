import { Router } from "express";
import verifyToken from "../middleware/JWT.mjs";
import validID from "../middleware/validID.mjs";
import {
    createNotif,
    fetchNotif
} from "../controllers/notification.mjs"

const router = Router();

// Create notification
router.post("/create",verifyToken,validID,createNotif);
// Fetch notification
router.get("/fetch",verifyToken,validID,fetchNotif);


export default router;