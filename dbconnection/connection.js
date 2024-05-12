
import mongoose from 'mongoose';
import dotnet from "dotenv";
dotnet.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.DBConnection);
    } catch (error) {
        console.error('Error connecting to database:', error.message);
        throw error;
    }
};


mongoose.connection.on('disconnected', () => {
    console.log('disconnected from database');
});

mongoose.connection.on('connected', () => {
    console.log('connected to database');
});

export default connect;
