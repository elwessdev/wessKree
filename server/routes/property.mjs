import {Router} from "express";
import verifyToken from "../middleware/JWT.mjs"
import { postProperty } from "../controllers/property.mjs";


const router = Router();

// Post property
router.post("/post",verifyToken,postProperty);



export default router;