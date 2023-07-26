import { pickupCollection } from "../../model/pickupModel"


export const getAllPickups = () => {
    return new Promise((resolve, reject) => {
        pickupCollection.find({})
        .then((response) => {
            resolve(response);
        })
        .catch((err) => {
            reject(err);
        })
    })
}

export default {
    getAllPickups
}