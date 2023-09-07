import { Request, Response, response } from "express";
import { doSellScrap, addReview, getAllReviews, getRecentPickups, doUpdateProfilePicture, doUpdateUserDetails } from "../../helper/user/userHelper";

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
            res.json(response);
        })
        .catch((response: any) => {
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

export const getReviews = async (req: Request, res: Response) => {
    try {
        const reviews = await getAllReviews();
        res.json(reviews);
    }
    catch (err) {
        console.log(err, " :: Error in getReviews");
    }
}

export const recentPickups = async(req: Request, res: Response) => {
    try {
        const userId = req.query.id as string;
        console.log(userId, " :: User Id");
        const pickups = await getRecentPickups(userId);
        console.log(pickups, 'PIckups from db');
        res.status(200).json(pickups);
    }
    catch (err) {
        res.status(401);
        console.log(err, ":: Error in recentPickups");
    }
}

export const updateProfilePicture = async (req: Request, res: Response) => {
    try{
        const profileUpdated:any = await doUpdateProfilePicture(req.body);
        console.log(profileUpdated, 'updated data of profiel picuter');
        if(profileUpdated.status === false){
            res.status(401).json({status: false});
        } else{
            res.status(200).json({profileUpdated});
        }
    }
    catch(err){
        console.log(err, " :: error while updating profile picture");
    }
}

export const updateUserDetails = async(req: Request, res: Response) => {
    try{
        const detailsUpdated: any = await doUpdateUserDetails(req.body);
        if(detailsUpdated.status === false){
            res.status(401).json({status: false});
        }else {
            console.log(detailsUpdated, " : Response from DB");
            res.status(200).json({detailsUpdated});
        }
    }
    catch(err){
        console.log(err);
    }
}


export default {
    sellScrap,
    review,
    updateProfilePicture,
    updateUserDetails
}