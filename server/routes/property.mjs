import {Router} from "express";
import verifyToken from "../middleware/JWT.mjs"
import validID from "../middleware/validID.mjs";
import {
    postProperty,
    getProperties,
    propertyDetails,
    deleteProperty,
    editProperty
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
// Edit Property
router.put("/edit",verifyToken,validID,editProperty);


export default router;