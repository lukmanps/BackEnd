import { Request, Response, NextFunction } from "express"
import jwt, {Secret} from 'jsonwebtoken';
require('dotenv').config();

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token, " :: Token in middleware");
    try{
        if(token === null || !token){
            return res.status(401).json({message: 'Unauthorized request. Token not found!'})
        }

        const verifiedAdmin = jwt.verify(token, process.env.JWT_KEY as Secret);

        if(!verifiedAdmin) {
            return res.status(401).json({message: 'Unauthorized request. Invalid Token'});
        }

        next();
    }
    catch(err){
        return res.status(401).json({message: 'Unauthorized request. Token Verification failed'});
    }
}