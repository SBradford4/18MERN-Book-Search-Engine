import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connection = async () => {
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks')
        .then(() => {
            console.log(`successfully connected`);
        }).catch(() => {
            console.log(`not connected`);
        });
}


export default connection;
