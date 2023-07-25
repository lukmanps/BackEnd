import { Request, Response } from "express";
import { doSellScrap } from "../../helper/user/userHelper";

export interface selectedData {
    userId: string,
    scrap: string[],
    formData: {
        name: string,
        email: string,
        phoneNo: string,
        address1: string,
        address2: string,
        locality: string,
        pin: string
    },
    timeSlot: string
}

export const sellScrap = (req: Request, res: Response) => {
    try{
        const data: selectedData = req.body

        doSellScrap(data)
    }   
    catch(err){
        console.log(err);
    }
}

export default {
    sellScrap
}