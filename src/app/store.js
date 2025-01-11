import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './Slices/AuthSlice'
import JobReducer from "./Slices/JobSlice"

const store = configureStore({
    reducer: {
        auth: AuthReducer,
        job : JobReducer
    },
})

export default store