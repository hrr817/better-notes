import { createSlice } from '@reduxjs/toolkit'

const token = localStorage.getItem('token')

const initialState = {
     user: {
          token,
          authenticated: !!token,
          error: null,
          data: null,
          verified: false
     },
     loading: {
          signInLoading: false,
          signUpLoading: false,
          signOutLoading: false,
          authLoading: false
     },
     errors: {
          signInError: null,
          signUpError: null
     }
}

const authSlice = createSlice({
     name: 'auth',
     initialState,
     reducers: {
          // Auth 
          auth: state => { state.loading.authLoading = true },
          authSuccess: (state, action) => {
               state.loading.authLoading = false
               state.user.error =  null
               state.user.data = action.payload
          },
          authFail: (state, action) => {
               state.loading.authLoading = false
               state.user.authenticated = false
               state.user.error =  action.payload
               localStorage.removeItem('token')
               state.user.data = null
          },
          // Sign In
          signIn: state => { state.loading.signInLoading = true },
          signInSuccess: (state, action) => {
               state.loading.signInLoading = false
               state.user.authenticated = true
               state.user.error =  null
               state.user.token = action.payload.token
               state.user.data = action.payload.data

               // set token in localStorage
               localStorage.setItem('token', action.payload.token)
          },
          signInFail: (state, action) => {
               state.loading.signInLoading = false
               state.errors.signInError =  action.payload
          },
          // Sign Up
          signUp: state => { state.loading.signUpLoading = true },
          signUpSuccess: (state, action) => {
               state.loading.signUpLoading = false
               state.user.authenticated = true
               state.errors.signUpError =  null
               state.user.token = action.payload.token
               state.user.data = action.payload.data

               // set token in localStorage
               localStorage.setItem('token', action.payload.token)
          },
          signUpFail: (state, action) => {
               state.loading.signUpLoading = false
               state.errors.signUpError =  action.payload
          },
          // Sign Out
          signOut: state => { 
               state.loading.signOutLoading = false
               state.user.token = null
               state.user.authenticated = false
               state.user.error =  null
               state.user.data = null

               // remove token in localStorage
               localStorage.removeItem('token')
          }
     },
})

export const { auth, authSuccess, signIn, signOut, signUp } = authSlice.actions

export const selectAuthUser = state => state.auth.user
export const selectAuthErrors = state => state.auth.errors
export const selectLoading = state => state.auth.loading

export default authSlice.reducer