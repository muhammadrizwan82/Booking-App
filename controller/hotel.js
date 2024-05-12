import Hotel from '../models/Hotel.js'
import apiResponse from '../models/ApiResponse.js';


export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);
    try {

        const saveHotel = await newHotel.save();
        if (saveHotel) {
            apiResponse.success = true;
            apiResponse.message = "Hotel added successfully";
            apiResponse.status = 200;
            apiResponse.data = saveHotel;

        } else {
            apiResponse.success = false;
            apiResponse.message = "Hotel not added";
            apiResponse.status = 400;

        }
        res.status(200).json(apiResponse);
    }
    catch (error) {
        next(error);
    }
}

export const updateHotel = async (req, res, next) => {
    try {

        const findHotel = await Hotel.findById(req.params.id);
        if (findHotel) {
            const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            if (updatedHotel) {

                apiResponse.success = true;
                apiResponse.message = "Hotel updated successfully";
                apiResponse.status = 200;
                apiResponse.data = updatedHotel;

            }
            else {
                apiResponse.success = false;
                apiResponse.message = "Hotel not updated";
                apiResponse.status = 400;

            }
        }
        else {
            apiResponse.success = false;
            apiResponse.message = "invalid hotel id";
            apiResponse.status = 400;
        }
        res.status(200).json(apiResponse);
    }
    catch (error) {
        next(error);
    }
}

export const deleteHotel = async (req, res, next) => {
    try {

        const findHotel = await Hotel.findById(req.params.id);
        if (findHotel) {
            apiResponse.success = true;
            apiResponse.message = "hotel deleted successfully";
            apiResponse.status = 200;
            apiResponse.data = findHotel;


        }
        else {
            apiResponse.success = false;
            apiResponse.message = "invalid hotel id";
            apiResponse.status = 400;

        }
        res.status(200).json(apiResponse);
    }
    catch (error) {
        next(error);
    }
}

export const getHotel = async (req, res, next) => {
    try {

        const findHotel = await Hotel.findById(req.params.id);
        if (findHotel) {
            apiResponse.success = true;
            apiResponse.message = "hotel found";
            apiResponse.status = 200;
            apiResponse.data = findHotel;


        } else {
            apiResponse.success = false;
            apiResponse.message = "invalid hotel id";
            apiResponse.status = 400;
        }
        res.status(200).json(apiResponse);
    }
    catch (error) {
        next(error);
    }
}

export const getHotels = async (req, res, next) => {
    try {

        const findHotels = await Hotel.find();
        apiResponse.success = true;
        apiResponse.message = "getting hotels list";
        apiResponse.status = 200;
        apiResponse.data = findHotels;

        res.status(200).json(apiResponse);
    }
    catch (error) {
        next(error);
    }
}