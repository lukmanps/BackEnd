import { Request, Response } from "express";
import Razorpay from "razorpay";
import { razorPay } from "../../config/razorpay";
require('dotenv').config();
import { updatePayment } from "../../helper/admin/paymentHelper";

export const payment = async (req: Request, res: Response) => {
    try {
        //Take amount from Front end as Req.body.amount
        //Number(req.body.amount * 100)
        const amount: number = req.body.amount;
        console.log(amount, "PAYMENT Called");
        const options = {
            amount: amount * 100,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
        };
        const order = await razorPay.orders.create(options);

        console.log(order, " : Order Received");
        res.status(200).json({
            success: true,
            order
        });
    }
    catch (err) {
        console.log(err, " : ERROR IN Payment ");
    }

}

export const paymentVerification = async (req: Request, res: Response) => {
    try {
        console.log(":::::: Payment Verification Called :::::")
        console.log(req.body, "Payment Verification Done!");

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount, userId } = req.body;

        updatePayment(userId, amount )
        .then((response: any) => {
            if(response.status === true){
                res.redirect(`http://localhost:3000/admin/payment-success?reference=${razorpay_payment_id}`);
            }
        })

        
    }
    catch (err) {
        console.log(err, " : ERROR IN Payment ");
        res.redirect('http://localhost:3000/payment-error');
    }

}

export const getKey = (req: Request, res: Response) => {
    try {
        console.log(process.env.RAZOR_PAY_ID, " KEY");
        res.status(200).json({ key: process.env.RAZOR_PAY_ID })
    }
    catch (err) {
        console.log(err, " getKey Error");
    }
}

export default {
    payment,
    paymentVerification,
    getKey
}