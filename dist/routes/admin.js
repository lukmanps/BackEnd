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
const dashboardController_1 = require("../controllers/admin/dashboardController");
const verifyAdmin_1 = require("../middlewares/verifyAdmin");
const adminRouter = () => {
    const router = express_1.default.Router();
    router.post('/login', adminAuthController_1.adminLogin);
    //Customer Management
    router.get('/user-management', verifyAdmin_1.verifyAdmin, adminController_1.customersList);
    router.patch('/change-status', verifyAdmin_1.verifyAdmin, adminController_1.changeUserStatus);
    router.get('/view-user', adminController_1.userData);
    router.delete('/delete-user', adminController_1.deleteUser);
    //Scrap Management
    router.post('/add-scrap', verifyAdmin_1.verifyAdmin, scrapController_1.addScrapMaterial);
    router.get('/scrap-management', verifyAdmin_1.verifyAdmin, scrapController_1.scrapList);
    //Pickup Details
    router.get('/pickups', verifyAdmin_1.verifyAdmin, pickupController_1.pickupsList);
    router.get('/pickup-details', verifyAdmin_1.verifyAdmin, pickupController_1.pickupDetails);
    router.get('/get-selected-scraps', verifyAdmin_1.verifyAdmin, pickupController_1.selectedScraps);
    router.patch('/pickup-details', verifyAdmin_1.verifyAdmin, pickupController_1.changePickupStatus); //Update Pickup Status;
    //Payment
    router.get('/get-key', payment_1.getKey);
    router.post('/payment', verifyAdmin_1.verifyAdmin, payment_1.payment);
    router.post('/payment-verification', payment_1.paymentVerification);
    //Dashboard
    router.get('/get-customer-count', dashboardController_1.customerCount);
    router.get('/get-pickup-count', dashboardController_1.pickupCount);
    router.get('/get-dashboard-info', dashboardController_1.dashboardInfo);
    return router;
};
exports.default = adminRouter;
