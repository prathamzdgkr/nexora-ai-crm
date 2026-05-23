const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

// REGISTER USER
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists)
            return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// LOGIN USER
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user)
            return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)
            return res.status(400).json({ message: "Invalid credentials" });

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// FORGOT PASSWORD
exports.forgotPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ message: "No user found with this email" });

        // Generate the random reset token using the method we added to User.js
        const resetToken = user.getResetPasswordToken();
        await user.save({ validateBeforeSave: false });

        // The URL pointing to your React Frontend
        const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
        const message = `You requested a password reset for NexoraAI.\n\nPlease click the link below to set a new password: \n\n ${resetUrl}`;

        try {
            await sendEmail({
                email: user.email,
                subject: "Password Reset Request - NexoraAI",
                message,
            });
            res.status(200).json({ message: "Email sent successfully" });
        } catch (err) {
            // If email fails, clear the token from the database
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({ validateBeforeSave: false });
            return res.status(500).json({ message: "Email could not be sent" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// RESET PASSWORD
exports.resetPassword = async (req, res) => {
    try {
        // Hash the token from the URL to compare it with the hashed token in the database
        const resetPasswordToken = crypto
            .createHash("sha256")
            .update(req.params.resettoken)
            .digest("hex");

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }, // Ensure the token hasn't expired
        });

        if (!user) return res.status(400).json({ message: "Invalid or expired token" });

        // Hash the new password using bcrypt (matching your registerUser logic)
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);

        // Clear the reset tokens as they are no longer needed
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        
        await user.save();

        res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};