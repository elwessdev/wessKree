/**
 * @swagger
 * tags:
 *   name: Properties
 *   description: Property management endpoints
 * 
 * /property/post:
 *   post:
 *     summary: Create a new property
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             # Define property creation schema here
 *     responses:
 *       201:
 *         description: Property created successfully
 *       401:
 *         description: Unauthorized - invalid token
 *       400:
 *         description: Bad request - invalid data
 *
 * /property:
 *   get:
 *     summary: Get all properties
 *     tags: [Properties]
 *     responses:
 *       200:
 *         description: List of properties retrieved successfully
 *
 * /property/details/{id}:
 *   get:
 *     summary: Get property by ID
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Property ID
 *     responses:
 *       200:
 *         description: Property details retrieved successfully
 *       404:
 *         description: Property not found
 *
 * /property/delete/{id}:
 *   delete:
 *     summary: Delete a property
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Property ID
 *     responses:
 *       200:
 *         description: Property deleted successfully
 *       401:
 *         description: Unauthorized - invalid token
 *       404:
 *         description: Property not found
 *
 * /property/edit:
 *   put:
 *     summary: Update a property
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             # Define property update schema here
 *     responses:
 *       200:
 *         description: Property updated successfully
 *       401:
 *         description: Unauthorized - invalid token
 *       400:
 *         description: Bad request - invalid data
 *       404:
 *         description: Property not found
 */
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