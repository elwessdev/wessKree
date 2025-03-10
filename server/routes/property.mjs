import {Router} from "express";
import verifyToken from "../middleware/JWT.mjs"
import validID from "../middleware/validID.mjs";
import {
    postProperty,
    getProperties,
    propertyDetails,
    deleteProperty
} from "../controllers/property.mjs";

const router = Router();

// Post property
router.post("/post",verifyToken,validID,postProperty);
// Get properties
router.get("/",getProperties);
// Property details
router.get("/details/:id",propertyDetails);
// Delete Property
router.delete('/delete/:id',verifyToken,validID,deleteProperty);


export default router;