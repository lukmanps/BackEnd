import { userDetails } from '../../controllers/auth/userAuthController';
import { userCollection } from '../../model/userModel';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
require('dotenv').config();


//User Registration
export const doRegister = (data: userDetails) => {
    return new Promise(async (resolve, reject) => {
        let user = await userCollection.findOne({ email: data.email });

        if (!user) {
            data.password = await bcrypt.hash(data.password, 10);

            userCollection.create(data).then((newUser) => {
                let userData = {
                    id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                    phoneNo: newUser.phoneNo,
                    status: newUser.status
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
            let message=  'User Already Exists';
            resolve({ status: false, message});
        }
    })
}

//User Login
export const doLogin = (data: { email: string, password: string }) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await userCollection.findOne({ email: data.email });

            if (user) {
                if (user.status) {
                    const verifyPassword = await bcrypt.compare(data.password, user.password);
                    if (verifyPassword) {
                        let userData = {
                            id: user._id,
                            email : user.email,
                            username: user.username,
                            phoneNo: user.phoneNo,
                            status: user.status
                        }
                        const token = jwt.sign(userData, process.env.JWT_KEY as Secret, { expiresIn: 3600 });
                        resolve({ userData, token });
                    } else {
                        let message = 'Incorrect Password'
                        resolve({ status: false, message });
                    }
                } else {
                    let message = 'User is blocked';
                    resolve({ status: false, message });
                }
            } else {
                let message = 'User not found'
                resolve({ status: false, message });
            }
        }
        catch (err) {
            console.log(err, " :: Error in doLogin ");
        }
    })
}

export default {
    doRegister,
    doLogin
}