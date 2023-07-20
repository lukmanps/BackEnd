import {Response, Request } from 'express';
import {doRegister, doLogin} from '../../helper/auth/userAuthHelper';

export interface userDetails {
    username: string,
    email: string,
    phoneNo: string,
    password: string
}

export const userSignup = (req: Request, res: Response) => {
    try{

        const userData: userDetails = {
            username: req.body.username,
            email: req.body.email,
            phoneNo: req.body.phoneNo,
            password: req.body.password
        }

        doRegister(userData)
        .then((response)=>{
            console.log(response, ": Response from User Registration");
            res.json(response);
        })
        .catch((err)=>{
            console.log(err, ": Error from User Registration");
        })
    }

    catch(err){
        console.log(err, ' : ERROR in userSignup');
    }
}

export const userLogin = (req: Request, res: Response) => {
    try{

        const userData: userDetails = req.body;
        
        doLogin(userData)
        .then((response)=>{
            console.log(response, ": RESPONSE in userLOGIN");
            res.json(response);
        })
        .catch((err)=>{
            console.log(err, ': ERROR from do LOGIN');
        })
    }
    catch(err){
        console.log(err, ' : ERROR in userLogin')
    }
}




export default {
    userSignup,
    userLogin
}
