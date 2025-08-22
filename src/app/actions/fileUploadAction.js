"use server"

import { put } from "@vercel/blob";

export async function hndleUploadResume(file) {
    try {
        const blob = await put(file.name, file, {
            access: 'public',
            addRandomSuffix: true,
        });
        if (blob.url) {
            return blob.url
        }
    } catch (error) {
        console.error("Unable to upload file")
    }

}

