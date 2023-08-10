import { Request, Response, response } from "express";
import { doSellScrap, addReview, getAllReviews } from "../../helper/user/userHelper";

export interface selectedData {
    userId: string,
    scrap: [{
        item: string,
        quantity: number
    }],
    formData: {
        name: string,
        email: string,
        phoneNo: string,
        address1: string,
        address2: string,
        locality: string,
        pin: string
    },
    timeSlot: {
        date: string,
        time: string
    }
}

export const sellScrap = (req: Request, res: Response) => {
        const data: selectedData = req.body

        doSellScrap(data)
        .then((response: any) => {
            res.json(response.status);
        })
        .catch((response:any) => {
            res.json(response.status);
        })
}

export const review = (req: Request, res: Response) => {
        addReview(req.body)
        .then((response) => {
            res.json(response);
        })
        .catch((err) => {
            res.json(err.status);
        })
}

export const getReviews = async(req: Request, res: Response) => {
    try{
        const reviews = await getAllReviews();
        res.json(reviews);
    } 
    catch(err){
        console.log(err, " :: Error in getReviews");
    }
}   

export default {
    sellScrap,
    review
}