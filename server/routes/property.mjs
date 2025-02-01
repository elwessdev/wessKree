import {Router} from "express";
import verifyToken from "../middleware/JWT.mjs"
import { postProperty, getProperties } from "../controllers/property.mjs";


const router = Router();

// Post property
router.post("/post",verifyToken,postProperty);
// Get properties
router.get("/",getProperties);


export default router;