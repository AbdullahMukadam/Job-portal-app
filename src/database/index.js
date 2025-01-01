import mongoose from "mongoose"

const ConnectToDb = async () => {
    try {
        const status = await mongoose.connect(process.env.MONGO_URI)
        if (status) {
            console.log("Connected Sucessfully")
        }
    } catch (error) {
        console.error("An Error ocuured", error)
    }
}

export default ConnectToDb