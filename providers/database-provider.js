const mongoose = require('mongoose');
const {
    DATABASE_DRIVER,
    DATABASE_HOST,
    DATABASE_PASSWORD,
    DATABASE_USERNAME,
    DATABASE_NAME,
    DATABASE_PORT
} = require('../config/database');

mongoose
    .connect(`mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`, {
        socketTimeoutMS: 5000
    })
    .then(() => {
        console.log(`Successfully connected to MongoDB`);
    })
    .catch((error) => {
        console.log('Error connecting to database: ', error);
        return process.exit(1);
    });
