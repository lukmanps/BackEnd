import { Request, Response } from "express";
import { getAllPickups, getPickupDetails, updatePickupStatus } from "../../helper/admin/pickupHelper";

export const pickupsList = (req: Request, res: Response) => {
    getAllPickups()
        .then((response: any) => {
            console.log(response)
            res.json(response);
        })
        .catch((err) => {
            console.log(err, "ERROR in pickupsList");
        })
}

export const pickupDetails = (req: Request, res: Response) => {
    const id: string = req.query.id as string;
    console.log(id, " : ID from rquest");
    getPickupDetails(id)
        .then((response) => {
            console.log(response, " :Response From DB");
            res.json(response);
        })
        .catch((err) => {
            console.log(err, " : ERROR in pickupDetais");
        });
}

export const changePickupStatus = (req: Request, res: Response) => {
    const id: string = req.query.id as string;
    console.log(req.body.value, id, " Value from FE");
    updatePickupStatus(id, req.body.value)
        .then((response) => {
            console.log(true)
        })
        .catch(() => {
            console.log(false);
        })
}

export default {
    pickupsList,
    pickupDetails,
    changePickupStatus
}