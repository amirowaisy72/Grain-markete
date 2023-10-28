const mongoose = require('mongoose');

const connectToMongo = (username) => {
    const dbName = username; // Append the username to the database name
    const url = `mongodb+srv://amirowaisy72:iVVKYSj5rugATyVg@cluster0.mpb1bfz.mongodb.net/${dbName}`;

    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

    const db = mongoose.connection;

    db.on('error', (err) => {
        console.error(`Connection error: ${err}`);
    });

    db.once('open', () => {
        console.log(`Connected to MongoDB for user: ${username}`);
    });
};

module.exports = connectToMongo;
