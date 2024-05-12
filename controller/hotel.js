import Hotel from '../models/Hotel.js'
import ApiResponse from '../models/ApiResponse.js';
import { createError } from "../utils/error.js";

let apiResponse = {
    success: false,
    message: "",
    status: 200,
    data: null
};

export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);
    try {

        const saveHotel = await newHotel.save();
        if (saveHotel) {
            apiResponse = {
                success: true,
                message: "Hotel added successfully",
                status: 200,
                data: saveHotel
            };
        } else {
            apiResponse = {
                success: false,
                message: "Hotel not added",
                status: 400,
                data: null
            };
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
                apiResponse = {
                    success: true,
                    message: "Hotel updated successfully",
                    status: 200,
                    data: updatedHotel
                };
            }
            else {
                apiResponse = {
                    success: false,
                    message: "Hotel not updated",
                    status: 400,
                    data: null
                };
            }
        }
        else {
            apiResponse = {
                success: false,
                message: "invalid hotel id",
                status: 400,
                data: null
            };
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
            apiResponse = {
                success: true,
                message: "hotel deleted successfully",
                status: 200,
                data: findHotel
            };
        }
        else {
            apiResponse = {
                success: false,
                message: "invalid hotel id",
                status: 400,
                data: null
            };
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
            apiResponse = {
                success: true,
                message: "hotel find",
                status: 200,
                data: findHotel
            };
        } else {
            apiResponse = {
                success: false,
                message: "invalid hotel id",
                status: 400,
                data: null
            };
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
        apiResponse = {
            success: true,
            message: "getting hotels list",
            status: 200,
            data: findHotels
        };
        res.status(200).json(apiResponse);
    }
    catch (error) {
        next(error);
    }
}