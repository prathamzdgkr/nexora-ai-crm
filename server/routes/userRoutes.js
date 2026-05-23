const express = require('express');
const router = express.Router();
const { updateProfile, getProfile } = require('../controllers/userController');

// NOTE: Ensure you import your authentication middleware here!
// It might be named `protect`, `auth`, or `verifyToken` in your project.
const { protect } = require('../middleware/authMiddleware'); 

router.route('/profile')
    .get(protect, getProfile)
    .put(protect, updateProfile);

module.exports = router;