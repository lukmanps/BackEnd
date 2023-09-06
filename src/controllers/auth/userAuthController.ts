import { Response, Request } from 'express';
import { doRegister, doLogin, doSignInWithGoogle } from '../../helper/auth/userAuthHelper';

export interface userDetails {
    username: string,
    email: string,
    phoneNo: string,
    password: string
}

export const userSignup = (req: Request, res: Response) => {
    try {

        const userData: userDetails = {
            username: req.body.username,
            email: req.body.email,
            phoneNo: req.body.phoneNo,
            password: req.body.password
        }

        doRegister(userData)
            .then((response) => {
                console.log(response, ": Response from User Registration");
                res.json(response);
            })
            .catch((err) => {
                console.log(err, ": Error from User Registration");
            })
    }

    catch (err) {
        console.log(err, ' : ERROR in userSignup');
    }
}

export const userLogin = (req: Request, res: Response) => {
    const userData: userDetails = req.body;

    console.log(userData, " user data");
    doLogin(userData)
        .then((response: any) => {
            console.log(response, " :: Response from doLogin");
            res.status(200).json(response);
        })
        .catch((err) => {
            console.log(err, ': ERROR in userLogin');
        })
}

export const signInWithGoogle = (req: Request, res: Response) => {
    const userData = {
        username: req.body?.displayName,
        email: req.body?.email,
        profilePicture: req.body?.photoURL
    }
    doSignInWithGoogle(userData)
    .then((response)=>{
        console.log(response, " ::resposne");
        res.status(200).json(response);
    })
    .catch((err)=>{
        console.log(err, 'ERROR in signInWithGoogle');
    })

}



export default {
    userSignup,
    userLogin,
    signInWithGoogle
}
