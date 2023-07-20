import { Request, Response } from "express";
import {adminDoLogin} from '../../helper/auth/adminAuthHelper'

export const adminLogin = (req: Request, res: Response) => {
    try {
        const adminData : {
            email: string,
            password: string
        } = req.body

        adminDoLogin(adminData)
        .then((response)=>{
            res.json(response);
        }).catch((err)=>{
            console.log(err, ' :ERROR in adminLogin');
        });
    }
    catch(err){
        console.log(err, ' :ERROR in adminLogin');
    }
}

export default {
    adminLogin
}