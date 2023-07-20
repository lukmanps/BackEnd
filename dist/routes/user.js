"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userAuthController_1 = require("../controllers/auth/userAuthController");
const scrapController_1 = require("../controllers/scrap/scrapController");
const userRouter = () => {
    const router = express_1.default.Router();
    console.log('Reached User Router');
    router.post('/signup', userAuthController_1.userSignup);
    router.post('/login', userAuthController_1.userLogin);
    router.get('/scrap-management', scrapController_1.scrapList);
    return router;
};
exports.default = userRouter;
