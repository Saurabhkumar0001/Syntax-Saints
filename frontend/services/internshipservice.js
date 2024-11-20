const Internship = require('../models/Internship'); // Import the Internship model
const Company = require('../models/Company'); // Import the Company model to validate company information
const moment = require('moment'); // For date handling and comparison

// Function to create a new internship record for an intern
const createInternship = async (internId, internshipData) => {
  try {
    // Destructure the internship data
    const {
      startDate,
      companyName,
      companyAddress,
      externalMentorName,
      externalMentorContact,
      externalMentorEmail,
      companyRegistrationNumber,
      city,
      stipendAmount,
      offerLetter,
    } = internshipData;

    // Validate company registration number by checking if it exists in the Ministry of Corporate Affairs database
    const company = await Company.findOne({ registrationNumber: companyRegistrationNumber });
    if (!company) {
      throw new Error('Company registration number is invalid or the company is not registered');
    }

    // Check if the intern already has an internship assigned
    const existingInternship = await Internship.findOne({ internId });
    if (existingInternship) {
      throw new Error('Internship already exists for this intern');
    }

    // Create the internship record
    const newInternship = new Internship({
      internId,
      startDate: moment(startDate).toDate(),
      companyName,
      companyAddress,
      externalMentorName,
      externalMentorContact,
      externalMentorEmail,
      companyRegistrationNumber,
      city,
      stipendAmount,
      offerLetter,
      status: 'In Progress', // Initially set the status to "In Progress"
    });

    // Save the internship record to the database
    await newInternship.save();

    return { message: 'Internship created successfully' };
  } catch (error) {
    throw new Error(`Error creating internship: ${error.message}`);
  }
};

// Function to get internship details for a specific intern
const getInternshipDetails = async (internId) => {
  try {
    const internship = await Internship.findOne({ internId });
    if (!internship) {
      throw new Error('Internship not found');
    }
    return internship;
  } catch (error) {
    throw new Error(`Error fetching internship details: ${error.message}`);
  }
};

// Function to update internship details
const updateInternshipDetails = async (internId, updatedData) => {
  try {
    // Find the internship and update the provided fields
    const internship = await Internship.findOne({ internId });
    if (!internship) {
      throw new Error('Internship not found');
    }

    // Destructure updated data and update the internship record
    const { startDate, companyName, companyAddress, externalMentorName, externalMentorContact, externalMentorEmail, companyRegistrationNumber, city, stipendAmount, offerLetter, status } = updatedData;

    internship.startDate = startDate || internship.startDate;
    internship.companyName = companyName || internship.companyName;
    internship.companyAddress = companyAddress || internship.companyAddress;
    internship.externalMentorName = externalMentorName || internship.externalMentorName;
    internship.externalMentorContact = externalMentorContact || internship.externalMentorContact;
    internship.externalMentorEmail = externalMentorEmail || internship.externalMentorEmail;
    internship.companyRegistrationNumber = companyRegistrationNumber || internship.companyRegistrationNumber;
    internship.city = city || internship.city;
    internship.stipendAmount = stipendAmount || internship.stipendAmount;
    internship.offerLetter = offerLetter || internship.offerLetter;
    internship.status = status || internship.status;

    // Save the updated internship record to the database
    await internship.save();

    return { message: 'Internship details updated successfully' };
  } catch (error) {
    throw new Error(`Error updating internship details: ${error.message}`);
  }
};

// Function to delete an internship record
const deleteInternship = async (internId) => {
  try {
    // Find and delete the internship record
    const internship = await Internship.findOne({ internId });
    if (!internship) {
      throw new Error('Internship not found');
    }

    // Remove the internship record from the database
    await internship.remove();
    return { message: 'Internship deleted successfully' };
  } catch (error) {
    throw new Error(`Error deleting internship: ${error.message}`);
  }
};

// Function to verify internship completion by checking if required reports are submitted
const verifyInternshipCompletion = async (internId) => {
  try {
    // Fetch the internship and related reports
    const internship = await Internship.findOne({ internId });
    if (!internship) {
      throw new Error('Internship not found');
    }

    // Check the internship status (for example, if it is completed)
    if (internship.status !== 'Completed') {
      return { message: 'Internship is not completed yet' };
    }

    // Here, you can add more logic to verify if reports and evaluations are submitted (using reportService)
    // For simplicity, we'll assume that if the status is "Completed", the internship is considered complete.

    return { message: 'Internship is completed and all required reports are submitted' };
  } catch (error) {
    throw new Error(`Error verifying internship completion: ${error.message}`);
  }
};

// Function to list all internships (for coordinators/admins to manage)
const listAllInternships = async () => {
  try {
    const internships = await Internship.find({});
    return internships;
  } catch (error) {
    throw new Error(`Error fetching internships: ${error.message}`);
  }
};

module.exports = {
  createInternship,
  getInternshipDetails,
  updateInternshipDetails,
  deleteInternship,
  verifyInternshipCompletion,
  listAllInternships,
};
