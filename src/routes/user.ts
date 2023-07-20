import express from "express";
import {userSignup, userLogin} from "../controllers/auth/userAuthController";
import { scrapList } from "../controllers/scrap/scrapController";

const userRouter = () => {
    const router = express.Router(); 
    console.log('Reached User Router')

    router.post('/signup', userSignup);
    router.post('/login', userLogin);

    router.get('/scrap-management', scrapList);
     
    return router
}

export default userRouter;


