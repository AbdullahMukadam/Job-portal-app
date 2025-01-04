import ConnectToDb from "@/database"
import Job from "@/Models/Job"
import { revalidatePath } from "next/cache"

export const createJobAction = async (formData) => {
    try {
        await ConnectToDb();

        const NewJob = await Job.create(formData, pathToRevalidate)
        if (NewJob) {
            revalidatePath(pathToRevalidate)
            return {
                success: true,
                message: "Your job has been successfully posted"
            }
        }
    } catch (error) {
        return {
            success: false,
            message: 'Some Error Ocurred'
        }
    }
}

export const fetchJobPostForRecruiter = async (id) => {
    try {
        await ConnectToDb();

        const result = await Job.find({ recruiterId: id })
        if (result) {
            return JSON.parse(JSON.stringify(result))
        }
    } catch (error) {
        return {
            success: false,
            message: 'Some Error Ocurred'
        }
    }

}

