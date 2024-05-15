import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import apiResponse from '../models/ApiResponse.js';
//https://www.youtube.com/watch?v=k3Vfj-e1Ma4&t=4364s
export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    req.body.hotelid = hotelId;  // Add hotelId to req.body
    const newRoom = new Room(req.body);
    const response = { ...apiResponse };

    try {
        const findHotel = await Hotel.findById(hotelId);
        if (!findHotel) {
            response.success = false;
            response.message = "Invalid hotel ID";
            response.status = 400;
        } else {
            const saveRoom = await newRoom.save(newRoom);
            if (saveRoom) {
                try {
                    await Hotel.findByIdAndUpdate(hotelId, {
                        $push: { rooms: saveRoom._id },
                    });
                }
                catch (err) {
                    next(err)
                }
                response.success = true;
                response.message = "Room added successfully";
                response.status = 200;
                response.data = saveRoom;
            } else {
                response.success = false;
                response.message = "Room not added";
                response.status = 400;
            }
        }
        res.status(response.status).json(response);
    } catch (err) {
        next(err);
    }
};

export const updateRoom = async (req, res, next) => {
    const response = { ...apiResponse };
    try {
        const findRoom = await Room.findById(req.params.id);
        if (findRoom) {
            const updatedRoom = await Room.findByIdAndUpdate(findRoom._id,
                {
                    $set: req.body,
                    updatedAt: new Date().toISOString()
                }, { new: true });

            await Hotel.findByIdAndUpdate(findRoom.hotelid, {
                $pull: {
                    rooms: findRoom._id,
                },
                updatedAt: new Date().toISOString()
            });
            if (updatedRoom) {
                response.success = true;
                response.message = "Room updated successfully";
                response.status = 200;
                response.data = updatedRoom;
            } else {
                response.success = false;
                response.message = "Room not updated";
                response.status = 400;
            }
        } else {
            response.success = false;
            response.message = "Invalid room ID";
            response.status = 400;
        }
        res.status(response.status).json(response);
    } catch (error) {
        next(error);
    }
};

export const deleteRoom = async (req, res, next) => {
    const response = { ...apiResponse };
    try {

        const findRoom = await Room.findById(req.params.id);
        if (findRoom) {

            await Room.findByIdAndDelete(findRoom._id);
            await Hotel.findByIdAndUpdate(findRoom.hotelid, {
                $pull: {
                    rooms: findRoom._id,
                },
                updatedAt: new Date().toISOString()
            });


            response.success = true;
            response.message = "Room deleted successfully";
            response.status = 200;
            response.data = findRoom;
        } else {
            response.success = false;
            response.message = "Invalid room ID";
            response.status = 400;
        }
        res.status(response.status).json(response);
    } catch (error) {
        console.log('error in deleting roonm');
        next(error);
    }
};

export const getRoom = async (req, res, next) => {
    const response = { ...apiResponse };
    try {
        const findRoom = await Room.findById(req.params.id);
        if (findRoom) {
            response.success = true;
            response.message = "Room found";
            response.status = 200;
            response.data = findRoom;
        } else {
            response.success = false;
            response.message = "Invalid room ID";
            response.status = 400;
        }
        res.status(response.status).json(response);
    } catch (error) {
        next(error);
    }
};

export const getRooms = async (req, res, next) => {
    const response = { ...apiResponse };
    try {
        const findRooms = await Room.find();
        response.success = true;
        response.message = "Getting rooms list";
        response.status = 200;
        response.data = findRooms;
        res.status(response.status).json(response);
    } catch (error) {
        next(error);
    }
};
