import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from 'jsonwebtoken';
import { userCollection } from "../model/userModel";
require('dotenv').config();

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {

    console.log(" Verify User Middleware")
    const token = req.headers.authorization?.split(' ')[1]; // Remove 'Bearer ' from the string

    console.log(token, "token in middleware");
    try {
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized request. Token missing.' });
        }

        const verifiedUser = jwt.verify(token, process.env.JWT_KEY as Secret);

        if (!verifiedUser) {
            return res.status(401).json({ message: 'Unauthorized request. Invalid token.' });
        }

        // Attach the verified user to the request for use in subsequent middleware/routes
        // req.user = verifiedUser;
        next();
    } catch (error) {
        console.log(error, ' :: ERROR in the verifyUser middleware');
        return res.status(401).json({ message: 'Unauthorized request. Token verification failed.' });
    }
};

