import { userCollection } from "../../model/userModel"

export const getAllCustomers = () =>{
    return new Promise ((resolve, reject)=>{
        userCollection.find({})
        .then((response)=>{
            console.log(response);
            resolve(response);
        })
        .catch((err)=>{
            console.log(err, " :Error In getAllCustomers");
        })
    })
}

export const setUserStatus = (userId: string) => {
    return new Promise<void> (async(resolve, reject) => {
        try{
            let user = await userCollection.findById(userId);

            if(user){
                user.status = !user.status;
                user.save();
                resolve();
            } else {
                console.log('NO user Found!');
                reject({status: false});
            }
        }
        catch(err){
            console.log(err, " : ERROR in setUserStatus");
        }
        
    })
}

export const getUserData = (userId: string) => {
    return new Promise(async(resolve, reject)=>{
        try{
            let user = await userCollection.findById(userId);
            if(user){
                resolve(user);
            } else {
                reject();
            }
        }
        catch(err){
            console.log(err, " : ERROR in getUserData");
        }
    })
}

export const deleteUserData = (userId: string) => {
    return new Promise((resolve, reject)=>{
        try{
            userCollection.deleteOne({_id: userId})
            .then(()=>{
                resolve({status: true});
            })
            .catch((err)=>{
                console.log(err, ' :ERROR WHILE DELETING USER');
                reject({status: false});
            })
        }
        catch(err){
            console.log(err, ' : ERROR in deleteUserData');
        }
    })
}

export default {
    getAllCustomers,
    setUserStatus,
    getUserData,
    deleteUserData
}