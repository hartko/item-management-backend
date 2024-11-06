const mongoose = require('mongoose');
const dotenv = require('dotenv');
const envKeys = require('./keys');

// Load environment variables from .env file
dotenv.config();

// Get the MongoDB URI from environment variables
const databaseUrl = envKeys.databaseUrl;

const connectDB = async () => {
  try {
    // Use Mongoose to connect to MongoDB
    await mongoose.connect(databaseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit the process with failure code
  }
};

module.exports = connectDB;
