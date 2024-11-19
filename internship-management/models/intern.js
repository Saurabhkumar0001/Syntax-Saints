const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Intern Schema
const internSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    externalMentor: {
        type: String,
        required: true
    },
    offerLetter: {
        type: String, // URL or file path
        required: true
    },
    location: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: false
        }
    },
    submittedReports: {
        type: Array,
        default: []
    }
});

// Password hashing before saving
internSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare passwords
internSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Create geospatial index for location tracking
internSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Intern', internSchema);
