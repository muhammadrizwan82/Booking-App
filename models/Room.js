import mongoose from 'mongoose';
const RoomSchema = new mongoose.Schema({
    roomnumber: {
        type: String,
        require: true
    },
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