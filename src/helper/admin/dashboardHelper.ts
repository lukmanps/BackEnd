import { pickupCollection } from "../../model/pickupModel";
import { userCollection } from "../../model/userModel";

export const getCustomerCount = async() => {
    try {
       const count = await userCollection.countDocuments({});
       return count
    }   
    catch(err){
        console.log(err, " :: Error in getCustomerCount")
    }
}

export const getPickupCount = async() => {
    try {
        const count = await pickupCollection.countDocuments({});
        return count
    }
    catch(err){
        console.log(err, " :: Error in getPickupCount");
    }
}

export const getDashboardInfo = async() => {
    try{
        const pickupCount = await pickupCollection.countDocuments({});
        const customerCount = await userCollection.countDocuments({});
        return {pickupCount, customerCount}
    }
    catch(err){
        console.log(err, ":: Error in getDashboardInfo");
    }
}

export default {
    getCustomerCount,
    getPickupCount
}