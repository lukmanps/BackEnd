import express from "express";
import { adminLogin } from "../controllers/auth/adminAuthController";
import { customersList, changeUserStatus, userData, deleteUser } from "../controllers/admin/adminController";
import { addScrapMaterial } from "../controllers/scrap/scrapController";

const adminRouter = () => {
    const router = express.Router(); 

    router.post('/login', adminLogin);
    router.get('/user-management', customersList);
    router.patch('/change-status', changeUserStatus);
    router.get('/view-user', userData);
    router.delete('/delete-user', deleteUser);
    router.post('/add-scrap', addScrapMaterial);
    
     
    return router
}

export default adminRouter;