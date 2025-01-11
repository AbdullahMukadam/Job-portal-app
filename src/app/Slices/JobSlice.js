import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    jobs: [],
    SingleJob: {}
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
        },
        AddSingleJob: (state, action) => {
            state.SingleJob = action.payload
        },
        RemoveSingleJob: (state) => {
            state.SingleJob = {}
        }
    }
})

export const { AllJobList, RemoveJobList, AddSingleJob, RemoveSingleJob } = JobSlice.actions
export default JobSlice.reducer