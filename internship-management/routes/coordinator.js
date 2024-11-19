const express = require('express');
const router = express.Router();
const Intern = require('../models/intern');
const { authenticateJWT } = require('../middlewares/auth');

// Get all interns (for coordinator)
router.get('/interns', authenticateJWT, async (req, res) => {
  try {
    const interns = await Intern.find();
    res.status(200).json(interns);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching interns', error });
  }
});

// Get a single intern by ID (for coordinator)
router.get('/intern/:id', authenticateJWT, async (req, res) => {
  const { id } = req.params;
  
  try {
    const intern = await Intern.findById(id);
    if (!intern) {
      return res.status(404).json({ message: 'Intern not found' });
    }
    res.status(200).json(intern);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching intern', error });
  }
});

// Create a new intern (for coordinator)
router.post('/intern', authenticateJWT, async (req, res) => {
  const { name, email, companyName, startDate, externalMentor, offerLetter, password } = req.body;
  
  try {
    const internExists = await Intern.findOne({ email });
    if (internExists) {
      return res.status(400).json({ message: 'Intern already exists with this email.' });
    }

    const newIntern = new Intern({ name, email, password, companyName, startDate, externalMentor, offerLetter });
    await newIntern.save();
    
    res.status(201).json({
      message: 'Intern created successfully!',
      intern: newIntern
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating intern', error });
  }
});

// Update intern details (for coordinator)
router.put('/intern/:id', authenticateJWT, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const intern = await Intern.findByIdAndUpdate(id, updates, { new: true });
    if (!intern) {
      return res.status(404).json({ message: 'Intern not found' });
    }
    res.status(200).json({
      message: 'Intern updated successfully!',
      intern
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating intern', error });
  }
});

// Delete an intern (for coordinator)
router.delete('/intern/:id', authenticateJWT, async (req, res) => {
  const { id } = req.params;

  try {
    const intern = await Intern.findByIdAndDelete(id);
    if (!intern) {
      return res.status(404).json({ message: 'Intern not found' });
    }
    res.status(200).json({ message: 'Intern deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting intern', error });
  }
});

module.exports = router;
