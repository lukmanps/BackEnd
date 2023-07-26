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
const adminRouter = () => {
    const router = express_1.default.Router();
    router.post('/login', adminAuthController_1.adminLogin);
    router.get('/user-management', adminController_1.customersList);
    router.patch('/change-status', adminController_1.changeUserStatus);
    router.get('/view-user', adminController_1.userData);
    router.delete('/delete-user', adminController_1.deleteUser);
    router.post('/add-scrap', scrapController_1.addScrapMaterial);
    router.get('/pickups', pickupController_1.pickupsList);
    return router;
};
exports.default = adminRouter;
