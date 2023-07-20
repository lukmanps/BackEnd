import { scrapCollection } from "../../model/scrapModel"

export const addScrap = (data: {category: string, scrap: string, price: number}) => {
    return new Promise(async(resolve,reject) => {
        try{
            let scrap = await scrapCollection.findOne({scrap: data.scrap}); 

            if(!scrap){
                scrapCollection.create(data)
                .then((response)=>{
                    resolve(response);
                    console.log(response, ': RESPONSE FROM DATABASE');
                })
                .catch((err)=>{
                    reject(err);
                    console.log(err, " :ERROR from Database");
                })
            } else {
                const message = 'Scrap already added';
                resolve({status: false, message});
            }
        }
        catch(err){
            console.log(err, 'Errror in add scrap');
        }
    })
}

export const getAllScrap = () => {
    return new Promise((resolve, reject) => {
        scrapCollection.find({})
        .then((response)=> {
            resolve(response);
        })
        .catch((err)=>{
            console.log(err, 'Error in getAllScrap')
        })
    })
}

export default {
    addScrap
}