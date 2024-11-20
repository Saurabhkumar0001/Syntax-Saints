const Report = require('../models/Report'); // Import your report model
const Internship = require('../models/Internship'); // Import internship model for report validation
const moment = require('moment'); // For handling dates and periods

// Function to create a new report for an intern
const createReport = async (internId, reportData) => {
  try {
    // Destructure reportData
    const { reportType, reportContent, submissionDate } = reportData;

    // Validate the submission date (it should be within the current internship period)
    const internship = await Internship.findOne({ internId });
    if (!internship) {
      throw new Error('Internship not found');
    }

    // Check if the report is being submitted at the correct period (e.g., fortnightly)
    const isValidPeriod = validateReportPeriod(internship.startDate, submissionDate, reportType);
    if (!isValidPeriod) {
      throw new Error(`Report submission is invalid. Ensure the report is submitted at the correct time.`);
    }

    // Create and save the report
    const newReport = new Report({
      internId,
      reportType,
      reportContent,
      submissionDate: moment(submissionDate).toDate(),
    });

    await newReport.save();

    return { message: 'Report submitted successfully' };
  } catch (error) {
    throw new Error(`Error creating report: ${error.message}`);
  }
};

// Function to validate the report period (e.g., fortnightly or monthly)
const validateReportPeriod = (startDate, submissionDate, reportType) => {
  // Get the current date and calculate the difference from the start date
  const diffInDays = moment(submissionDate).diff(moment(startDate), 'days');

  // For fortnightly reports, the difference should be a multiple of 15
  if (reportType === 'fortnightly') {
    return diffInDays % 15 === 0;
  }

  // For monthly reports, the difference should be a multiple of 30
  if (reportType === 'monthly') {
    return diffInDays % 30 === 0;
  }

  // Default case: the report type is invalid
  return false;
};

// Function to get all reports for an intern
const getReportsByInternId = async (internId) => {
  try {
    const reports = await Report.find({ internId });
    return reports;
  } catch (error) {
    throw new Error(`Error fetching reports: ${error.message}`);
  }
};

// Function to update an existing report
const updateReport = async (reportId, updatedData) => {
  try {
    const { reportContent, submissionDate } = updatedData;

    // Find the report by its ID and update the fields
    const report = await Report.findById(reportId);
    if (!report) {
      throw new Error('Report not found');
    }

    // Update the report data
    report.reportContent = reportContent || report.reportContent;
    report.submissionDate = submissionDate || report.submissionDate;

    await report.save();

    return { message: 'Report updated successfully' };
  } catch (error) {
    throw new Error(`Error updating report: ${error.message}`);
  }
};

// Function to delete a report
const deleteReport = async (reportId) => {
  try {
    const report = await Report.findById(reportId);
    if (!report) {
      throw new Error('Report not found');
    }

    // Delete the report
    await report.remove();
    return { message: 'Report deleted successfully' };
  } catch (error) {
    throw new Error(`Error deleting report: ${error.message}`);
  }
};

// Function to verify the completion of required reports (Fortnightly, Assignment, Mentor Evaluation)
const verifyRequiredReports = async (internId) => {
  try {
    // Check if the intern has submitted the required reports
    const reports = await Report.find({ internId });
    
    const requiredReports = ['fortnightly', 'monthly', 'mentorEvaluation'];
    const submittedReportTypes = reports.map(report => report.reportType);

    // Verify that all required report types are submitted
    const missingReports = requiredReports.filter(reportType => !submittedReportTypes.includes(reportType));

    if (missingReports.length > 0) {
      return { message: `Missing required reports: ${missingReports.join(', ')}` };
    }

    return { message: 'All required reports are submitted' };
  } catch (error) {
    throw new Error(`Error verifying reports: ${error.message}`);
  }
};

module.exports = {
  createReport,
  getReportsByInternId,
  updateReport,
  deleteReport,
  verifyRequiredReports,
};
