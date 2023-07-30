import Razorpay from "razorpay";
require('dotenv').config();

export const razorPay = new Razorpay({
    key_id: process.env.RAZOR_PAY_ID || '',
    key_secret: process.env.RAZOR_PAY_SECRET_KEY || '',
  });