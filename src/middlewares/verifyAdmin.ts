import { Request, Response, NextFunction } from "express"
import jwt, {Secret} from 'jsonwebtoken';
require('dotenv').config();

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
    
}