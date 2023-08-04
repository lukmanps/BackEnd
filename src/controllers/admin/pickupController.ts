import { Request, Response } from "express";
import {
    getAllPickups,
    getPickupDetails,
    getSelectedScrap,
    updatePickupStatus
} from "../../helper/admin/pickupHelper";


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
    getPickupDetails(id)
        .then((responses: any) => {
            responses.map((response: any) => {
                res.json(response);
            })

        })
        .catch((err) => {
            console.log(err, " : ERROR in pickupDetais");
        });
}

export const selectedScraps = (req: Request, res: Response) => {
    const id: string = req.query.id as string;
    getSelectedScrap(id)
        .then((response) => {
            res.json(response);
        })
        .catch((err) => {
            console.log(err, " : ERROR in pickupDetais");
        });
}

export const changePickupStatus = (req: Request, res: Response) => {
    const id: string = req.query.id as string;
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