const Location = require('../models/Location'); // Import the Location model to store location data for interns
const moment = require('moment'); // For handling timestamp and time formatting

// Function to save the current location of an intern
const saveInternLocation = async (internId, locationData) => {
  try {
    // Destructure locationData
    const { latitude, longitude, timestamp } = locationData;

    // Check if the intern has any existing location record for today (to avoid duplicate entries)
    const existingLocation = await Location.findOne({ internId, date: moment().format('YYYY-MM-DD') });

    if (existingLocation) {
      // If a location entry already exists for today, update the location
      existingLocation.latitude = latitude;
      existingLocation.longitude = longitude;
      existingLocation.timestamp = timestamp;
      
      await existingLocation.save();
      return { message: 'Location updated successfully' };
    }

    // Create a new location record
    const newLocation = new Location({
      internId,
      latitude,
      longitude,
      timestamp: moment(timestamp).toDate(), // Convert timestamp to date object
      date: moment().format('YYYY-MM-DD'), // Store the date as 'YYYY-MM-DD' format
    });

    // Save the new location record to the database
    await newLocation.save();

    return { message: 'Location saved successfully' };
  } catch (error) {
    throw new Error(`Error saving location: ${error.message}`);
  }
};

// Function to get the latest location of an intern
const getLatestLocation = async (internId) => {
  try {
    // Find the most recent location entry for the intern
    const latestLocation = await Location.findOne({ internId }).sort({ timestamp: -1 });
    
    if (!latestLocation) {
      throw new Error('No location data found for this intern');
    }

    return latestLocation;
  } catch (error) {
    throw new Error(`Error fetching latest location: ${error.message}`);
  }
};

// Function to get the location of an intern for a specific date
const getLocationByDate = async (internId, date) => {
  try {
    // Format the date in 'YYYY-MM-DD' format
    const formattedDate = moment(date).format('YYYY-MM-DD');
    
    // Find the location record for the intern on the given date
    const location = await Location.findOne({ internId, date: formattedDate });

    if (!location) {
      throw new Error('No location data found for this intern on the specified date');
    }

    return location;
  } catch (error) {
    throw new Error(`Error fetching location by date: ${error.message}`);
  }
};

// Function to get the location history of an intern
const getLocationHistory = async (internId) => {
  try {
    // Fetch all location records for the intern
    const locationHistory = await Location.find({ internId }).sort({ timestamp: -1 });

    if (!locationHistory || locationHistory.length === 0) {
      throw new Error('No location history found for this intern');
    }

    return locationHistory;
  } catch (error) {
    throw new Error(`Error fetching location history: ${error.message}`);
  }
};

// Function to delete a location record
const deleteLocation = async (internId, date) => {
  try {
    // Format the date in 'YYYY-MM-DD' format
    const formattedDate = moment(date).format('YYYY-MM-DD');

    // Find and delete the location record for the intern on the specified date
    const location = await Location.findOneAndDelete({ internId, date: formattedDate });

    if (!location) {
      throw new Error('Location record not found');
    }

    return { message: 'Location record deleted successfully' };
  } catch (error) {
    throw new Error(`Error deleting location record: ${error.message}`);
  }
};

module.exports = {
  saveInternLocation,
  getLatestLocation,
  getLocationByDate,
  getLocationHistory,
  deleteLocation,
};
