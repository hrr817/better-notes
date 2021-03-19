import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const usersSlice = createSlice({
     name: 'users',
     initialState,
     reducers: {
          setUsers: (state, action) => action.payload,
          resetUsers: () => initialState,
     },
})

export const { setUsers, resetUsers } = usersSlice.actions

export const selectUsers = state => state.users

export default usersSlice.reducer