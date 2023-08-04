"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userAuthController_1 = require("../controllers/auth/userAuthController");
const scrapController_1 = require("../controllers/scrap/scrapController");
const userController_1 = require("../controllers/user/userController");
const verifyUser_1 = require("../middlewares/verifyUser");
const userRouter = () => {
    const router = express_1.default.Router();
    router.post('/signup', userAuthController_1.userSignup);
    router.post('/login', userAuthController_1.userLogin);
    router.get('/scrap-management', verifyUser_1.verifyUser, scrapController_1.scrapList);
    router.post('/sell-scrap', verifyUser_1.verifyUser, userController_1.sellScrap);
    return router;
};
exports.default = userRouter;
