import { Request, Response } from "express";
import { getCustomerCount, getPickupCount, getDashboardInfo } from "../../helper/admin/dashboardHelper";

export const customerCount = async(req: Request, res: Response) => {
   try{
    const customerCount = await getCustomerCount();
    res.json(customerCount);
   } 
   catch(err){
    console.log(err);
   }
}

export const pickupCount = async(req: Request, res: Response) => {
    try{
        const pickupCount = await getPickupCount()
        res.json(pickupCount)
    }
    catch(err){
        console.log(err);
    }
}

export const dashboardInfo = async(req: Request, res: Response) => {
    try{
        const dashboardData = await getDashboardInfo();
        res.json(dashboardData);
    }
    catch(err){
        console.log(err);
    }
}

export default {
    customerCount,
    pickupCount
}