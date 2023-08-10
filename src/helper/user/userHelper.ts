import { review, selectedData } from "../../controllers/user/userController"
import { pickupCollection } from "../../model/pickupModel"
import { reviewCollection } from "../../model/reviewModel";


export const doSellScrap = (data: selectedData) => {
    return new Promise((resolve, reject) => {
        const date = new Date();
        
        pickupCollection.create(data)
            .then((response) => {
                resolve({response, status: true});
            })
            .catch((err) => {
               reject({err, status: false});
               console.log(err, " : ERROR in DB");
            })
    })
}

export const addReview = async(data: {id: string, review: string, value: number}) => {
    try{
        console.log(data, " ::DATA in addReview")
        const response = await reviewCollection.create(data);
        console.log(response, " :: Resposnse from database")
        return {response, status: true};
    } catch (err) {
        console.log(" :: ERROR in addReview", err);
        return {err, status: false};
    }
    // return new Promise((resolve, reject) => {
    //         reviewCollection.create(data)
    //         .then((response) => {
    //             resolve({response, status: true})
    //         })
    //         .catch((err) => {
    //             reject({err, status: false});
    //             console.log(err, " :: ERROR in addReview");
    //         })
    // })
}

export const getAllReviews = async() => {
    try{
        const reviews = await reviewCollection.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            }, 
            {
                $sort: {_id: -1}
            },
            {
                $limit: 5
            },
            {
                $project: {
                    '_id': 1,
                    'review': 1,
                    'value': 1,
                    'user.username': 1
                }
            },

            
        ]).exec()
        return reviews;
    }
    catch(err){
        console.log(err, " ::ERROR in getAllReviews");
    }
}

export default {
    doSellScrap,
    addReview
}