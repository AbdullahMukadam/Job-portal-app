import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status : null
}

export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            
          },
          logout: (state) => {
            state.status = false;
           
          },
    },
  })
  
 
  export const { login, logout } = AuthSlice.actions
  
  export default AuthSlice.reducer