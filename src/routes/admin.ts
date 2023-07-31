import express from "express";
import { adminLogin } from "../controllers/auth/adminAuthController";
import { customersList, changeUserStatus, userData, deleteUser } from "../controllers/admin/adminController";
import { addScrapMaterial } from "../controllers/scrap/scrapController";
import { pickupsList, pickupDetails, changePickupStatus, selectedScraps} from "../controllers/admin/pickupController";
import { payment, paymentVerification, getKey } from "../controllers/admin/payment";

const adminRouter = () => {
    const router = express.Router(); 

    router.post('/login', adminLogin);
    router.get('/user-management', customersList);
    router.patch('/change-status', changeUserStatus);
    router.get('/view-user', userData);
    router.delete('/delete-user', deleteUser);
    router.post('/add-scrap', addScrapMaterial);

    router.get('/pickups', pickupsList);

    //Pickup Details
    router.get('/pickup-details', pickupDetails);  
    router.get('/get-selected-scraps', selectedScraps); 
    router.patch('/pickup-details', changePickupStatus); //Update Pickup Status;

    //Payment
    router.get('/get-key', getKey);
    router.post('/payment', payment);
    router.post('/payment-verification', paymentVerification);
     
    return router
}

export default adminRouter;