import express from "express";
import {userSignup, userLogin, signInWithGoogle} from "../controllers/auth/userAuthController";
import { scrapList } from "../controllers/scrap/scrapController";
import { sellScrap, review, getReviews, recentPickups, updateProfilePicture, updateUserDetails } from "../controllers/user/userController";
import { verifyUser } from "../middlewares/verifyUser";

const userRouter = () => {
    const router = express.Router(); 

    router.post('/signup', userSignup);
    router.post('/login', userLogin);
    router.post('/signin-with-google', signInWithGoogle);

    router.get('/scrap-management', scrapList);
    router.post('/sell-scrap',verifyUser, sellScrap);

    router.post('/review', review);
    router.get('/get-reviews', getReviews);

    router.get('/get-recent-pickups',verifyUser, recentPickups);

    router.post('/update-profile-picture', updateProfilePicture);
    router.post('/update-user-profile', updateUserDetails)
    
     
    return router
}

export default userRouter;


