const express = require('express');
const router = express.Router();
const Intern = require('../models/intern');
const { authenticateJWT } = require('../middlewares/auth');

// Submit a new report (intern submits a report)
router.post('/submit', authenticateJWT, async (req, res) => {
  const { internId, reportType, title, content } = req.body;
  const submissionDate = new Date();

  try {
    const intern = await Intern.findById(internId);
    if (!intern) {
      return res.status(404).json({ message: 'Intern not found' });
    }

    // Add the report to the intern's reports array
    const newReport = {
      type: reportType,
      title,
      content,
      submissionDate,
    };

    intern.reports.push(newReport);
    await intern.save();

    res.status(201).json({ message: 'Report submitted successfully!', newReport });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit report', error });
  }
});

// Mentor views a report
router.get('/:internId/reports', authenticateJWT, async (req, res) => {
  const { internId } = req.params;

  try {
    const intern = await Intern.findById(internId);
    if (!intern) {
      return res.status(404).json({ message: 'Intern not found' });
    }

    // Return all reports of the intern
    res.status(200).json({ reports: intern.reports });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reports', error });
  }
});

// Mentor adds feedback and marks to the report
router.put('/feedback/:internId/:reportId', authenticateJWT, async (req, res) => {
  const { internId, reportId } = req.params;
  const { feedback, marks } = req.body;

  try {
    const intern = await Intern.findById(internId);
    if (!intern) {
      return res.status(404).json({ message: 'Intern not found' });
    }

    const report = intern.reports.id(reportId);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // Add feedback and marks from the mentor
    report.mentorFeedback = feedback;
    report.mentorMarks = marks;

    await intern.save();
    res.status(200).json({ message: 'Feedback and marks updated successfully', report });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add feedback', error });
  }
});

module.exports = router;
