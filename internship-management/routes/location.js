const express = require('express');
const router = express.Router();
const Intern = require('../models/intern');
const { authenticateJWT } = require('../middlewares/auth');

// Update intern's location
router.post('/update', authenticateJWT, async (req, res) => {
  const { internId, longitude, latitude } = req.body;

  try {
    const intern = await Intern.findById(internId);
    if (!intern) {
      return res.status(404).json({ message: 'Intern not found' });
    }

    // Update intern's location
    intern.location.coordinates = [longitude, latitude];
    await intern.save();

    res.status(200).json({ message: 'Location updated successfully', location: intern.location });
  } catch (error) {
    res.status(500).json({ message: 'Error updating location', error });
  }
});

module.exports = router;
