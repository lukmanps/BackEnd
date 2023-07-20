import { Request, Response } from "express";
import { getAllCustomers, setUserStatus, getUserData, deleteUserData } from "../../helper/admin/adminHelper";

export const customersList = (req: Request, res: Response) => {
        getAllCustomers()
        .then((response)=>{
            console.log(response, " : Customers List")
            res.json(response);
        })
        .catch((err)=>{
            console.log(err, " : Error in customers List");
        })
}

export const changeUserStatus = (req: Request, res: Response) => {
        const userId: string = req.query.id as string
        setUserStatus(userId)
        .then(()=>{
            res.json({status: true});
        })
        .catch(()=>{
            res.json({status: false});
        })
}

export const userData = (req: Request, res: Response ) => {
        let userId: string = req.query.id as string
        getUserData(userId)
        .then((response)=>{
            res.json(response);
        })
        .catch((err)=>{
            console.log(err, " : ERROR in userData");
            
        })
}

export const deleteUser = (req: Request, res: Response) => {
        let userId: string = req.query.id as string
        deleteUserData(userId)
        .then((response)=>{
            res.json(response);
        })
        .catch((err)=>{
            console.log(err, " : ERROR in deleteUser");
        })
}

export default{
    customersList,
    changeUserStatus,
    userData,
    deleteUser
}