import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: false,
    userId: null
}

export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true
            state.userId = action.payload
        },
        logout: (state) => {
            state.status = false
            state.userId = null
        },
    },
})

export const { login, logout } = AuthSlice.actions

export default AuthSlice.reducer