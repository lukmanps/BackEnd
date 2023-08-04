import express from "express";
import {userSignup, userLogin} from "../controllers/auth/userAuthController";
import { scrapList } from "../controllers/scrap/scrapController";
import { sellScrap } from "../controllers/user/userController";
import { verifyUser } from "../middlewares/verifyUser";

const userRouter = () => {
    const router = express.Router(); 

    router.post('/signup', userSignup);
    router.post('/login', userLogin);

    router.get('/scrap-management',verifyUser, scrapList);
    router.post('/sell-scrap',verifyUser, sellScrap);
    
     
    return router
}

export default userRouter;


