import { Request, Response } from "express";
import { getAllPickups } from "../../helper/admin/pickupHelper";

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

export default {
    pickupsList
}