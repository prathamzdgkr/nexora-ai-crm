// server/controllers/userController.js
const User = require('../models/User');

const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update fields
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        // Update notifications safely
        if (req.body.notifications) {
            user.notifications = {
                email: req.body.notifications.email ?? user.notifications.email,
                push: req.body.notifications.push ?? user.notifications.push
            };
        }

        // Update password if provided
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            notifications: updatedUser.notifications,
        });
    } catch (error) {
        console.error("Profile Update Error:", error);
        res.status(500).json({ message: error.message });
    }
};

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { updateProfile, getProfile };