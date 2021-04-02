import { createSlice } from '@reduxjs/toolkit'

const initialState = {
     hide: false
}

const navbarSlice = createSlice({
     name: 'navbar',
     initialState,
     reducers: {
          showNavbar: state => {
               state.hide = true
          },
          hideNavbar: state => {
               state.hide = false
          },
          toggleNavbar: state => {
               state.hide = !state.hide
          }
     },
})

export const { showNavbar, hideNavbar, toggleNavbar } = navbarSlice.actions

export const selectNavbarProperties = state => state.navbar

export default navbarSlice.reducer