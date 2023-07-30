import { selectedData } from "../../controllers/user/userController"
import { pickupCollection } from "../../model/pickupModel"

export const doSellScrap = (data: selectedData) => {
    return new Promise((resolve, reject) => {
        const myDate = new Date();
        const year = myDate.getFullYear();
        const month = String(myDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based
        const day = String(myDate.getDate()).padStart(2, '0');

        const date = `${day}-${month}-${year}`
        const newData = {
            ...data,
            date
        }
        console.log(newData, " NEW DATA b4 upload into DB");
        pickupCollection.create(newData)
            .then((response) => {
                resolve({response, status: true});
            })
            .catch((err) => {
               reject({err, status: false});
            })
    })
}

export default {
    doSellScrap
}