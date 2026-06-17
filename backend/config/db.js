const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // This attempts to connect to your database using your environment variable
        const conn = await mongoose.connect(process.env.MONGO_URI);
        
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        // FIXED: 'error' is now passed into the catch block above, 
        // so this line will no longer crash your app.
        console.error(`MongoDB connection failed: ${error.message}`);
        process.exit(1); // Closes the app safely if the connection fails
    }
};

module.exports = connectDB;