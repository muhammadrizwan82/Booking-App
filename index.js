import express from "express";
import connect from './dbconnection/connection.js';
import authRoute from './routes/auth.js';
import hotelsRoute from './routes/hotels.js';
import roomsRoute from './routes/rooms.js';
import usersRoute from './routes/users.js';
import cookieparser from "cookie-parser";
const app = express();


//Middleware
app.use(cookieparser());
app.use(express.json());
app.use("/api/auth", authRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)
app.use("/api/users", usersRoute)


app.use((err, req, res, next) => {
    console.log("i am in middleware");
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "something went wrong";
    if (err.name == 'CastError') {
        res.status(errorStatus).json({
            success: false,
            status: errorStatus,
            message: 'invalid hotel id',
            stack: err.stack
        });
    } else {
        res.status(errorStatus).json({
            success: false,
            status: errorStatus,
            message: errorMessage,
            stack: err.stack
        });
    }
});

app.listen(8800, () => {
    connect();
    console.log('Connected to backend!');
});
