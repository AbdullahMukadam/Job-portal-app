import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './Slices/AuthSlice'

const store = configureStore({
    reducer: {
        auth: AuthReducer,
    },
})

export default store