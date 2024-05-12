import mongoose from 'mongoose';
const RoomSchema = new mongoose.Schema({
    roomnumber: {
        type: String,
        require: true
    },
    hotelid: {
        type: String,
        require: true
    }
})


export default mongoose.model("Room", RoomSchema)