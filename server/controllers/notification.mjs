import Notification from '../models/notification.mjs';
import User from '../models/user.mjs';
import { io } from '../server.mjs';

export const createNotif = async (req, res) => {
    try {
        const { msg, user } = req.body;

        const userData = await User.findOne({ username: user }, { _id: 1 });
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        // console.log(`notify_${userData._id}`);

        const notif = new Notification({
            user: userData._id, 
            message: msg
        });

        await notif.save();
        io.emit(`notify_${userData._id}`,msg);

        return res.status(201).json({ message: "Notification created successfully" });
    } catch (err) {
        console.error("Error creating notification:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
export const fetchNotif = async (req, res) => {
    try {
        const { id } = req.token;

        const notifs = await Notification.find({ user: id }).lean();

        return res.status(200).json(notifs);
    } catch (err) {
        console.error("Error creating notification:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};