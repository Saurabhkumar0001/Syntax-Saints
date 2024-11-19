const express = require('express');
const router = express.Router();
const Intern = require('../models/intern');
const { authenticateJWT } = require('../middlewares/auth');

// Mentor adds feedback and marks to a report
router.put('/mark/:internId/:reportId', authenticateJWT, async (req, res) => {
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

    report.mentorFeedback = feedback;
    report.mentorMarks = marks;

    await intern.save();

    res.status(200).json({
      message: 'Report marked successfully',
      report,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error marking report', error });
  }
});

module.exports = router;
