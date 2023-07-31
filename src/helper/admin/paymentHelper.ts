import { userCollection } from "../../model/userModel"

export const updatePayment = (id:string, amount: number) => {
    return new Promise ((resolve, reject) => {
        userCollection.findByIdAndUpdate(id, {wallet: amount})
        .then((response) => {
            resolve({status: true});
        })
        .catch((err) => {
            console.log(err, " : ERROR in update Payment");
            reject({status: false});
        })
    })
}

export default {
    updatePayment
}