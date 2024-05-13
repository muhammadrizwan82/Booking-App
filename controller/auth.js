import User from '../models/User.js'
import apiResponse from '../models/ApiResponse.js';
import bcrypt from 'bcrypt/bcrypt.js';
import jwt from 'jsonwebtoken';

let token = "";
export const register = async (req, res, next) => {
    try {
        if (!req.body.username || !req.body.password || !req.body.email) {
            apiResponse.success = false;
            apiResponse.message = "invalid request";
            apiResponse.status = 400;
        }
        else {
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

                const saveUser = await newUser.save();
                if (saveUser) {
                    const {password,isAdmin,...OtherDetails} = saveUser._doc
                    apiResponse.success = true;
                    apiResponse.message = "user added successfully";
                    apiResponse.status = 200;
                    apiResponse.data = OtherDetails;
                } else {
                    apiResponse.success = false;
                    apiResponse.message = "user not added";
                    apiResponse.status = 400;
                }
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

        if (!req.body.username || !req.body.password) {
            apiResponse.success = false;
            apiResponse.message = "invalid credentials";
            apiResponse.status = 400;
        }
        else {
            const findUser = await User.findOne({ username: req.body.username })
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
                    
                    const {password,isAdmin,...OtherDetails} = findUser._doc
                    token = jwt.sign({id:findUser._id,isAdmin:findUser.isAdmin},process.env.JWTSecret)
                    apiResponse.success = true;
                    apiResponse.message = "user find";
                    apiResponse.status = 200;
                    apiResponse.data = OtherDetails;
                }
            }
        }
        if(token!="")
        {
            res
                .cookie("access_token",token,{
                    httpOnly:true
                })
                .status(200).json(apiResponse);
        }
        else{
            res.status(200).json(apiResponse);
        }
        
    }
    catch (err) {
        next(err)
    }
}