import Hotel from '../models/Hotel.js';
import apiResponse from '../models/ApiResponse.js';
import { camelCase } from '../utils/helper.js';
//const { camelCase } = require('../utils/helper.js');

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

/*
const { min, max, ...others } = req.query;
console.log(min | 1, max || 10000, others)
try {
    const findHotels = await Hotel.find({
        req.query
    })//.limit(req.query.limit);
*/
export const getHotels = async (req, res, next) => {
    const response = { ...apiResponse };
    const { min, max, limit, ...others } = req.query;
    console.log(min | 1, max || 10000, limit, others)
    try {
        const findHotels = await Hotel.find({
            ...others, cheapestPrice: {
                $gt: min | 1,
                $lt: max || 10000
            }
        }).limit(limit);
        response.success = true;
        response.message = "Getting hotels list";
        response.status = 200;
        response.data = findHotels;
        res.status(response.status).json(response);
    } catch (error) {
        next(error);
    }
};

export const getHotelCountByCity = async (req, res, next) => {
    const response = { ...apiResponse };

    if (!req.query.cities) {
        response.message = "No cities provided";
        response.status = 400;
        return res.status(response.status).json(response);
    }

    const cities = req.query.cities.split(",").map(city => city.trim());
    console.log(cities);
    try {
        const hotelData = await Promise.all(cities.map(async (city) => {
            const hotels = await Hotel.find({ city: city }).select('photos');
            const count = hotels.length;
            const photoUrl = hotels.length > 0 && hotels[0].photos.length > 0 ? hotels[0].photos[0] : null;
            return { city, count, photoUrl };
        }));

        response.success = true;
        response.message = "Getting hotels count by cities";
        response.status = 200;
        response.data = hotelData;
        res.status(response.status).json(response);
    } catch (error) {
        next(error);
    }
};


export const getHotelCountByType = async (req, res, next) => {
    const response = { ...apiResponse };

    if (!req.query.types) {
        response.message = "No type provided";
        response.status = 400;
        return res.status(response.status).json(response);
    }

    const types = req.query.types.split(",").map(type => type.trim());
    console.log(types);
    try {
        const hotelData = await Promise.all(types.map(async (type) => {
            const hotels = await Hotel.find({ type: type }).select('photos');
            const count = hotels.length;
            const photoUrl = hotels.length > 0 && hotels[0].photos.length > 0 ? hotels[0].photos[0] : null;
            return { type, count, photoUrl };
        }));

        response.success = true;
        response.message = "Getting hotels count by types";
        response.status = 200;
        response.data = hotelData;
        res.status(response.status).json(response);
    } catch (error) {
        next(error);
    }
};
