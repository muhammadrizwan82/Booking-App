import mongoose from 'mongoose';
const RoomSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    maxPerson: {
        type: Number,
        require: true
    },
    roomNumbers: [{
        number: Number, unavailableDates: { type: [Date] }
    }],
    hotelid: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
})


export default mongoose.model("Room", RoomSchema)