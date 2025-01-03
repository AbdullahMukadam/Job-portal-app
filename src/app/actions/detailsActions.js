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