import { Request, Response } from "express";
import { addScrap, getAllScrap } from "../../helper/scrap/scrapHelper";

export const addScrapMaterial = (req: Request, res: Response) => {
    const formData:{
        category: string,
        scrap: string,
        price: number
    } = req.body;
    console.log(formData, "FORRMMM DATA");
    addScrap(formData)
    .then((response) => {
        console.log(response, "RESPONSE IN addScrapMaterial");
        res.json(response);
    })
    .catch((err)=> {
        console.log(err, "ERROR in addScrapMaterial");
    })
}

export const scrapList = (req: Request, res: Response) => {
    getAllScrap()
    .then((response)=> {
        res.json(response);
    })
    .catch((err)=>[
        console.log(err, " : Error in scrapList")
    ])
}

export default {
    addScrap
}