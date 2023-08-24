import { Request, Response, NextFunction } from "express"
import jwt, {Secret} from 'jsonwebtoken';
require('dotenv').config();

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token, " :: Token in middleware");
    try {
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized request. Token not found!' });
        }

        jwt.verify(token, process.env.JWT_KEY as Secret, (err, admin: any) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized request. Invalid Token' });
            }

            // Admin is verified, you can attach admin data to the request if needed
           if(admin){
            next();
           }
        });
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized request. Token Verification failed' });
    }
};