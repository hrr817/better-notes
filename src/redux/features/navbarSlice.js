import { createSlice } from '@reduxjs/toolkit'

const initialState = {
     shouldShowNavbar: true
}

const navbarSlice = createSlice({
     name: 'navbar',
     initialState,
     reducers: {
          showNavbar: state => {
               state.shouldShowNavbar = true
          },
          hideNavbar: state => {
               state.shouldShowNavbar = false
          }
     },
})

export const { showNavbar, hideNavbar } = navbarSlice.actions

export const selectShowNavbar = state => state.navbar

export default navbarSlice.reducer