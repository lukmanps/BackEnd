import express from "express";
import {userSignup, userLogin} from "../controllers/auth/userAuthController";
import { scrapList } from "../controllers/scrap/scrapController";
import { sellScrap, review, getReviews } from "../controllers/user/userController";
import { verifyUser } from "../middlewares/verifyUser";

const userRouter = () => {
    const router = express.Router(); 

    router.post('/signup', userSignup);
    router.post('/login', userLogin);

    router.get('/scrap-management', verifyUser, scrapList);
    router.post('/sell-scrap',verifyUser, sellScrap);

    router.post('/review', review);
    router.get('/get-reviews', getReviews);
    
     
    return router
}

export default userRouter;


