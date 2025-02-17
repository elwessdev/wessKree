import Notification from '../models/notification.mjs';
import User from '../models/user.mjs';
import { io, users } from '../server.mjs';

// Create notification
export const createNotif = async (req, res) => {
    try {
        const { msg, user, link } = req.body;

        const userData = await User.findOne({ username: user }, { _id: 1 });
        const myPhoto = await User.findOne({_id:req.token.id},{photo:1});
        if (!userData||!myPhoto) {
            return res.status(404).json({ message: "User not found" });
        }

        const notif = new Notification({
            user: userData._id,
            img: myPhoto?.photo,
            message: msg,
            link: link ? link : "/",
        });

        await notif.save();
        
        // Send nitification when user is active
        const userSocketActive = users.get(userData._id.toString());
        if(userSocketActive){
            // io.emit(`notify_${userData._id}`,msg);
            io.to(userSocketActive.socketId).emit("notify",msg);
            console.log("user active");
        }

        return res.status(201).json({ message: "Notification created successfully" });
    } catch (err) {
        console.error("Error creating notification:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
// Fetch notification
export const fetchNotif = async (req, res) => {
    try {
        const { id } = req.token;
        const notifs = await Notification.find({ user: id }).sort({createdAt:-1}).lean();
        return res.status(200).json(notifs);
    } catch (err) {
        console.error("Error creating notification:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
// Seen notifications
export const seenNotifs = async(req,res)=>{
    try{
        const {id} = req.token;
        await Notification.updateMany(
            { user: id },
            { $set:{ seen: true }}
        );
        return res.status(200).json({message: "done"});
    } catch (err) {
        console.error("Error seen notifications:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}