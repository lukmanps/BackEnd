import express from "express";
import { adminLogin } from "../controllers/auth/adminAuthController";
import { customersList, changeUserStatus, userData, deleteUser } from "../controllers/admin/adminController";
import { addScrapMaterial, scrapList } from "../controllers/scrap/scrapController";
import { pickupsList, pickupDetails, changePickupStatus, selectedScraps} from "../controllers/admin/pickupController";
import { payment, paymentVerification, getKey } from "../controllers/admin/payment";
import { customerCount, pickupCount, dashboardInfo } from "../controllers/admin/dashboardController";
import { verifyAdmin } from "../middlewares/verifyAdmin";

const adminRouter = () => {
    const router = express.Router(); 

    router.post('/login', adminLogin);

    //Customer Management
    router.get('/user-management', verifyAdmin, customersList);
    router.patch('/change-status',verifyAdmin, changeUserStatus);
    router.get('/view-user', userData);
    router.delete('/delete-user', deleteUser);

    //Scrap Management
    router.post('/add-scrap',verifyAdmin, addScrapMaterial);
    router.get('/scrap-management',verifyAdmin, scrapList)

    //Pickup Details
    router.get('/pickups', verifyAdmin, pickupsList);
    router.get('/pickup-details', verifyAdmin, pickupDetails);  
    router.get('/get-selected-scraps', verifyAdmin, selectedScraps); 
    router.patch('/pickup-details',verifyAdmin, changePickupStatus); //Update Pickup Status;

    //Payment
    router.get('/get-key', getKey);
    router.post('/payment',verifyAdmin, payment);
    router.post('/payment-verification', paymentVerification);

    //Dashboard
    router.get('/get-customer-count', customerCount);
    router.get('/get-pickup-count', pickupCount);
    router.get('/get-dashboard-info', dashboardInfo);
     
    return router
}

export default adminRouter;