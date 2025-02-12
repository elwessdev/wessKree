import Apply from "../models/apply.mjs";
import Property from "../models/property.mjs";


// Send Apply
export const sendApply = async (req, res) => {
    try {
        const { data } = req.body;
        const { id: renterId } = req.token;

        if (!data?.property) {
            return res.status(400).json({ message: "Property ID is required" });
        }
        const property = await Property.findById(data.property, { uid: 1 }).lean();
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

        const apply = new Apply({
            renter: renterId,
            owner: property.uid,
            property: data.property,
            messages: [{
                content: data.message || "👋 Hello! I'm interested in your property. Is it still available? 🏡",
                type: "renter",
            }]
        });

        const savedApply = await apply.save();
        if (!savedApply) {
            return res.status(500).json({ message: "Failed to send Apply" });
        }

        return res.status(200).json({ message: "Apply sent successfully" });

    } catch (err) {
        console.error("Apply error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};
// Fetch Applications
export const fetchApplications = async(req,res) => {
    try {
        const {id} = req.token;
        const appls = await Apply.find({owner:id},{renter:0}).lean();
        if(!appls){
            return res.status(400).json({ message: "nothing" });
        }
        return res.status(200).json(appls);
    } catch(err){
        console.error("Apply error:", err);
        return res.status(500).json({ message: "Server error" });
    }
}