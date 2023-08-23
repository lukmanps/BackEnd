import { userCollection } from "../../model/userModel"


//To update the user's wallet after payment.
export const updatePayment = (id: string, amount: number) => {
    return new Promise(async (resolve, reject) => {
        const user: any = await userCollection.findById(id);
        if (!user) {
            return reject({ status: false, message: 'user not found' })
        }
        const walletAmount = user.wallet;
        const newWallet = walletAmount + amount;

        console.log(newWallet, ':: Update wallet amount ');
        await userCollection.updateOne({ _id: id }, { $set: { wallet: newWallet } });
        resolve({ status: true });

    })
}

export default {
    updatePayment
}