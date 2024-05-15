import Hotel from '../models/Hotel.js';
import apiResponse from '../models/ApiResponse.js';

export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);
    const response = { ...apiResponse };

    try {
        const saveHotel = await newHotel.save();
        if (saveHotel) {
            response.success = true;
            response.message = "Hotel added successfully";
            response.status = 201;  // 201 Created
            response.data = saveHotel;
        } else {
            response.success = false;
            response.message = "Hotel not added";
            response.status = 400;
        }
        res.status(response.status).json(response);
    } catch (error) {
        next(error);
    }
};

export const updateHotel = async (req, res, next) => {
    const response = { ...apiResponse };

    try {
        const findHotel = await Hotel.findById(req.params.id);
        if (findHotel) {
            const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id,
                {
                    $set: req.body,
                    updatedAt: new Date().toISOString()
                }, { new: true });
            if (updatedHotel) {
                response.success = true;
                response.message = "Hotel updated successfully";
                response.status = 200;
                response.data = updatedHotel;
            } else {
                response.success = false;
                response.message = "Hotel not updated";
                response.status = 400;
            }
        } else {
            response.success = false;
            response.message = "Invalid hotel ID";
            response.status = 404;  // 404 Not Found
        }
        res.status(response.status).json(response);
    } catch (error) {
        next(error);
    }
};

export const deleteHotel = async (req, res, next) => {
    const response = { ...apiResponse };

    try {
        const findHotel = await Hotel.findById(req.params.id);
        if (findHotel) {
            await Hotel.findByIdAndDelete(req.params.id);
            response.success = true;
            response.message = "Hotel deleted successfully";
            response.status = 200;
            response.data = findHotel;
        } else {
            response.success = false;
            response.message = "Invalid hotel ID";
            response.status = 404;  // 404 Not Found
        }
        res.status(response.status).json(response);
    } catch (error) {
        next(error);
    }
};

export const getHotel = async (req, res, next) => {
    const response = { ...apiResponse };

    try {
        const findHotel = await Hotel.findById(req.params.id);
        if (findHotel) {
            response.success = true;
            response.message = "Hotel found";
            response.status = 200;
            response.data = findHotel;
        } else {
            response.success = false;
            response.message = "Invalid hotel ID";
            response.status = 404;  // 404 Not Found
        }
        res.status(response.status).json(response);
    } catch (error) {
        next(error);
    }
};

export const getHotels = async (req, res, next) => {
    const response = { ...apiResponse };

    try {
        const findHotels = await Hotel.find();
        response.success = true;
        response.message = "Getting hotels list";
        response.status = 200;
        response.data = findHotels;
        res.status(response.status).json(response);
    } catch (error) {
        next(error);
    }
};
