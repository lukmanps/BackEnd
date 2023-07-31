"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminAuthController_1 = require("../controllers/auth/adminAuthController");
const adminController_1 = require("../controllers/admin/adminController");
const scrapController_1 = require("../controllers/scrap/scrapController");
const pickupController_1 = require("../controllers/admin/pickupController");
const payment_1 = require("../controllers/admin/payment");
const adminRouter = () => {
    const router = express_1.default.Router();
    router.post('/login', adminAuthController_1.adminLogin);
    router.get('/user-management', adminController_1.customersList);
    router.patch('/change-status', adminController_1.changeUserStatus);
    router.get('/view-user', adminController_1.userData);
    router.delete('/delete-user', adminController_1.deleteUser);
    router.post('/add-scrap', scrapController_1.addScrapMaterial);
    router.get('/pickups', pickupController_1.pickupsList);
    //Pickup Details
    router.get('/pickup-details', pickupController_1.pickupDetails);
    router.get('/get-selected-scraps', pickupController_1.selectedScraps);
    router.patch('/pickup-details', pickupController_1.changePickupStatus); //Update Pickup Status;
    //Payment
    router.get('/get-key', payment_1.getKey);
    router.post('/payment', payment_1.payment);
    router.post('/payment-verification', payment_1.paymentVerification);
    return router;
};
exports.default = adminRouter;
