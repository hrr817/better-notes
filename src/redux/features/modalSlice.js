import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'

const initialState = {}

const modalSlice = createSlice({
     name: 'users',
     initialState,
     reducers: {
          showModal: (state, action) => {
               const { name, component } = action.payload
               const ModalProperties = { name, component, show: true }

               state[name] = ModalProperties
          },
          closeModal: (state, action) => {
               const path = action.payload + '.show'
               _.set(state, path, false)
          },
          removeModal: (state, action) => { delete state[action.payload] }
     },
})

export const { showModal, closeModal, removeModal } = modalSlice.actions

export const selectModals = state => state.modals

export default modalSlice.reducer