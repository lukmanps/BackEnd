import { Request, Response } from "express";
import { doSellScrap } from "../../helper/user/userHelper";

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
    try{
        const data: selectedData = req.body
        doSellScrap(data)
        .then((response: any) => {
            console.log(response, " : Response after adding to DB");
            res.json(response.status);
        })
        .catch((response:any) => {
            res.json(response.status);
        })
    }   
    catch(err){
        console.log(err);
    }
}

export default {
    sellScrap
}