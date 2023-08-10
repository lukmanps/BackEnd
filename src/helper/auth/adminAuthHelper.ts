import { Secret } from "jsonwebtoken"
import { adminCollection } from "../../model/adminModel";
import jwt from 'jsonwebtoken'

export const adminDoLogin = (data: { email: string, password: string }) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(data, ': Data in adminDOLoING')
            let admin = await adminCollection.findOne({ email: data.email })

            if (admin) {
                if (admin.password === data.password) {
                    let adminInfo = {
                        id: admin._id,
                        email: admin.email,
                        username: admin.username
                    }
                    let adminAccessToken = jwt.sign(adminInfo, process.env.JWT_key as Secret, {expiresIn: 3600});
                    resolve({ adminInfo, adminAccessToken })
                } else {
                    let message = 'Incorrect Password';
                    resolve({status: false, message});
                }

            } else {
                let message = 'Admin do not exists';
                resolve({status: false, message});
            }
        }
        catch (err) {
            console.log(err, ": ERROR in adminDoLogin");
            reject(err);
        }

    })
}

export default {
    adminDoLogin
}