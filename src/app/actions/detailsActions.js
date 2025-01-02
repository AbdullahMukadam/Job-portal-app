"use server"

import ConnectToDb from "@/database"
import Profile from "@/Models/Profile"
import { revalidatePath } from "next/cache"

const submitRecruiterDetails = async (data, pathToRevalidate) => {
    try {

        await ConnectToDb()
        const NewProfile = new Profile({
            ...data
        })
        if (NewProfile) {
            revalidatePath(pathToRevalidate)
            return {
                success: true,
                message: "Succefully Created"
            }
        }
    } catch (error) {
        return {
            success: false,
            message: "An Error Ocurred"
        }
    }
}

const fetchUserDetails = async (id) => {
    try {
        await ConnectToDb()

        const user = await Profile.findOne({ userId: id })
        if (user) {
            return {
                success: true,
                message: "Fetch Sucessfully",
                UserDetails: user
            }
        }
    } catch (error) {
        return {
            success: false,
            message: "An Error Ocurred"
        }
    }
}

export { submitRecruiterDetails, fetchUserDetails }