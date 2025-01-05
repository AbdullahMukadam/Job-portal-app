

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_URI;
//console.log(MONGODB_URI)



const ConnectToDb = async () => {
    try {
        const res = await mongoose.connect(MONGODB_URI)
        if (res) {
            console.log("connected Sucessfully")
        }
    } catch (error) {
        console.log("error in connecting to database", error)
    }
}




export default ConnectToDb