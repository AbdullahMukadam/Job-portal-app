import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    jobs: []
}

export const JobSlice = createSlice({
    name: "job",
    initialState,
    reducers: {
        AllJobList: (state, action) => {
            state.jobs = action.payload
        },
        RemoveJobList: (state, action) => {
            state.jobs = []
        }
    }
})

export const { AllJobList,RemoveJobList } = JobSlice.actions
export default JobSlice.reducer