import { review, selectedData } from "../../controllers/user/userController"
import { pickupCollection } from "../../model/pickupModel"
import { reviewCollection } from "../../model/reviewModel";
import { scrapCollection } from "../../model/scrapModel";


export const doSellScrap = (data: selectedData) => {
    return new Promise(async(resolve, reject) => {
        let totalAmount = 0;

        for (const scrap of data.scrap) {
            const scrapData = await scrapCollection.findById(scrap.item);
            if (scrapData) {
                totalAmount += scrapData.price * scrap.quantity;
            } else {
                reject({ error: 'Scrap item not found', status: false });
                return; // Return to exit the loop early if a scrap item is not found
            }
        }

        const newData = {
            ...data,
            totalAmount
        }

        pickupCollection.create(newData)
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