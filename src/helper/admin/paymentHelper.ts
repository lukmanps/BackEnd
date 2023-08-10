import { userCollection } from "../../model/userModel"

export const updatePayment = (id:string, amount: number) => {
    return new Promise (async(resolve, reject) => {
        const user: any = await userCollection.findById(id);
        let walletAmount = user?.wallet 
        userCollection.findByIdAndUpdate(id, {wallet: walletAmount+amount})
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