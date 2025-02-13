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

        if(property.uid==req.token.id){
            return res.status(203).json({ message: "Can't apply to your property" });
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
        const appls = await Apply.find({
            $or: [{ owner: id }, { renter: id }]
        })
        .populate("owner", "publicName photo username")
        .populate("renter", "publicName photo username")
        .populate("property", "title location imgs city state")
        .sort({createdAt:-1})
        .lean();
        if (!appls.length) {
            return res.status(404).json({ message: "No applications found" });
        }
        appls.forEach(app => {
            if (app.renter) delete app.renter._id;
            if (app.owner) delete app.owner._id;
            if (app.messages) delete app.messages;
        });
        return res.status(200).json(appls);
    } catch(err){
        console.error("fetch applications error:", err);
        return res.status(500).json({ message: "Server error" });
    }
}
// Chat details
export const chatDetails = async(req,res)=>{
    try {
        const {id} = req.params;
        const details = await Apply.findById(id)
        // .populate("renter","photo publicName")
        // .populate("property","title")
        // .populate("owner","publicName")
        .populate("owner", "publicName photo username")
        .populate("renter", "publicName photo username")
        .populate("property", "title location imgs city state")
        .lean();
        if(!details){
            return res.status(400).json({ message: "nothing" });
        }
        delete details.renter._id;
        delete details.owner._id;
        return res.status(200).json(details);
    } catch(err){
        console.error("chat details error:", err);
        return res.status(500).json({ message: "Server error" });
    }
}
// Apply Chat status
export const changeApplyStatus = async(req,res)=>{
    try {
        const {status,id} = req.body;
        const application = await Apply.findById(id);
        if(!application){
            return res.status(400).json({ message: "Application not found" });
        }
        if(status=="rejected"||status=="closed"){
            application.status=status;
            await application.save();
            return res.status(200).json({success:true});
        }
        if(status=="accepted"){
            application.status="accepted";
            application.messages.push({
                content: `✅ Hi! Your application has been accepted. Let's discuss the next steps. 😊`,
                type: "owner",
            });
            await application.save();
            return res.status(200).json({success:true});
        }
        return res.status(200).json({message:"nothing"});
    } catch(err){
        console.error("Apply Chat status error:", err);
        return res.status(500).json({ message: "Server error" });
    }
}
// Send message
export const sendMsg = async(req,res)=>{
    try {
        const {type,msg,id}=req.body;
        const addMsg = await Apply.findById(id);
        if(!addMsg){
            return res.status(404).json({message:"application not found"});
        }
        addMsg.messages.push({
            content: msg,
            type:type
        })
        await addMsg.save();
        return res.status(200).json({success:true});
    } catch(err){
        console.error("send message error", err);
        return res.status(500).json({ message: "Server error" });
    }
}