import { resolve } from 'path';
import { userDetails } from '../../controllers/auth/userAuthController';
import { userCollection } from '../../model/userModel';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import { rejects } from 'assert';
import { response } from 'express';
require('dotenv').config();


//User Registration
export const doRegister = (data: userDetails) => {
    return new Promise(async (resolve, reject) => {
        let user = await userCollection.findOne({ email: data.email });

        if (!user) {
            data.password = await bcrypt.hash(data.password, 10);

            userCollection.create(data).then((newUser) => {
                let userData = {
                    _id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                    phoneNo: newUser.phoneNo,
                    status: newUser.status,
                }

                //JWT Authentication
                const accessToken = jwt.sign(userData, process.env.JWT_KEY as Secret, { expiresIn: '1d' });

                resolve({ userData, accessToken });

            }).catch((err) => {
                reject(err);
                console.log(err, " :Error from Database ")
            })
        } else {
            console.log('User Already Exists');
            let message = 'User Already Exists';
            resolve({ status: false, message });
        }
    })
}

//User Login
export const doLogin = async (data: { email: string, password: string }) => {
    try {
        const user = await userCollection.findOne({ email: data.email });

        if (user) {
            if (user.status && user.signInWithGoogle === false) {
                const verifyPassword = await bcrypt.compare(data.password, user.password!);
                if (verifyPassword) {
                    const userData = {
                        _id: user._id,
                        email: user.email,
                        username: user.username,
                        phoneNo: user.phoneNo,
                        status: user.status,
                        profilePicture: user.profilePicture,
                        wallet: user.wallet
                    };
                    const token = jwt.sign(userData, process.env.JWT_KEY!, { expiresIn: '1d' });
                    return { userData, token };
                } else {
                    const message = 'Incorrect Password';
                    return { status: false, message };
                }
            } else if(user.signInWithGoogle === true){
                const message = 'Try Login with Google';
                return { status: false, message };
            } else {
                const message = 'User is blocked';
                return { status: false, message };
            }
        } else {
            const message = 'User not found';
            return { status: false, message };
        }
    } catch (err) {
        console.log(err, " :: Error in doLogin ");
        throw err; // Reject the promise with the error
    }
};


export const doSignInWithGoogle = (data: any) => {
    return new Promise(async (resolve, reject) => {
        const newData = {
            ...data,
            signInWithGoogle: true
        }
        const user = await userCollection.findOne({ email: data.email })
        if (!user) {
            userCollection.create(newData).then((newUser) => {
                let userData = {
                    id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                    status: newUser.status
                }

                //Jwt Token
                const accessToken = jwt.sign(userData, process.env.JWT_KEY as Secret, { expiresIn: '1d' });
                resolve({ userData, accessToken });
            }).catch((err) => {
                reject(err);
                console.log(err, " :Error from Database ")
            })
        } else {
            if(user.status && user.signInWithGoogle){
                let userData = {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    wallet: user.wallet,
                    status: user.status
                }
                //JWT Token
                const accessToken = jwt.sign(userData, process.env.JWT_KEY as Secret, { expiresIn: '1d' });
                resolve({userData, accessToken});
            } else if(user.signInWithGoogle === false) {
                const message = 'Try usual Login!';
                resolve ({ status: false, message });
            } else {
                const message = 'User is blocked';
                resolve ({ status: false, message });
            }
        }
    })
}

export default {
    doRegister,
    doLogin,
    doSignInWithGoogle
}