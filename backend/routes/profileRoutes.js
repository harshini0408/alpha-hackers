const express = require('express');
const auth = require('../middleware/authMiddleware');
const TransporterProfile = require('../models/TransporterProfile');

const router = express.Router();

// POST /api/profile/create — create or overwrite profile
router.post('/create', auth, async (req, res) => {
  try {
    const data = { ...req.body, userId: req.user.userId };

    const existing = await TransporterProfile.findOne({ userId: req.user.userId });
    if (existing) {
      await TransporterProfile.updateOne({ userId: req.user.userId }, data);
      return res.json({ message: 'Profile updated.', profileId: existing._id });
    }

    const profile = await TransporterProfile.create(data);
    res.status(201).json({ message: 'Profile created.', profileId: profile._id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save profile.' });
  }
});

// GET /api/profile/:userId — get profile by userId
router.get('/:userId', auth, async (req, res) => {
  try {
    const profile = await TransporterProfile.findOne({ userId: req.params.userId });
    if (!profile) {
      return res.json({ profile: null });
    }
    res.json({ profile });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// PUT /api/profile/update — update own profile
router.put('/update', auth, async (req, res) => {
  try {
    const result = await TransporterProfile.findOneAndUpdate(
      { userId: req.user.userId },
      req.body,
      { new: true }
    );
    if (!result) {
      return res.status(404).json({ error: 'Profile not found. Create one first.' });
    }
    res.json({ message: 'Profile updated.', profile: result });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update profile.' });
  }
});

module.exports = router;
