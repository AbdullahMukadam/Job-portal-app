"use server"

const submitRecruiterDetails = async (data) => {
    try {
        console.log(data)
        if (data) {
            return {
                success: true,
                message: "Succefully Send"
            }
        }
    } catch (error) {
        return {
            success: false,
            message: "An Error Ocurred"
        }
    }
}

export { submitRecruiterDetails }