'use server'

import ConnectToDb from "@/database"
import Profile from "@/Models/Profile"
import { revalidatePath } from "next/cache"

export async function submitRecruiterDetails(data, pathToRevalidate) {
    await ConnectToDb();
    const formattedData = {
        ...data,
        membershipType: data.membershipType || 'free',
        membershipstartDate: data.membershipstartDate || new Date().toISOString(),
        membershipendDate: data.membershipendDate || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        isPremiumUser: data.isPremiumUser || false
    };
    await Profile.create(formattedData);
    revalidatePath(pathToRevalidate);
}

export async function fetchUserDetails(id) {
    await ConnectToDb();
    const result = await Profile.findOne({ userId: id });

    return JSON.parse(JSON.stringify(result));
}

export async function submitCandidateDetails(data, pathToRevalidate) {
    await ConnectToDb();
    const formattedData = {
        ...data,
        membershipType: data.membershipType || 'free',
        membershipstartDate: data.membershipstartDate || new Date().toISOString(),
        membershipendDate: data.membershipendDate || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        isPremiumUser: data.isPremiumUser || false
    };
    await Profile.create(formattedData);
    revalidatePath(pathToRevalidate);


}

export async function UpdateCandidateProfileDetails(data, id, pathToRevalidate) {
    try {
        await ConnectToDb()

        // Clean data to prevent circular references
        const cleanData = JSON.parse(JSON.stringify(data))

        const updatedUser = await Profile.findByIdAndUpdate(
            id,
            cleanData,
            {
                new: true
            }
        ).lean() // Convert Mongoose document to plain JavaScript object

        if (!updatedUser) {
            return {
                success: false,
                message: "Profile not found"
            }
        }

        // Only revalidate if path is provided and update was successful
        if (pathToRevalidate) {
            revalidatePath(pathToRevalidate)
        }

        return {
            success: true,
            message: "Profile Details Updated Successfully"
        }

    } catch (error) {
        console.error('Profile update error:', error)
        return {
            success: false,
            message: "An Error Occurred in Updating User Profile"
        }
    }
}