import { Secret } from "jsonwebtoken"
import { adminCollection } from "../../model/adminModel";
import jwt from 'jsonwebtoken';
require('dotenv').config();

console.log(process.env.JWT_key);


export const adminDoLogin = async (data: { email: string, password: string }) => {
    try {
        console.log(data, ': Data in adminDoLogin');
        
        // Assuming adminCollection is a valid MongoDB collection instance
        let admin = await adminCollection.findOne({ email: data.email });

        if (admin) {
            if (admin.password === data.password) {
                let adminInfo = {
                    id: admin._id,
                    email: admin.email,
                    username: admin.username,
                    admin: true,
                };
                
                // Use a hashed JWT secret from process.env.JWT_key
                let adminAccessToken = await jwt.sign(adminInfo, process.env.JWT_key as Secret, { expiresIn: '1d' });
                
                return { status: true, adminInfo, adminAccessToken };
            } else {
                return { status: false, message: 'Incorrect Password' };
            }
        } else {
            return { status: false, message: 'Admin does not exist' };
        }
    } catch (err) {
        console.error(err, ': ERROR in adminDoLogin');
        throw err; // Rethrow the error for higher-level error handling
    }
};

export default {
    adminDoLogin
}