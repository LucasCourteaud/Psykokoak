import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const url = process.env.URL_MONGO;

const connect = () => {
    console.log('Try to connect to db');
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('Connected !');
    }).catch(err => {
        console.log("Can't connect !", err);
        process.exit();
    });
};

export { connect };