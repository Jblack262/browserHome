const mongoose = require('mongoose');

const connectDB = (url) => {
    console.log('connecting....')
    return mongoose
        .connect(url)
        .then(() => {console.log('Successfully connected to MongoDB')})
        .catch((err) => {console.log(err)})
}

module.exports = connectDB;