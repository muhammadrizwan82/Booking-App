import User from '../models/User.js'
import apiResponse from '../models/ApiResponse.js';
import bcrypt from 'bcrypt/bcrypt.js';

export const register = async (req, res, next) => {
    try {
        const findUser = await User.findOne({ username: req.body.username })
        if (findUser) {
            apiResponse.success = false;
            apiResponse.message = "username already exists";
            apiResponse.status = 400;
        }
        else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            const newUser = new User({
                username: req.body.username,
                password: hash,
                email: req.body.eamil
            });

            newUser = await newUser.save();
            if (newUser) {
                apiResponse.success = true;
                apiResponse.message = "user added successfully";
                apiResponse.status = 200;
                apiResponse.data = newUser;
            } else {
                apiResponse.success = false;
                apiResponse.message = "user not added";
                apiResponse.status = 400;
            }
        }

        res.status(200).json(apiResponse);
    }
    catch (err) {
        next(err)
    }
}

export const login = async (req, res, next) => {
    try {
        const findUser = await User.findOne({ username: req.body.username })
        const salt = bcrypt.genSaltSync(10);
        const isPasswordCorrect = await bcrypt.compare(req.body.password, findUser.password);

        if (!findUser) {
            apiResponse.success = false;
            apiResponse.message = "incorrect username";
            apiResponse.status = 400;
        } else {
            if (!isPasswordCorrect) {
                apiResponse.success = false;
                apiResponse.message = "incorrect password";
                apiResponse.status = 400;
            }
            else {
                apiResponse.success = true;
                apiResponse.message = "user find";
                apiResponse.status = 200;
                apiResponse.data = findUser;
            }
        }
        res.status(200).json(apiResponse);
    }
    catch (err) {
        next(err)
    }
}