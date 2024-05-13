import User from '../models/User.js'
import apiResponse from '../models/ApiResponse.js';


export const createUser = async (req, res, next) => {
    const newUser = new User(req.body);
    try {

        const saveUser = await newUser.save();
        if (saveUser) {
            apiResponse.success = true;
            apiResponse.message = "User added successfully";
            apiResponse.status = 200;
            apiResponse.data = saveUser;

        } else {
            apiResponse.success = false;
            apiResponse.message = "User not added";
            apiResponse.status = 400;

        }
        res.status(200).json(apiResponse);
    }
    catch (error) {
        next(error);
    }
}

export const updateUser = async (req, res, next) => {
    try {

        const findUser = await User.findById(req.params.id);
        if (findUser) {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            if (updatedUser) {

                apiResponse.success = true;
                apiResponse.message = "User updated successfully";
                apiResponse.status = 200;
                apiResponse.data = updatedUser;

            }
            else {
                apiResponse.success = false;
                apiResponse.message = "User not updated";
                apiResponse.status = 400;

            }
        }
        else {
            apiResponse.success = false;
            apiResponse.message = "invalid User id";
            apiResponse.status = 400;
        }
        res.status(200).json(apiResponse);
    }
    catch (error) {
        next(error);
    }
}

export const deleteUser = async (req, res, next) => {
    try {

        const findUser = await User.findById(req.params.id);
        if (findUser) {
            apiResponse.success = true;
            apiResponse.message = "User deleted successfully";
            apiResponse.status = 200;
            apiResponse.data = findUser;


        }
        else {
            apiResponse.success = false;
            apiResponse.message = "invalid User id";
            apiResponse.status = 400;

        }
        res.status(200).json(apiResponse);
    }
    catch (error) {
        next(error);
    }
}

export const getUser = async (req, res, next) => {
    try {

        const findUser = await User.findById(req.params.id).select('-password');;
        if (findUser) {
            apiResponse.success = true;
            apiResponse.message = "User found";
            apiResponse.status = 200;
            apiResponse.data = findUser;


        } else {
            apiResponse.success = false;
            apiResponse.message = "invalid User id";
            apiResponse.status = 400;
        }
        res.status(200).json(apiResponse);
    }
    catch (error) {
        next(error);
    }
}

export const getUsers = async (req, res, next) => {
    try {

        const findUsers = await User.find({isAdmin:false}).select('-password');
        apiResponse.success = true;
        apiResponse.message = "getting Users list";
        apiResponse.status = 200;
        apiResponse.data = findUsers;

        res.status(200).json(apiResponse);
    }
    catch (error) {
        next(error);
    }
}