import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from 'jsonwebtoken';
import { userCollection } from "../model/userModel";
import { Schema } from "mongoose";
require('dotenv').config();

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {

    console.log(" Verify User Middleware")
    const token = req.headers.authorization?.split(' ')[1]; // Remove 'Bearer ' from the string

    console.log(token, "token in middleware");
    try {
        if (!token) {
            console.log('Message: Unauthorized request. Token missing.')
            return res.status(401).json({ message: 'Unauthorized request. Token missing.' });
        }

        const validUser:any = jwt.verify(token, process.env.JWT_KEY as Secret, async(err, user: any) => {
            if (user) {
                console.log(user, " :: USer Details in Middleware");
                const dbUser:any = await userCollection.findById({ _id: user.id})
                if(dbUser.status === true){
                    next();
                } else {
                    return res.status(401).json({ message: 'Unauthorized request. User is Blocked!.' });
                }
            }else {
                return res.status(401).json({ message: 'Unauthorized request. Please try again later!.' });
            }
        });

        if(!validUser){
            return res.status(401).json({ message: 'Unauthorized request. Please try again later!' });
        }

    } catch (error) {
        console.log(error, ' :: ERROR in the verifyUser middleware');
        return res.status(401).json({ message: 'Unauthorized request. Token verification failed.' });
    }
};

